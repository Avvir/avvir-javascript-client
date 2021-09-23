import getAuthorizationHeaders, {BasicUser, GatewayUser} from "../utilities/get_authorization_headers";
import UserAuthType, {GATEWAY_JWT} from "../models/enums/user_auth_type";
import Http from "../utilities/http";
import {httpGetHeaders} from "../utilities/request_headers";
import JsonWebToken from "jsonwebtoken";
import responseStatusText from "../resources/response_statuses.json";
import ResponseError from "../models/response_error";
import {Response} from "node-fetch";

export default class AuthApi {

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
    }).then((response: Response): Promise<GatewayUser> => {

      return response.json()
        .then(body => {
          const authHeader = response.headers.get("Authorization");
          if (response.ok && authHeader != null) {
            const storageToken = body.storageToken; //TODO attach to user object and let users upload from this lib
            const jwt = authHeader.substr("Bearer ".length);
            const decodedJwt = JsonWebToken.decode(jwt, {complete: true});
            if (decodedJwt == null) {
              throw new ResponseError("Unable to decode JWT","Unable to decode JWT", response, body);
            }
            const role = decodedJwt.payload.role;
            return new GatewayUser(GATEWAY_JWT, jwt, role);
          } else {
            let message = body.message;
            // @ts-ignore
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
    })
  }

}
