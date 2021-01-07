import { BASIC, FIREBASE, GATEWAY_JWT } from "./models/enums/user_auth_type";
import UserRole from "./models/enums/user_role";

export type GatewayUser = {
  authType: typeof GATEWAY_JWT
  gatewayUser?: {
    idToken?: string,
    role?: UserRole
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

export type User = BasicUser | GatewayUser | FirebaseUser | null

const getAuthorizationHeaders = (user: User) => {
  if(!user){
    return null;
  }
  switch (user?.authType) {
    case GATEWAY_JWT: {
      return {
        Authorization: `Bearer ${user.gatewayUser.idToken}`
      };
    }
    case BASIC: {
      return {
        Authorization: `Basic ${Buffer.from(`${user.username}:${user.password}`).toString("base64")}`
      };
    }
    case FIREBASE: {
      return {
        firebaseIdToken: user.firebaseUser.idToken
      };
    }
    default: {
      console.warn("no authentication");
      return null;
    }
  }
};

export default getAuthorizationHeaders;
