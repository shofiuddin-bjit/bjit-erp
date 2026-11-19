import { DEPT_FIELDS } from "../utils/fields";
import { ROLE_IDS } from "../utils/constants";

const KEY = "bjit_erp_auth";
let sessionUserId = null;

export const USER_FIELDS = [
    "sys_id",
    "user_name",
    "name",
    "email",
    "employee_number",
    "title",
    "manager",
    ...DEPT_FIELDS,
].join(",");

export const getAuth = () => {
    try {
        return JSON.parse(sessionStorage.getItem(KEY));
    } catch {
        return null;
    }
};

export const saveAuth = (auth) =>
    sessionStorage.setItem(KEY, JSON.stringify(auth));
export const clearAuth = () => sessionStorage.removeItem(KEY);

const toBase64 = (text) => {
    const bytes = new TextEncoder().encode(text);
    let bin = "";
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    return btoa(bin);
};

// On the instance an authenticated session (g_ck) already exists; reuse it when it is the same user.
export async function detectSessionUser() {
    if (!window.g_ck) return null;
    try {
        const qs = new URLSearchParams({
            sysparm_query: "sys_id=javascript:gs.getUserID()",
            sysparm_fields: "sys_id",
            sysparm_limit: "1",
        });
        const res = await fetch(`/api/now/table/sys_user?${qs}`, {
            headers: { Accept: "application/json", "X-UserToken": window.g_ck },
        });
        if (res.ok)
            sessionUserId = (await res.json()).result?.[0]?.sys_id || null;
    } catch {
        sessionUserId = null;
    }
    return sessionUserId;
}

export function authOptions() {
    const auth = getAuth();
    if (window.g_ck && (!auth || auth.user?.sys_id === sessionUserId)) {
        return {
            headers: { "X-UserToken": window.g_ck },
            credentials: "same-origin",
        };
    }
    if (auth?.basic)
        return {
            headers: { Authorization: `Basic ${auth.basic}` },
            credentials: "omit",
        };
    return { headers: {}, credentials: "same-origin" };
}

async function fetchCurrentUser(basic) {
    const qs = new URLSearchParams({
        sysparm_query: "sys_id=javascript:gs.getUserID()",
        sysparm_fields: USER_FIELDS,
        sysparm_display_value: "all",
        sysparm_limit: "1",
    });
    const res = await fetch(`/api/now/table/sys_user?${qs}`, {
        headers: {
            Accept: "application/json",
            Authorization: `Basic ${basic}`,
        },
        credentials: "omit",
    });
    if (res.status === 401) return null;
    if (!res.ok) throw new Error(`Login failed (HTTP ${res.status})`);
    return (await res.json()).result?.[0] || null;
}

async function lookupUserName(email) {
    if (!window.g_ck) return null;
    const qs = new URLSearchParams({
        sysparm_query: `email=${email}`,
        sysparm_fields: "user_name",
        sysparm_limit: "1",
    });
    const res = await fetch(`/api/now/table/sys_user?${qs}`, {
        headers: { Accept: "application/json", "X-UserToken": window.g_ck },
    });
    if (!res.ok) return null;
    return (await res.json()).result?.[0]?.user_name || null;
}

async function fetchUserRoleIds(user, basic) {
    const qs = new URLSearchParams({
        // Query this user's rows only (the instance ACL permits users to read only their own rows),
        // then filter by role locally. Combined user+role conditions return no rows on this instance.
        sysparm_query: `user=${user.sys_id.value}`,
        sysparm_fields: "sys_id,role",
        sysparm_limit: "250",
    });
    const res = await fetch(`/api/now/table/sys_user_has_role?${qs}`, {
        headers: {
            Accept: "application/json",
            Authorization: `Basic ${basic}`,
        },
        credentials: "omit",
    });
    if (!res.ok) return null;
    const rows = (await res.json()).result || [];
    return new Set(rows.map((row) => row.role).filter(Boolean));
}

export async function refreshAuthorization(auth) {
    if (!auth?.user || !auth?.basic) return auth;
    try {
        const roleIds = await fetchUserRoleIds(auth.user, auth.basic);
        const isManager =
            roleIds === null
                ? null
                : roleIds.has(ROLE_IDS.admin) || roleIds.has(ROLE_IDS.manager);
        const isHr =
            roleIds !== null &&
            (roleIds.has(ROLE_IDS.admin) || roleIds.has(ROLE_IDS.hr));
        const isEmployee =
            isHr || (roleIds !== null && roleIds.has(ROLE_IDS.employee));
        const refreshed = { ...auth, isManager, isHr, isEmployee };
        saveAuth(refreshed);
        return refreshed;
    } catch {
        const refreshed = {
            ...auth,
            isManager: null,
            isHr: false,
            isEmployee: false,
        };
        saveAuth(refreshed);
        return refreshed;
    }
}

export async function login(identifier, password) {
    const login = identifier.trim();
    let basic = toBase64(`${login}:${password}`);
    let user = await fetchCurrentUser(basic);
    if (!user && login.includes("@")) {
        const userName = await lookupUserName(login);
        if (userName) {
            basic = toBase64(`${userName}:${password}`);
            user = await fetchCurrentUser(basic);
        }
    }
    // The resolved identity must be the one that was typed (guards against proxies that inject their own credentials).
    const typed = login.toLowerCase();
    const matches =
        user &&
        [user.user_name, user.email].some(
            (f) => (f?.value || "").toLowerCase() === typed,
        );
    if (!matches) throw new Error("Wrong login/password");
    const auth = await refreshAuthorization({ basic, user });
    saveAuth(auth);
    return auth;
}
