import getAuthorizationHeaders, { User } from "./get_authorization_headers";
import {httpGetHeaders, httpPostHeaders} from "./request_headers";
import {isFirebaseUser, isGatewayUser} from "../models";
import Config from "../config";

export default class Http {
  static baseUrl = (): string => Config.getConfiguration().AVVIR_GATEWAY_URL;

  static fetch(url: RequestInfo, data) {
    if (Config.getConfiguration().logFetch) {
      console.log("Calling fetch with:", url, data);
    }
    return fetch(url, data);
  }

  static get(url: RequestInfo, user: User, contentType = "application/json") {
    return Http.fetch(url, {
      method: "GET",
      headers: {
        ...httpGetHeaders(contentType),
        ...getAuthorizationHeaders(user)
      }
    });
  }

  static put(url: RequestInfo, user: User, body?: any, contentType = "application/json") {
    return Http.fetch(url, {
      method: "PUT",
      headers: {
        ...httpPostHeaders(contentType),
        ...getAuthorizationHeaders(user)
      },
      body: body == null ? "" : JSON.stringify(body)
    });
  }

  static delete(url: RequestInfo, user: User) {
    return Http.fetch(url, {
      method: "DELETE",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      }
    });
  }

  static post(url: RequestInfo, user: User, body?: any) {
    return Http.fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: body == null ? "" : JSON.stringify(body)
    });
  }

  static patch(url: RequestInfo, user: User, body: any) {
    return Http.fetch(url, {
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

  static __fetch;
}
