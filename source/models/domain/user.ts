import { BASIC, FIREBASE, GATEWAY_JWT, HXAUTH_ACCESS_TOKEN } from "../enums/user_auth_type";
import { UserRole } from "../enums";

export class GatewayUser {
  authType: typeof GATEWAY_JWT;
  gatewayUser?: {
    idToken?: string,
    role?: UserRole,
    redirectUrl?: string,
    storageToken?: string
  };

  constructor(authType, idToken, role, storageToken?, redirectUrl?) {
    this.authType = authType;
    this.gatewayUser = {
      idToken,
      role,
      storageToken,
      redirectUrl
    };
  }
}

export type FirebaseUser = {
  firebaseUser: {
    uid?: string
    role?: UserRole
    displayName?: string
    idToken?: string
    email?: string
  }
  authType: typeof FIREBASE
}

export type BasicUser = {
  authType: typeof BASIC,
  username: string,
  password: string
}

export type HxAuthUser = {
  authType: typeof HXAUTH_ACCESS_TOKEN,
  hxAuthUser: {
    accessToken: string,
  }
}

export type User = BasicUser | GatewayUser | FirebaseUser | HxAuthUser | null;

export const isFirebaseUser = (user: User): user is FirebaseUser => !!(user as FirebaseUser)?.firebaseUser;
export const isGatewayUser = (user: User): user is GatewayUser => !!(user as GatewayUser)?.gatewayUser;
export const isHxAuthUser = (user: User): user is HxAuthUser => user?.authType == HXAUTH_ACCESS_TOKEN;

export default User;
