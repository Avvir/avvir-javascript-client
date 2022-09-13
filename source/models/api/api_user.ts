import UserRole from "../enums/user_role";

export class ApiUser {
    name: string
    userOrganization: string
    email: string
    role: UserRole
    projectId: string
    userId: number

    constructor({name, userOrganization, email, role, projectId, userId}: Partial<ApiUser> = {}) {
        this.name = name;
        this.userOrganization = userOrganization;
        this.email = email;
        this.role = role;
        this.projectId = projectId;
        this.userId = userId
    }
}

export default ApiUser;
