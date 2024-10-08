import JsonWebToken from "jsonwebtoken";

import getAuthorizationHeaders, {BasicUser, GatewayUser, User} from "../utilities/get_authorization_headers";
import Http from "../utilities/http";
import ResponseError from "../models/response_error";
import responseStatusText from "../resources/response_statuses.json";
import UserAuthType, { GATEWAY_JWT } from "../models/enums/user_auth_type";
import { httpGetHeaders } from "../utilities/request_headers";

export default class AuthApi {
  static getAuthorizationHeaders(user: User) {
    return getAuthorizationHeaders(user);
  }

  static getCustomFirebaseToken(user: User): Promise<{ headers: Headers, body: { storageToken: string } }> {
    return Http.fetch(`${Http.baseUrl()}/login`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then((response) => {
      return response.json()
          .then(body => {
            const headers = response.headers;
            return { headers, body };
          });
    }) as Promise<{ headers: Headers, body: { storageToken: string } }>;
  }

  static login(username: string, password: string): Promise<GatewayUser> {
    const user: BasicUser = {
      authType: UserAuthType.BASIC,
      username,
      password
    };
    const headers = {
      ...httpGetHeaders,
      ...getAuthorizationHeaders(user)
    }
    const url = `${Http.baseUrl()}/login`;
    return Http.fetch(url, {
      headers
    }).then((response) => {

      return response.json()
        .then(body => {
          if (response.ok) {
            const authHeader = response.headers.get("Authorization");
            const jwt = authHeader.substr("Bearer ".length);
            const decodedJwt = JsonWebToken.decode(jwt, {complete: true});
            const role = decodedJwt.payload.role;
            return new GatewayUser(GATEWAY_JWT, jwt, role, body.storageToken, body.redirectUrl);
          } else {
            let message = body.message;
            let statusMessage = responseStatusText[response.status];
            let verboseMessage = `${response.status} ${statusMessage}: '${message}' at \`/login\``;
            const error = new ResponseError(
              message,
              verboseMessage,
              response,
              body
            );
            console.error(error);
            throw error;
          }
        });
    }) as Promise<GatewayUser>;
  }

}
