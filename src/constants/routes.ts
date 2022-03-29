export enum RoutesPath {
    SIGN_IN= "/",
    RESET_PASSWORD = "/reset-password",

    PORTAL = "/portal",

    PROJECTS = "/portal/projects",
    CREATE_PROJECT = "/portal/projects/create",
    EDIT_PROJECT = "/portal/projects/:editId",

    JOBS = "/portal/jobs",
    EDIT_JOB = "/portal/jobs/:editId",

    CREATE_CUSTOMER = "/portal/create-customer",
    LIST_OF_CUSTOMERS = "/portal/list-of-customers",

    CREATE_USER = "/portal/create-user",
    LIST_OF_USERS = "/portal/list-of-users",

    SYSTEM =  "/portal/system",
    UPDATE =  "/portal/update",
}
