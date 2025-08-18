import getAuthorizationHeaders, { User } from "./get_authorization_headers";
import {httpGetHeaders, httpPostHeaders} from "./request_headers";
import {isFirebaseUser, isGatewayUser, isHxAuthUser} from "../models";
import Config from "../config";

export default class Http {
  static baseUrl = (): string => Config.getConfiguration().AVVIR_GATEWAY_URL;

  static fetch(url: RequestInfo, data) {
    if (Config.getConfiguration().logFetch) {
      console.log("Calling fetch with:", url);
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

  static put(url: RequestInfo, user: User, body?: any, contentType = "application/json", accept =  "application/json") {
    return Http.fetch(url, {
      method: "PUT",
      headers: {
        ...httpPostHeaders(contentType, accept),
        ...getAuthorizationHeaders(user)
      },
      body: body == null ? "" : JSON.stringify(body)
    });
  }

  static delete(url: RequestInfo, user: User, body?: any) {
    return Http.fetch(url, {
      method: "DELETE",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: body == null ? "" : JSON.stringify(body)
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

  static postTsvMulipartFormData(url: RequestInfo, user: User, tsvContent: string ) {
    let multipartFormData = new FormData();
    let file = new Blob([tsvContent], { type: "text/tab-separated-values" });
    multipartFormData.append("file", file, "file.tsv");
    return Http.fetch(url, {
      method: "POST",
      headers: {
        ...getAuthorizationHeaders(user)
      },
      body: multipartFormData
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
      if (isHxAuthUser(user)) {
        return `${baseUrl}?auth=${user.hxAuthUser.accessToken}`;
      } else if (isGatewayUser(user)) {
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
