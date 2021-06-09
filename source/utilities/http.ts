import getAuthorizationHeaders, {User} from "./get_authorization_headers";
import {httpPostHeaders} from "./request_headers";
import {isFirebaseUser, isGatewayUser} from "./reduce_user_session";
import Config from "../config";

export default class Http {
  static baseUrl = ():string => Config.getConfiguration().AVVIR_GATEWAY_URL;
  static get(url, user){
    return fetch(url, {
      method: "GET",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      }
    });
  }
  static delete(url, user){
    return fetch(url, {
      method: "DELETE",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      }
    });
  }
  static post(url, user, body){
    return fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(body)
    });
  }

  static patch(url, user, body){
    return fetch(url, {
      method: "PATCH",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(body)
    });
  }

  static addAuthToDownloadUrl(baseUrl: string, user: User): string {
    if (user) {
      if (isGatewayUser(user)) {
        return `${baseUrl}?auth=${user.gatewayUser.idToken}`;
      } else if (isFirebaseUser(user)) {
        return `${baseUrl}?firebaseAuth=${user.firebaseUser.idToken}`;
      }
    } else {
      return baseUrl;
    }
  }
}