export enum RoutesPath {
  SIGN_IN = '/',
  RESET_PASSWORD = '/reset-password',

  PORTAL = '/portal',

  PROJECTS = '/portal/projects',
  CREATE_PROJECT = '/portal/projects/create',

  EDIT_PROJECT = '/portal/projects/:editId/:projectName',

  EDIT_PROJECT_GENERAL = '/portal/projects/:editId/:projectName/general',
  EDIT_PROJECT_ATTACHMENTS = '/portal/projects/:editId/:projectName/attachments',

  JOBS = '/portal/jobs',
  EDIT_JOB_GENERAL = '/portal/jobs/:editId/:jobName/general',
  EDIT_JOB_ATTACHMENTS = '/portal/jobs/:editId/:jobName/attachments',

  CREATE_CUSTOMER = '/portal/create-customer',
  LIST_OF_CUSTOMERS = '/portal/list-of-customers',

  CREATE_USER = '/portal/create-user',
  EDIT_USER = '/portal/edit-user/:email',
  LIST_OF_USERS = '/portal/list-of-users',

  SETTINGS = '/portal/settings/',
  SYSTEM = '/portal/settings/system',
  LOCAL_APPLICATIONS_SETTINGS = '/portal/settings/applications-settings',
  UPDATE = '/portal/settings/update',

  ADMIN = '/portal/admin',
  ADMIN_APPLICATIONS_SETTINGS = '/portal/admin/applications-settings',
  ADMIN_JOBS_SETTINGS = '/portal/admin/jobs-settings'
}
