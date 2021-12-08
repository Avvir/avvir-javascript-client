import UserRole from "../enums/user_role";

export interface ApiCreateInvitationForm {
    userEmail: string
    role: UserRole
    clientAccountId: string
    projectId?: string
}

export default ApiCreateInvitationForm;
