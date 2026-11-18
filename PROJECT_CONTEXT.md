# BJIT ERP - Living Project Context

Last updated: 2026-11-18 (Asia/Dhaka)

## 1. Purpose and maintenance

This is the project's ongoing implementation and handover document. It preserves
the requirements, decisions, completed work, deployment details, test evidence,
account setup, limitations, and follow-up work established so far.

**Update this document in the same change as every new implementation or fix.**
Update the relevant sections, the last-updated date, and the change log. Record
what actually changed and what was verified; distinguish planned features from
implemented ones. No automatic document-update job currently exists.

Never put passwords, API tokens, session cookies, or encoded credentials here.
Maintain test credentials separately in an approved password manager. Usernames
and role assignments below are non-secret account references.

Evidence boundaries:

- Implementation descriptions were checked against the local source on 2026-11-18.
- Deployment, instance configuration, account setup, and runtime test results below
  describe actions and observations from 2026-11-17 to 2026-11-18.
- This documentation change did not redeploy, retest the application, or recheck
  account state on the instance.

## 2. Original request and agreed scope

The project initially contained an Incident Response Manager demo. The first
request was to build and run that ServiceNow application; its build succeeded.

The next request was to clear the implementation and start from scratch,
implement the attached pages first, and follow Odoo when requirements were
missing. The old incident client, components, service, and Fluent UI page
definition were removed from the source.

Seven screenshot references defined the initial UI:

| Screenshot | Page or state |
| --- | --- |
| `login.png` | Login form, Sign in, Contact Us, Reset Password |
| `home.png` | Discuss home, sidebar, empty Inbox, channels, direct messages |
| `asset.png` | Collapsed Asset Management groups and totals |
| `asset-select.png` | Expanded asset groups, selection, Action menu |
| `asset-new-request.png` | Asset request form, approval status bar, chatter |
| `it-support.png` | Support ticket kanban |
| `it-support-new-request.png` | New support ticket form and status bar |

These were chat attachments, not project assets. They are not copied into this
repository; retain the originals separately for future visual comparisons.

The user explicitly selected:

1. Custom scoped ServiceNow tables and REST API, with seed/demo data.
2. Deploy to `dev337612`.
3. Validate login against real ServiceNow user credentials, not a mock login.
4. Keep other sidebar apps visible as placeholder pages.

The result is a screenshot-inspired, Odoo-style React UI on ServiceNow. It is not
an Odoo deployment, a complete ERP, or a formally verified pixel-perfect clone.

## 3. Application identity and environments

| Item | Value |
| --- | --- |
| Application | BJIT ERP |
| Package | `bjit-erp`, version `0.0.1` |
| Scope | `x_587205_bjit_erp` |
| Scope ID | `1693d17f9a444f38b16251c6a40a2e18` |
| Instance | https://dev337612.service-now.com |
| UI page | https://dev337612.service-now.com/x_587205_bjit_erp_app.do |
| Navigator entry | BJIT ERP > Open BJIT ERP |
| Local development | Normally http://localhost:3000 |
| Source packaging | `packageSourceCodeOnInstance: true` |

The local server temporarily used port 8081 when port 3000 was occupied.
Always use the URL printed by the SDK rather than assuming a port. A Docker
process was also observed on port 3000; do not terminate unrelated processes.

The last observed local server returned to port 3000. That is historical
information, not a guarantee that a server is running now.

## 4. Technology and architecture

- React and React DOM `19.x`.
- ServiceNow SDK `4.14.2`.
- ServiceNow Glide package `27.0.5`.
- ServiceNow isomorphic Rollup `^1.3.14`.
- Fluent TypeScript definitions for tables, choices, ACLs, roles, demo records,
  business rules, UI page, and navigator module.
- A direct ServiceNow UI page imports the client HTML entry point.
- React components use a centralized ServiceNow Table API service.
- Routing uses query parameters and browser history, not a separate router package.
- The ServiceNow globals tag remains in the HTML entry point.
- Custom CSS and inline SVG icons recreate the Odoo-style interface without an
  external icon-font dependency.

### Source map

| Area | Entry points |
| --- | --- |
| App composition and routing | [app.jsx](src/client/app.jsx), [router.js](src/client/utils/router.js) |
| Shared app state | [context.jsx](src/client/context.jsx) |
| Sidebar application definitions | [apps.js](src/client/apps.js) |
| Theme | [app.css](src/client/app.css) |
| HTML and React bootstrap | [index.html](src/client/index.html), [main.jsx](src/client/main.jsx) |
| Authentication | [auth.js](src/client/services/auth.js), [Login.jsx](src/client/pages/Login.jsx) |
| Table API and attachments | [api.js](src/client/services/api.js) |
| Field helpers and choices | [fields.js](src/client/utils/fields.js), [constants.js](src/client/utils/constants.js) |
| Shared UI | [common components](src/client/components/common), [layout](src/client/components/layout) |
| Discuss | [Discuss.jsx](src/client/pages/discuss/Discuss.jsx) |
| Assets | [asset pages](src/client/pages/assets) |
| Support | [support pages](src/client/pages/support) |
| Employee management | [EmployeeManagement.jsx](src/client/pages/employees/EmployeeManagement.jsx) |
| Fluent data model | [tables](src/fluent/tables) |
| Roles and ACLs | [roles-acls.now.ts](src/fluent/security/roles-acls.now.ts) |
| Server workflows | [workflow.now.ts](src/fluent/business-rules/workflow.now.ts) |
| Seed/demo data | [demo-data.now.ts](src/fluent/data/demo-data.now.ts) |
| UI page and navigator | [ui-pages](src/fluent/ui-pages) |

## 5. Implemented functionality

### Application shell and shared controls

- Blue top navigation bar and Odoo-style application sidebar.
- App-grid home menu.
- User menu, logout, profile link, message preview, and activity menu.
- Toast notifications and dialog components.
- Language selection stored locally; this does not translate the application.
- Search terms and facets, Filters, Group By, and saved Favorites.
- Favorites are browser-local, not stored in a ServiceNow table.
- Grouped lists with expandable groups, row selection, totals, and optional columns.
- CSV export for selected assets.
- Many-to-one reference search widgets.
- Status-bar arrows for workflows.
- Kanban, list, and pivot views where described below.
- Responsive layout adjustments for narrower screens.

### Login

- Username/email and password inputs.
- REST-based credential validation against ServiceNow.
- Identity check rejects a returned account that does not match the typed
  username or email; this was added after the local proxy returned admin for an
  unrelated username.
- Email-to-username lookup is attempted when direct email authentication fails
  and a ServiceNow session token is available.
- Login data, including Base64-encoded Basic credentials, is stored in browser
  `sessionStorage` and cleared on app logout.
- Contact Us opens an email link; Reset Password links to the platform reset page.
- There is no app-specific password database or registration flow.

### Discuss

- Inbox, Starred, and History mailboxes.
- Public channels and direct-message conversations.
- Channel creation, channel browsing, and starting a direct conversation.
- Posting messages to channels/conversations.
- Star/unstar, mark read, and Mark All Read.
- Related-document links for ticket and asset-request notifications.
- Start a Meeting creates a chat conversation and a notification, not an
  audio/video meeting.
- Message preview and periodic inbox refresh in the top navigation.

### Asset Management

- Asset list defaults to Asset Type > Category > Asset Name grouping.
- Quantity and Remaining sums, including selection-based footer totals.
- Row selection, Action menu, optional columns, filters, search, and favorites.
- Asset detail, manager create/edit, and request buttons.
- Asset request creation from a selected asset or the Asset Requests list.
- Asset request list with My Requests and To Approve filters.
- Asset report/pivot showing Quantity, Remaining, and Allocated measures.
- Request form displays asset details, employee, department, request date,
  user comments, manager comments, workflow steps, and chatter.

Main asset-request flow:

```text
Draft -> Submitted -> 1st Manager Approved -> 2nd Manager Approved
      -> Approved -> Allocated
```

Additional UI actions include Reject, Cancel, and Reset to Draft where applicable.

Server rules:

- Manager role required to enter approval, allocation, or rejection states.
- Submission/allocation checks available remaining quantity.
- Allocation decrements Remaining by one, assigns the employee, and changes
  asset status to Deployed when Remaining reaches zero.
- Creation and status changes generate chatter notifications.
- Request numbers use an `AREQ` sequence.

### Support

- Tickets default to kanban with the Me filter enabled.
- List and pivot alternatives.
- Search, filters, grouping, and favorites.
- New ticket form includes requester identity, department, designation, title,
  category, support type, branch, support location, priority, description,
  three approval managers, reject reason, and pending reason.
- Support location choices can be filtered by branch.
- Draft save, duplicate, delete, confirm, process, reject, and reset actions.

Main ticket flow:

```text
Draft -> Confirmed -> In Progress -> Completed -> Closed
```

Server rules:

- Manager role required for In Progress, Completed, Closed, and Rejected states.
- Rejection requires a reason.
- Confirmation fills up to three approval-manager references from the requester's
  manager hierarchy.
- Ticket numbers follow `SUPP/YYYY/MM/sequence`, for example `SUPP/2026/11/1001`.
- Creation and status changes generate chatter notifications.

### Employee management

- Department-filtered directory with Odoo-style employee cards and list view.
- Opening Employees defaults to the removable `Me` filter and queries only the
  signed-in user's active `sys_user` record. Removing `Me` loads the directory;
  reapplying it restores the self card. Cards use a compact, fixed-width layout
  with a photo, title, full department hierarchy, email, and phone.
- Employee directory and profile styles are imported directly from
  `employees.css`. The SDK embeds these styles into the JavaScript bundle rather
  than relying on the shared shell stylesheet. The directory uses a white rail, compact
  374px photo cards, wrapped department paths, and responsive mobile filters.
- Employee top navigation matches the references; Skill Review and Card Request
  are clearly marked as future modules.
- Employee profile tabs for work information, private information, HR settings,
  qualifications, experience, project history, certifications, training,
  promotions, and technical skills.
- Users with the Employee role can create and fully manage employee profiles,
  including every employee's private, HR, and history data.
- Employee module UI access no longer depends on the client-side role lookup;
  ServiceNow table ACLs enforce access for the Employee role.
- Private and HR information is stored in a separate table from the public
  directory profile, with row-level ACL checks on the ServiceNow instance.
- Employee profiles require a related `sys_user`; creating a ServiceNow login
  account and assigning its Employee role remains a separate user-provisioning step.
  The Employee role includes `snc_basic_auth_api_access` so that accounts granted
  the app role can authenticate through this instance's Basic-auth REST login.
- Set Pending records a pending reason; there is no separate Pending state.

### Chatter and attachments

- Send message and Log note composer modes.
- Author avatars, timestamps, and day separators.
- Workflow-generated messages.
- File upload through the ServiceNow Attachment API and attachment links.
- New unsaved forms show "Creating a new record..." and disable posting/upload.

### Placeholder apps

Calendar, Contacts, Dashboards, Payroll, Project, Surveys, Medical Benefits,
Daily Report, Intranet, Provident Fund, UPS, Gate Pass, Attendances,
Time Off, and Meal Management display an unavailable/roadmap page.

The profile link currently leads to the Employees directory.

## 6. Data model

All nine application tables enable web-service access. Existing `sys_user`
records provide login identities and department/manager references for employee
profiles.

| Table | Purpose and main fields |
| --- | --- |
| `x_587205_bjit_erp_location` | Name, branch, asset-store flag, active |
| `x_587205_bjit_erp_asset` | Name, asset number/model, serial, type/category, quantity, remaining, status, assigned employee, location, purchase date, notes |
| `x_587205_bjit_erp_asset_req` | Number, asset, employee, request date, state, user/manager comments |
| `x_587205_bjit_erp_ticket` | Number, title, requester, date, category/type, branch/location, priority, description, three managers, reasons, state |
| `x_587205_bjit_erp_channel` | Name, description, channel/chat type, public flag, members |
| `x_587205_bjit_erp_message` | Body, author, type, channel, related table/record/name, inbox recipients, starred-by and read-by lists |
| `x_587205_bjit_erp_employee` | Directory profile, related user, employee number, title, department, manager, work contacts, branch and office |
| `x_587205_bjit_erp_employee_private` | Private contact/identity, family, employment status and HR details |
| `x_587205_bjit_erp_employee_item` | Qualifications, experience, project/certification/training/promotion history and technical skills |

Choice labels are also mirrored in the client constants. Keep Fluent choices,
client choices, forms, and business-rule state names consistent when changing them.

The current Fluent files use explicit declarative records. An initial build
failed on loops, `Set`, and typed seed-data generation inside Fluent files; those
were replaced with static ACL and demo-record definitions.

### Demo data

- 16 asset records, representing 111 quantity units and 74 remaining units.
- Asset type totals: Accessories 26/26, Fixed Asset 3/3, Components 4/4,
  License 78/41 (Quantity/Remaining).
- 6 location records across three branches.
- 2 public channels: `general` and `BJIT_Canteen_General_Administration`.
- 1 welcome message defined for the general channel.
- No screenshot-specific closed tickets are seeded; users create their own.
- Demo records use `$meta: { installMethod: 'demo' }`.

The screenshot's parenthesized group counts do not all match the number of seed
records: the UI counts records, while quantities can be greater than one.

## 7. Roles and access behavior

| Role | Intended use |
| --- | --- |
| `x_587205_bjit_erp.user` | Employee: Discuss, asset requests, support tickets |
| `x_587205_bjit_erp.manager` | Manager: contains employee role; master-data maintenance, approvals, ticket processing |
| `x_587205_bjit_erp.employee` | Employee: contains app user and Basic Auth API roles; full CRUD access to all employee, private, and history records |
| `x_587205_bjit_erp.hr` | HR: contains employee role; also has full Employee-module access |
| `admin` | Platform administrator; application ACLs allow admin override |
| `snc_basic_auth_api_access` | Instance-level permission required for Basic-auth API login on this instance |

Current table ACL design:

- Application users can read all six application tables.
- Assets and locations require manager permission for create/write.
- Requests, tickets, channels, and messages allow employee create/write.
- Delete requires manager permission.
- Workflow rules additionally guard specific manager-only state changes.
- Employee, private, and history tables grant full CRUD to the Employee role (including HR/manager roles that inherit Employee).

Other application tables retain their initial table-level permissions, not
comprehensive record-ownership or private conversation ACLs. A client-side Me
filter is a view filter, not an authorization boundary. Do not treat this initial
implementation as production-hardened.

When manager-role lookup fails, the client currently treats the result as unknown
and shows manager controls. An employee seeing CREATE does not mean they have
server permission to create an asset. This behavior was observed during testing.

The numbered approval stages currently require the ERP manager role; the server
does not enforce a distinct named approver for every asset approval stage.

## 8. Login investigation and test accounts

### What happened

The user reported that `bjit_employee1@example.com` with the employee role could
not log in and requested credentials for testing, with no implementation edits.

Instance investigation on 2026-11-17 found:

- No matching `bjit_employee1` account was returned.
- `bjit_employee2` and `bjit_employee3` existed with the employee role.
- The supplied password was rejected for those accounts.
- Initial failures alone did not establish whether the original passwords were
  unset or incorrect; the earlier chat's "password wasn't saved" explanation
  should not be treated as proven.
- After setting known test passwords, ordinary ServiceNow web login succeeded,
  but REST Basic authentication still returned HTTP 401.
- The decisive restriction was the instance's Basic-auth role requirement.

Observed instance properties included:

```text
glide.authenticate.basic_auth.restriction.enforce = true
glide.authenticate.basic_auth.restriction.active = true
glide.authenticate.basic_auth.allowed_roles = snc_basic_auth_api_access
glide.authenticate.basic_auth.restriction.enforcement_date = 2026-10-22 22:44:08
```

No application implementation was edited during this investigation. Instance user
records/passwords/role assignments were changed, and the local dev server was
restarted to refresh SDK authentication. The instance-wide restriction was not
disabled.

### Accounts prepared on the original instance

The accounts listed below were prepared on the original `dev209725` instance.
They are not evidence of account availability on `dev337612`; create or verify
users and roles on that instance before login testing.

### Account created on dev337612

| Username | Email | Application role | Notes |
| --- | --- | --- | --- |
| `bjit_manager_test1` | `bjit_manager_test1@example.com` | manager | Display name BJIT Manager Test 1; title IT Manager; active; granted `snc_basic_auth_api_access`; created 2026-11-18 |
| `bjit_hr_module_test_20261118` | `bjit.hr.module.test.20261118@example.invalid` | HR, Employee | Synthetic active HR module test account; linked to employee profile `TEST-HR-20261118`; has direct Basic Auth API access; created 2026-11-18 |

Temporary passwords were shared directly with the user and are not stored here.
Rotate them after testing.

| Username | Email | Application role | Notes |
| --- | --- | --- | --- |
| `bjit_manager` | `bjit_manager@example.com` | manager | Created for approval and processing tests; IT Manager |
| `bjit_employee` | `bjit_employee@example.com` | user | Created for employee tests; display name MD SHOFIUDDIN, employee number 11020 |
| `bjit_employee2` | `bjit_employee2@example.com` | user | Existing user account; test password reset |
| `bjit_employee3` | `bjit_employee3@example.com` | user | Existing user account; test password reset |
| `admin` | Instance-managed | admin | Existing instance admin; password not obtained |

All four named BJIT test accounts were granted `snc_basic_auth_api_access`.
`bjit_employee` reports to `bjit_manager`. No new full platform-admin test account
was created.

**Passwords are deliberately not reproduced here.** Test passwords were supplied
in the prior conversation; retrieve them from an approved credential store or
reset them in ServiceNow. Rotate shared test passwords before production use.
Do not assume the originally supplied password is still valid.

### Recommended login/testing procedure

1. Use the instance, not localhost, for employee/manager authentication tests.
2. Create or verify the intended user and roles on `dev337612`.
3. Sign in at https://dev337612.service-now.com/login.do with that user.
4. Open https://dev337612.service-now.com/x_587205_bjit_erp_app.do.
5. Sign in through the application with the same account. Username is the most
   reliable identifier; email fallback depends on an available platform session.
6. To switch roles, log out of both the app and ServiceNow, or use separate browser
   profiles/private sessions.
7. If login fails, check exact username, password, active/locked/reset flags,
   app role, and `snc_basic_auth_api_access`.

### Localhost authentication caveat

The SDK dev proxy was observed replacing outbound credentials with the SDK's
admin credentials. Consequently:

- Employee/manager credentials failed the app's returned-identity check locally.
- Typing `admin` with an arbitrary nonempty password could appear to log in,
  because the proxy authenticated as its own admin account.
- This is a development-proxy artifact, not proof the typed password is valid.
- Proxy requests sometimes returned 401 when the SDK credential expired; restarting
  the server refreshed the SDK login.
- Do not use localhost to validate role isolation or password correctness.

## 9. Build, deploy, and run

Run these commands from the project root:

```powershell
npm run build
npm run deploy
npm run dev
```

Other existing scripts:

```powershell
npm run types
npm run transform
```

- Build runs `now-sdk build` and the existing prebuild script bundles client assets.
- Deploy runs `now-sdk install` using the configured SDK instance credentials.
- Dev runs the existing watch script and an instance API proxy.
- Both client build scripts clear their static build-output directory.
  Avoid running a production build concurrently with the watcher; previous work
  restarted dev after production builds.
- Demo data is installed by default by the SDK. Review demo-data impact before
  installing into any environment with real records.
- Generated assets are in `dist`; generated Fluent keys are not hand-maintained.
- The SDK warned that no client `tsconfig.json` existed and used default options.
  Builds nevertheless passed.
- A Fastify deprecation warning was also observed; it did not prevent startup.

No new dependency or build-tool installation was needed for this implementation.

## 10. Verification performed

These are historical manual/CLI/browser checks, not an automated regression suite.

| Check | Result recorded on 2026-11-17 |
| --- | --- |
| Initial incident-demo build | Passed |
| New ERP build/type-check | Passed after static Fluent and numbering fixes |
| Instance deployment | SDK install completed successfully, including final deployment |
| dev337612 deployment | 2026-11-18 build passed and SDK install completed; target app `x_587205_bjit_erp`, sys_id `1693d17f9a444f38b16251c6a40a2e18`; app page `https://dev337612.service-now.com/x_587205_bjit_erp_app.do` |
| Current deployment | 2026-11-18 `npm run build` passed; `npm run deploy` completed successfully against dev337612; SDK reported app sys_id `1693d17f9a444f38b16251c6a40a2e18` and rollback context `17039b36c3e497502416d50d05013113`; no post-deployment browser verification performed |
| Employee management deployment | 2026-11-18 build passed; SDK install completed on dev337612 with demo data disabled; HR/Employee roles, all three employee tables, and 12 employee ACL records verified through SDK queries |
| Employee role inheritance | Employee includes `snc_basic_auth_api_access`; HR and manager both contain Employee; `bjit_manager_test1` resolves to Employee on dev337612 |
| HR module test setup | 2026-11-18 synthetic HR/Employee account and linked employee profile created; active user, roles, profile, and direct Basic Auth API role verified through SDK queries; direct Basic Auth check could not complete because the HTTPS connection closed; portal browser test remains outstanding |
| Employee-role full access | Build passed and SDK install completed on dev337612; active read/create/write/delete ACLs on employee, private, and history tables are associated with the Employee role; row-level private/history restrictions are removed; non-admin browser confirmation remains outstanding |
| Local availability | HTTP 200 on active development URL |
| Screenshot comparisons | Discuss, grouped/selected assets, asset request, support form/kanban visually inspected |
| Asset totals | Quantity 111, Remaining 74 verified |
| Asset workflow | Submitted through all approvals to Allocated |
| Allocation effect | Monitor00570 Remaining 0, Deployed, assigned to employee |
| Workflow chatter | Creation and status-transition messages observed |
| Support workflow | Confirmed -> In Progress -> Completed -> Closed |
| Ticket numbering | `SUPP/2026/11/1001` observed |
| Support list/pivot | Rendered with test ticket |
| Asset request list/report | Rendered with expected records/totals |
| Channel post | Message submitted and rendered |
| Placeholder app | Payroll unavailable page displayed |
| Combined local smoke checks | No application page errors captured in that run |
| Four test accounts | Direct instance REST authentication succeeded; all saw 16 assets |
| Invalid password | Direct instance REST returned HTTP 401 |
| Employee app login | Browser login on instance showed MD SHOFIUDDIN and asset totals 111/74 |
| Local employee login | Reproduced Wrong login/password due to proxy identity |

The initial end-to-end workflows used the SDK/admin context. They are not proof
that every action has been tested with each non-admin role. The manager account
was authenticated via REST; a full manager-browser workflow was not recorded.

The platform's general application shell emitted errors/warnings during ordinary
ServiceNow navigation; the direct employee ERP page itself loaded successfully.

After workflow tests, the test request, ticket, and generated test messages were
deleted and Monitor00570 was restored to Remaining 1, Ready to Deploy, unassigned.
There was no subsequent full audit of all demo messages, attachments, or channels.

No automated test runner/test script is currently defined in the package manifest.

## 11. Known limitations and follow-up items

These are context and future work, not additional completed features:

1. Authentication keeps reversible Basic credentials in session storage.
   A production authentication/session design remains to be agreed.
2. Role lookup can fail open for UI visibility; server ACLs remain authoritative.
3. Ownership/private-chat restrictions are not implemented as record-level ACLs.
4. Server guards protect selected states, but do not validate every allowed
   previous-state/next-state pair or designated approver.
5. Asset allocation is a read/decrement/update sequence; concurrency behavior,
   reversal, returns, and repeated allocation edge cases have not been verified.
6. Some components suppress background/request errors; failure paths need review.
7. Form dirty flags and discard controls exist in places, but comprehensive
   unsaved-navigation protection is not implemented.
8. Lists request bounded result sets; full large-dataset server paging is not
   consistently implemented.
9. Language selection does not localize text.
10. Start a Meeting is chat-only; presence indicators are not verified real presence.
11. Attachment upload controls exist, but attachment download authorization and
    cross-user testing were not demonstrated end to end.
12. Native ServiceNow form layouts for all custom tables have not been documented
    as implemented; the React forms are the implemented primary UI.
13. The remaining 16 sidebar applications are placeholders.
14. UI visual checks were manual, not automated pixel-diff or accessibility audits.
15. Users created directly on the instance are not provisioned by the Fluent
    demo-data file; another instance will require account/role setup.
16. The old incident UI page was removed from source; removal of every previously
    deployed legacy artifact from the instance was not independently verified.
17. HR employee profiles link to existing ServiceNow users. User-account
    provisioning and Employee/HR role assignment are not handled by the employee
    profile form.
18. The deployed directory, profile, private-record ACL, and history workflows
    have not yet been browser-tested under separate HR, employee-self, and
    employee-other accounts.
19. The Employee module now skips the client-side Employee/HR role gate and relies
    on server-side ACLs for the Employee role. That role has full access to all
    employee directory, private, HR, and history records. This includes highly
    sensitive employee data. Non-admin portal verification is still outstanding.

Before calling a future change complete, build it, run focused checks for the
changed behavior, record deployment status, and update this document.

## 12. Change log

| Date | Change | Evidence/status |
| --- | --- | --- |
| 2026-11-17 | Built and ran original Incident Response Manager | Build passed; local HTTP 200 |
| 2026-11-17 | Replaced incident source with BJIT ERP screenshot-based UI | React shell, Login, Discuss, Assets, Support, placeholders |
| 2026-11-17 | Added Fluent tables, roles/ACLs, workflows, demo data, UI page/menu | Build and deployment passed |
| 2026-11-17 | Fixed unsupported Fluent constructs and missing number defaults | Static definitions; support numbering verified |
| 2026-11-17 | Added login returned-identity check after proxy auth mismatch | Wrong-identity login rejected |
| 2026-11-17 | Tested workflows, views, chatter, reports; cleaned test records | Manual/browser/API checks above |
| 2026-11-17 | Investigated login failure without editing implementation | Found missing requested account and Basic-auth role restriction |
| 2026-11-17 | Prepared employee/manager test accounts and API-access roles | Four successful direct REST logins; employee browser app login passed |
| 2026-11-18 | Created this living project context document | Documentation only; source/config inspected; no app changes |
| 2026-11-18 | Initialized and deployed BJIT ERP on dev337612 using the instance vendor prefix | Build passed; SDK install completed with demo data; local scope/table/role/page references updated; other original-instance test accounts need verification here |
| 2026-11-18 | Created BJIT Manager Test 1 on dev337612 | Active account verified with manager, included employee, and Basic Auth API roles; temporary password set and shared directly |
| 2026-11-18 | Implemented and deployed employee management | Employee/HR roles, Odoo-style directory/profile UI, employee/private/history tables, row-level ACLs and Basic Auth role inheritance; build/install passed and remote roles/tables/ACLs verified |
| 2026-11-18 | Fixed Employee module false access denial | Role checks now match known role sys_ids and request only role assignment record sys_ids; own-role-row ACL remains restricted to the logged-in user; build/install passed; assigned Employee and HR roles and active ACL verified on dev337612; browser test under that account remains outstanding |
| 2026-11-18 | Made HR employee permissions explicit | Added HR directly to own-role lookup, employee directory, private details, and history read ACLs alongside Employee; build/install passed and app-scoped ACLs verified active on dev337612; non-admin portal confirmation remains outstanding |
| 2026-11-18 | Created synthetic HR module test account | Added active `bjit_hr_module_test_20261118` with Employee/HR roles and inherited Basic Auth access, plus a minimal linked employee profile; SDK queries verified records; login and browser portal checks remain outstanding |
| 2026-11-18 | Fixed portal role lookup query | Instance Table API returned no rows for combined user+role conditions on `sys_user_has_role`, while GlideRecord confirmed the user's role rows; client now fetches only the current user's role rows and filters locally; build passed and SDK install completed on dev337612; live browser verification remains pending |
| 2026-11-18 | Granted direct Basic Auth access to HR module test account | Added direct `snc_basic_auth_api_access` assignment in addition to the inherited assignment; verified the direct role row through SDK query; portal login verification pending |
| 2026-11-18 | Expanded Employee module access to Employee role | Removed the client-side role gate and granted Employee-role full CRUD on employee, private, HR, and history tables; build passed, SDK install completed, and remote active ACL role mappings were verified; non-admin browser confirmation remains outstanding |
| 2026-11-18 | Built and deployed current working tree | `npm run build` passed; `npm run deploy` completed on dev337612; SDK provided app and rollback links; no post-deployment browser verification performed |

| 2026-11-18 | Added employee self-card landing | Default removable `Me` filter, server-side self lookup, pagination reset, stale-response protection, and reference-sized cards; build and deployment to dev337612 completed; no post-deployment browser verification |
| 2026-11-18 | Refined Odoo employee directory styling | Employee styles now ship inline with the component JavaScript instead of the shared stylesheet; white department rail, 374px photo cards, wrapped department paths, keyboard focus, and mobile filters; build passed and inline styles confirmed in output; not deployed; visual browser verification unavailable in this session |

### Template for the next implementation update

```text
Date:
Request / decision:
Implemented changes:
Affected source files / tables:
Data migration or instance-only changes:
Build and focused test results:
Deployment target / status:
Known limitations or follow-up:
```
