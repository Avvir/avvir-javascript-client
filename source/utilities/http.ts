import getAuthorizationHeaders, { User } from "./get_authorization_headers";
import {httpGetHeaders, httpPostHeaders} from "./request_headers";
import {isFirebaseUser, isGatewayUser} from "../models";
import Config from "../config";

export default class Http {
  static baseUrl = (): string => Config.getConfiguration().AVVIR_GATEWAY_URL;

  static fetch(url, data) {
    if (Config.getConfiguration().logFetch) {
      console.log("Calling fetch with:", url, data);
    }
    return fetch(url, data);
  }

  static get(url, user, contentType = "application/json") {
    return Http.fetch(url, {
      method: "GET",
      headers: {
        ...httpGetHeaders(contentType),
        ...getAuthorizationHeaders(user)
      }
    });
  }

  static put(url, user, body, contentType = "application/json") {
    return Http.fetch(url, {
      method: "PUT",
      headers: {
        ...httpPostHeaders(contentType),
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(body)
    });
  }

  static delete(url, user) {
    return Http.fetch(url, {
      method: "DELETE",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      }
    });
  }

  static post(url, user, body) {
    return Http.fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(body)
    });
  }

  static patch(url, user, body) {
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
