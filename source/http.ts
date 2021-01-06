import getAuthorizationHeaders from "./get_authorization_headers";
import {httpPostHeaders} from "./request_headers";

export default class Http {
  static get(url, user){
    return fetch(url, {
      method: "GET",
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
}