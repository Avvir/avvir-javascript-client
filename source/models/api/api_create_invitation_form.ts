import UserRole from "../enums/user_role";
import { ApiUserRole } from "./api_user_role";

export interface ApiCreateInvitationForm {
    userEmail: string
    role: UserRole
    clientAccountId: string
    projectId?: string
    userRoles?: ApiUserRole[];
}

export default ApiCreateInvitationForm;
