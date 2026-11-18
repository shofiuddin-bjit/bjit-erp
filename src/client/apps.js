// Sidebar order and icons follow the BJIT Odoo home menu.
export const APPS = [
    { id: 'discuss', label: 'Discuss', icon: 'chat', color: '#c2496b' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar', color: '#b29a4a' },
    { id: 'contacts', label: 'Contacts', icon: 'card', color: '#1f8a8a' },
    { id: 'dashboards', label: 'Dashboards', icon: 'gauge', color: '#c94b5d' },
    { id: 'payroll', label: 'Payroll', icon: 'money', color: '#c3566e' },
    { id: 'project', label: 'Project', icon: 'puzzle', color: '#5b5f8f' },
    { id: 'surveys', label: 'Surveys', icon: 'clipboard', color: '#c8743a' },
    { id: 'medical', label: 'Medical Benefits', icon: 'medical', color: '#4a4a4a' },
    { id: 'daily_report', label: 'Daily Report', icon: 'report', color: '#3fb5a3' },
    { id: 'intranet', label: 'Intranet', icon: 'cloudOnly', color: '#7a2a6e' },
    { id: 'provident_fund', label: 'Provident Fund', icon: 'coin', color: '#e8a93c' },
    { id: 'ups', label: 'UPS', icon: 'battery', color: '#7b3fa0' },
    { id: 'support', label: 'Support', icon: 'lifebuoy', color: '#8e4bb0' },
    { id: 'gate_pass', label: 'Gate Pass', icon: 'gate', color: '#8a47b5' },
    { id: 'employees', label: 'Employees', icon: 'users', color: '#1f7c84' },
    { id: 'asset', label: 'Asset Management', icon: 'asset', color: '#3b95c8' },
    { id: 'attendances', label: 'Attendances', icon: 'userClock', color: '#5c86a8' },
    { id: 'time_off', label: 'Time Off', icon: 'userCal', color: '#a59a4c' },
    { id: 'meal', label: 'Meal Management', icon: 'utensils', color: '#2f6fb3' },
]

export const IMPLEMENTED_APPS = new Set(['discuss', 'support', 'asset', 'employees'])

export const appById = (id) => APPS.find((a) => a.id === id) || APPS[0]
