import {User} from "../utilities/get_authorization_headers";
import Http from "../utilities/http";
import ApiUser from "../models/api/api_user";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import UserRole from "../models/enums/user_role";
import ApiInvitation from "../models/api/api_invitation";
import ApiCreateInvitationForm from "../models/api/api_create_invitation_form";
import ApiUserPermission from "../models/api/api_user_permission";

export default class UserApi {

  static createInvitation(forms: ApiCreateInvitationForm[], user: User): Promise<ApiInvitation[]> {
    const url = `${Http.baseUrl()}/users/invitations`;
    return Http.post(url, user, forms) as unknown as Promise<ApiInvitation[]>;
  }

  static getInvitation(invitationToken: string, user: User): Promise<ApiInvitation> {
    const url = `${Http.baseUrl()}/users/invitations/${invitationToken}`;
    return Http.get(url, user) as unknown as Promise<ApiInvitation>;
  }

  static getUserAccount(user: User): Promise<ApiUser> {
    const url = `${Http.baseUrl()}/users/accounts/self`;
    return Http.get(url, user) as unknown as Promise<ApiUser>;
  }

  static getUserPermissions(userId: number, user: User): Promise<ApiUserPermission[]> {
    const url = `${Http.baseUrl()}/users/accounts/${userId}/permissions`;
    return Http.get(url, user) as unknown as Promise<ApiUserPermission[]>;
  }

  static deleteUserPermission(userId: number, permissionId: number, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/users/accounts/${userId}/permissions/${permissionId}`;
    return Http.delete(url, user) as unknown as Promise<void>;
  }

  static createUserPermission(userId: number, permission: ApiUserPermission, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/users/accounts/${userId}/permissions/new`;
    return Http.put(url, user, permission) as unknown as Promise<void>;
  }

  static updateUserAccount(userId: number, apiUser: ApiUser, user: User): Promise<ApiUser> {
    const url = `${Http.baseUrl()}/users/accounts/${userId}`;
    return Http.put(url, user, apiUser) as unknown as Promise<ApiUser>;
  }

  static sendPasswordResetEmail(email: string): Promise<void> {
    email = encodeURIComponent(email);
    const url = `${Http.baseUrl()}/users/send-password-reset-email`;
    return Http.post(url, null, {email}) as unknown as Promise<void>;
  }

  static resetPassword(password: string, email: string, token: string): Promise<void> {
    email = encodeURIComponent(email);
    const url = `${Http.baseUrl()}/users/reset-password`;
    return Http.post(url, null, {email, token, password}) as unknown as Promise<void>;
  }

}

makeErrorsPretty(UserApi, {
        exclude: [],
        overrideErrorMessage: [
            "resetPassword",
            "sendPasswordResetEmail",
            "createInvitation",
            "getInvitation"
        ]})
