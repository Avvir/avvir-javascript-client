import getAuthorizationHeaders, {User} from "./get_authorization_headers";
import {httpPostHeaders} from "./request_headers";
import {isFirebaseUser, isGatewayUser} from "./reduce_user_session";
import fetch, {Response} from "node-fetch";
import Config from "../config";

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

export default class Http {
  static baseUrl = ():string => Config.getConfiguration().AVVIR_GATEWAY_URL;

  static fetch(url: string, data: any): Promise<Response> {
    if(Config.getConfiguration().logFetch){
      console.log("Calling fetch with:", url, data)
    }
    return globalThis.fetch(url, data)
  }

  static get<R>(url: string, user: User): Promise<R> {
    return Http.fetch(url, {
      method: "GET",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      }
    }) as Promise<unknown> as Promise<R>;
  }

  static delete<R>(url, user): Promise<R> {
    return Http.fetch(url, {
      method: "DELETE",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      }
    }) as Promise<unknown> as Promise<R>;
  }

  static post<R>(url, user, body): Promise<R> {
    return Http.fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(body)
    }) as Promise<unknown> as Promise<R>;
  }

  static patch<R>(url, user, body): Promise<R> {
    return Http.fetch(url, {
      method: "PATCH",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(body)
    }) as Promise<unknown> as Promise<R>;
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