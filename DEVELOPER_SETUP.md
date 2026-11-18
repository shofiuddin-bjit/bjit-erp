# BJIT ERP - Developer Setup Guide

How to clone this application into VS Code, then build, install and test it on
**your own** ServiceNow instance.

For what the application does, its design decisions and its history, read
[PROJECT_CONTEXT.md](PROJECT_CONTEXT.md).

> Never commit passwords, tokens or credentials. SDK credentials are stored
> encrypted on your machine, outside the repository.

---

## 1. What you are installing

| Item | Value |
| --- | --- |
| Application | BJIT ERP (`bjit-erp`) |
| Scope | Set in `now.config.json` for your instance |
| Main UI page | `https://<your-instance>.service-now.com/<scope>_app.do` |
| Navigator entry | **BJIT ERP > Open BJIT ERP** |
| Pages | Login, Discuss, Asset Management, Support; other sidebar apps are placeholders |

`now-sdk install` creates on the target instance:

- 6 custom tables (locations, assets, asset requests, support tickets, Discuss
  channels, messages)
- Roles `<scope>.user` and `<scope>.manager`, plus ACLs
- Business rules for the asset-request and ticket workflows
- The React UI page and navigator menu
- Demo data: 16 assets, 6 locations, 2 Discuss channels, 1 welcome message

It does **not** create users or passwords. You create test users yourself
(section 7).

---

## 2. Prerequisites

| Requirement | Notes |
| --- | --- |
| Git | To clone the repository |
| Node.js **20 or later** (LTS) | Original development used Node 24 / npm 11 |
| npm | Bundled with Node.js |
| VS Code | Recommended editor |
| ServiceNow instance | A Personal Developer Instance (PDI) works |
| Instance admin account | Required for the SDK to install the app |

Get a free PDI at <https://developer.servicenow.com> if you do not have one.
Make sure the instance is awake (sign in once in a browser) before installing.

Check your tools:

```powershell
git --version
node --version
npm --version
```

---

## 3. Clone and open in VS Code

```powershell
git clone https://github.com/shofiuddin-bjit/bjit-erp.git
cd bjit-erp
code .
```

When VS Code suggests the recommended extension, install
**ServiceNow Fluent Language** (`servicenow.fluent-language-extension`). It gives
autocompletion and validation for the generated `*.now.ts` files.

### Set your application scope

Before building, set only the `scope` property in `now.config.json` to a custom
scope registered for your ServiceNow instance (for example, `x_acme_bjit_erp`).
The scope must match `x_<name>` or `sn_<name>` and be 4 to 18 characters long.
Keep `scopeId` unchanged; it identifies this application package.

The authored Fluent definitions are templates in `src/fluent-templates`.
`npm run build`, `npm run deploy`, `npm run dev` and `npm run types` generate
SDK-compatible Fluent files from the configured scope before running the SDK.
Do not edit the generated files under `src/fluent` or invoke `now-sdk build` or
`now-sdk install` directly.

Install dependencies exactly as locked:

```powershell
npm ci
```

Use `npm install` only if `npm ci` fails because of a lockfile mismatch.

Run all `npm` and `npx now-sdk` commands from the repository root.

---

## 4. Connect the SDK to your instance

Add a credential (replace `<your-instance>`):

```powershell
npx now-sdk auth --add https://<your-instance>.service-now.com --type basic --alias my-pdi
```

Enter your instance **admin** username and password when prompted. If MFA is
enabled, the SDK asks for a code.

Make it the default and confirm:

```powershell
npx now-sdk auth --use my-pdi
npx now-sdk auth --list
```

The default credential (marked with `*`) is used by `build`-related, `install`
and `dev` commands unless you pass `--auth <alias>`.

Credentials are stored per user on your machine, not in this project. Use
`--type oauth` instead of `basic` for enterprise instances that require OAuth.

---

## 5. Build

```powershell
npm run build
```

Expected ending:

```text
Generated 10 Fluent files for scope <your-scope>.
[now-sdk] Type check completed successfully
[now-sdk] Script "prebuild" completed successfully
[now-sdk] Build completed successfully
```

These warnings are normal and can be ignored:

- `No tsconfig.json found in "src/client" directory`
- A Fastify `FSTDEP023` deprecation warning (from `npm run dev`)

Do not edit `src/fluent/generated/keys.ts` by hand; the SDK maintains it.

---

## 6. Install to your instance

```powershell
npm run deploy
```

This runs `now-sdk install`. Expected ending:

```text
[now-sdk] Installation completed. Access the application at: https://<your-instance>.service-now.com/sys_app.do?sys_id=...
```

Demo data is installed by default. To install without demo data:

```powershell
npm run deploy -- --demoData false
```

Useful options:

| Command | Purpose |
| --- | --- |
| `npm run deploy -- --auth my-pdi` | Install with a specific credential |
| `npx now-sdk install --info` | Show the latest install result |
| `npm run deploy -- --reinstall` | Uninstall then reinstall; **deletes on-instance changes not in source** |

The install output also prints a **Rollback** link if you need to undo an install.

Changing only `scope` in `now.config.json` updates table names, roles, business
rules, endpoints and client role checks during generation. The build rejects
scopes that violate the SDK's length/format rules or would make the longest
custom table name exceed ServiceNow's 30-character limit. A build with an
alternate scope is validated; installation on another developer's instance
still needs to be tested there.

---

## 7. Create test users on your instance

The app logs in with real ServiceNow users. Create these in
**System Security > Users** (or **User Administration > Users**) as an admin.

| Type | Suggested username | Email | Roles |
| --- | --- | --- | --- |
| Manager | `bjit_manager` | `bjit_manager@example.com` | `<scope>.manager` |
| Employee | `bjit_employee` | `bjit_employee@example.com` | `<scope>.user` |

For each user:

1. Create the record and fill **User ID**, **First name**, **Last name**,
   **Email**, **Active** = checked.
2. Optional, but used by the forms: **Employee number**, **Title**,
   **Department**.
3. On the employee, set **Manager** = `bjit_manager`. Confirming a support ticket
   copies the requester's manager chain into Approval Manager Level 1-3.
4. Save, then use **Set Password** (form header menu or related link) to set a
   password. Untick **Password needs reset**.
5. In the **Roles** related list, add the role from the table above.

### Basic-auth API restriction (important)

The app's login page checks the password through the ServiceNow REST API using
Basic authentication. Newer instances can restrict that to specific roles.

Check **System Properties** (`sys_properties.list`) for:

```text
glide.authenticate.basic_auth.restriction.active
glide.authenticate.basic_auth.allowed_roles
```

If the restriction is `true` and `allowed_roles` contains
`snc_basic_auth_api_access`, also give each test user the role
**`snc_basic_auth_api_access`**. Without it, a correct password still shows
"Wrong login/password" in the app. This was the cause of login failures on the
original instance.

Grant that role only to test users who need it. Do not disable the instance-wide
restriction to make testing easier.

---

## 8. Test on the instance (recommended)

Use the instance URL to test employee and manager logins. Use separate browser
profiles or private windows to test two users side by side.

1. Sign in to `https://<your-instance>.service-now.com/login.do` as the test
   user.
2. Open `https://<your-instance>.service-now.com/<scope>_app.do`.
3. Sign in on the app's login page with the **same** user. The username is the
   most reliable identifier; email also usually works.
4. To switch user, use **Log out** in the app *and* log out of ServiceNow.

### Smoke-test checklist

**Login**

- [ ] A wrong password shows "Wrong login/password".
- [ ] A correct login opens Discuss and shows the user's name top-right.

**Discuss**

- [ ] Inbox, Starred, History and the channels `general` and
      `BJIT_Canteen_General_Administration` are shown.
- [ ] Opening `general` shows the welcome message; posting a message works.

**Asset Management (as employee)**

- [ ] Assets are grouped by Asset Type > Category > Asset Name.
- [ ] Footer totals are **111** quantity / **74** remaining (fresh demo data).
- [ ] Expand **Fixed Asset > Computer & Laptop > Monitor**, click the request
      button on `Monitor00570`, add a comment and click **SUBMIT**.
- [ ] Status becomes **SUBMITTED** and the chatter shows the change.

**Asset approval (as manager)**

- [ ] Open **Operation > Asset Requests** and choose the **To Approve** filter.
- [ ] Open the request and use **1ST APPROVE**, **2ND APPROVE**, **APPROVE**,
      **ALLOCATE**.
- [ ] After allocation, `Monitor00570` shows remaining 0, **Deployed** and is
      assigned to the employee.
- [ ] Repeat with another request and test **REJECT** (reason required).

**Support (as employee)**

- [ ] **Support** opens the ticket kanban with the **Me** filter.
- [ ] **NEW**, fill Title, Category, Support Type, Branch, Support Location,
      then **CONFIRM**.
- [ ] Support No. looks like `SUPP/YYYY/MM/nnnn` and Approval Manager Level-1
      shows the employee's manager.
- [ ] Employees cannot move the ticket to manager-only states.

**Support (as manager)**

- [ ] Process the ticket: **START**, **MARK AS COMPLETED**, **CLOSE**.
- [ ] Test **SET PENDING** and **REJECT** on another ticket.

**Other**

- [ ] Kanban/list/pivot switching works on Support.
- [ ] **Report > Asset Report** shows the pivot.
- [ ] A placeholder app such as Payroll shows "not available yet".
- [ ] Chatter **Send message**, **Log note** and attachment upload work on a
      saved record.

Known: an employee may see a **CREATE** button on Assets. The server still
blocks employees from creating or editing assets.

### Cleaning up test data

Test requests, tickets and messages stay on the instance. Delete them from the
table lists (for example `<scope>_asset_req.list`, `<scope>_ticket.list`,
`<scope>_message.list`).

Restore an allocated asset in `<scope>_asset.list` by setting
Remaining back to its quantity, Asset Status to **Ready to Deploy** and clearing
Assigned To.

---

## 9. Local development server

For UI work with live reload:

```powershell
npm run dev
```

Open the URL printed in the terminal, usually `http://localhost:3000`. If that
port is busy, the server picks another one, for example `8081`.

Important:

- The local server forwards API calls to your instance **as the SDK credential
  user** (usually admin), regardless of what you type on the login page.
- Locally, only the SDK user's username works on the login page; any password is
  accepted because the proxy supplies its own credentials.
- Employee/manager logins show "Wrong login/password" locally. This is expected.
- Do not use localhost to test passwords, roles or permissions; use the instance
  (section 8).
- Local UI changes are not on the instance until you run `npm run build` and
  `npm run deploy`.
- Stop the dev server (`Ctrl+C`) before running `npm run build`; both clear the
  same output folder.
- If API calls start returning 401, the SDK session expired. Restart
  `npm run dev`.

---

## 10. Daily change workflow

1. Create a branch.
2. Make changes:
   - UI: `src/client`
   - Tables, roles, ACLs, business rules, demo data, UI page: `src/fluent`
3. Keep choice values in sync between `src/fluent/tables/*.now.ts` and
   `src/client/utils/constants.js`.
4. Fluent files must be declarative: no loops, `Set`, or computed record
   generation inside `*.now.ts` files.
5. `npm run build`
6. `npm run deploy`
7. Retest the affected flows on the instance.
8. Update [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md): implemented behavior,
   tests, deployment status, limitations and change log.
9. Commit and open a pull request.

---

## 11. Troubleshooting

| Symptom | Likely cause / fix |
| --- | --- |
| `npm ci` fails | Use Node.js 20+; delete `node_modules` and retry; use `npm install` only for lockfile mismatches |
| `auth --add` fails | Check the instance URL, admin password, MFA, and that the PDI is awake |
| Build fails in a `*.now.ts` file | Fluent supports only declarative definitions; fix the reported line |
| Install fails with authentication error | `npx now-sdk auth --list`; re-add or `--use` the correct alias |
| Install fails with scope/ownership error | Verify the configured scope is registered on the instance and within the documented length limit |
| App URL returns not found | Install did not finish; run `npx now-sdk install --info` |
| App login: "Wrong login/password" on instance | Check exact username, password, Active, Locked out, Password needs reset, app role, and `snc_basic_auth_api_access` |
| Same error on localhost with a non-admin user | Expected; test on the instance |
| Approval buttons missing | User lacks `<scope>.manager` |
| "Only ERP managers can..." message | Server rule blocked a non-manager state change; use the manager account |
| Approval Manager fields empty after confirm | Requester has no Manager set on the user record |
| No assets or channels | Installed with `--demoData false`; reinstall demo data or create records |
| API calls return 401 locally | Restart `npm run dev` to refresh the SDK session |
| Port 3000 busy | Use the port printed by `npm run dev`; do not kill unrelated processes |
| Undo a bad install | Use the Rollback link printed by `now-sdk install` |

---

## 12. Command reference

```powershell
npm ci                                   # install dependencies
npx now-sdk auth --add <url> --type basic --alias my-pdi
npx now-sdk auth --use my-pdi
npx now-sdk auth --list
npm run build                            # now-sdk build
npm run deploy                           # generate Fluent sources and install
npm run deploy -- --demoData false       # install without demo data
npx now-sdk install --info               # latest install status
npm run dev                              # local dev server
npm run types                            # now-sdk dependencies (type definitions)
npx now-sdk explain <topic>              # SDK documentation
```
