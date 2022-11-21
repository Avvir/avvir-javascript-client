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

  static getUserAccount(email: string, role: UserRole, user: User): Promise<ApiUser> {
    const encodedEmail = encodeURIComponent(email);
    const url = `${Http.baseUrl()}/users/accounts/${encodedEmail}/${role}`;
    return Http.get(url, user) as unknown as Promise<ApiUser>;
  }

  static getUserPermissions(email: string, user: User): Promise<ApiUserPermission[]> {
    const encodedEmail = encodeURIComponent(email);
    const url = `${Http.baseUrl()}/users/accounts/${encodedEmail}/permissions`;
    return Http.get(url, user) as unknown as Promise<ApiUserPermission[]>;
  }

  static updateUserAccount(email: string, role: UserRole, apiUser: ApiUser, user: User): Promise<ApiUser> {
    const encodedEmail = encodeURIComponent(email);
    const url = `${Http.baseUrl()}/users/accounts/${encodedEmail}/${role}`;
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
