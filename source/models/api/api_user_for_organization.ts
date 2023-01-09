import UserRole from "../enums/user_role";
import {List} from "underscore";

export class ApiUserForOrganization {
    name: string
    email: string
    role: UserRole
    projects: string[]
    accessType: string
    inviteStatus: string
    masterformatCodes: string[]

    constructor({name,  email, role, projects, accessType, inviteStatus, masterformatCodes}: Partial<ApiUserForOrganization> = {}) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.projects = projects;
        this.accessType = accessType;
        this.inviteStatus = inviteStatus;
        this.masterformatCodes = masterformatCodes;
    }
}

export default ApiUserForOrganization;
