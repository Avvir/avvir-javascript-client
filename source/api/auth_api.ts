import getAuthorizationHeaders, {BasicUser, GatewayUser} from "../utilities/get_authorization_headers";
import UserAuthType, {GATEWAY_JWT} from "../models/enums/user_auth_type";
import Http from "../utilities/http";
import {httpGetHeaders} from "../utilities/request_headers";
import JsonWebToken from "jsonwebtoken";

export default class AuthApi {

  static login(username: string, password: string): Promise<GatewayUser> {
    const user: BasicUser = {
      authType: UserAuthType.BASIC,
      username,
      password
    };
    return fetch(`${Http.baseUrl}/login`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then((response) => {
      return response.json()
        .then(body => {
          const storageToken = body.storageToken; //TODO attach to user object and let users upload from this lib
          const authHeader = response.headers.get("Authorization");
          const jwt = authHeader.substr("Bearer ".length);
          const decodedJwt = JsonWebToken.decode(jwt, {complete: true});
          const role = decodedJwt.payload.role;
          return new GatewayUser(GATEWAY_JWT, jwt, role);
        });
    }) as Promise<GatewayUser>;
  }

}