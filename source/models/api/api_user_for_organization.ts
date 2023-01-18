import UserRole from "../enums/user_role";
import {DateLike} from "./type_aliases";

export class ApiUserForOrganization {
    id: number
    name: string
    email: string
    role: UserRole
    projects: string[]
    accessType: string
    inviteStatus: string
    masterformatCodes: string[]
    latestInvitationExpiry: DateLike

    constructor({id, name,  email, role, projects, accessType, inviteStatus, masterformatCodes, latestInvitationExpiry}: Partial<ApiUserForOrganization> = {}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.projects = projects;
        this.accessType = accessType;
        this.inviteStatus = inviteStatus;
        this.masterformatCodes = masterformatCodes;
        this.latestInvitationExpiry = latestInvitationExpiry;
    }
}

export default ApiUserForOrganization;
