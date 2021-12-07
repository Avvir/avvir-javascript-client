import UserRole from "../enums/user_role";

export default interface ApiCreateInvitationForm {
    userEmail: string
    role: UserRole
    clientAccountId: string
    projectId?: string
}
