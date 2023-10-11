import { BASIC, FIREBASE, GATEWAY_JWT, HXAUTH_ACCESS_TOKEN } from "../models/enums/user_auth_type";
import User from "../models/domain/user";

export {User,BasicUser,FirebaseUser,GatewayUser} from "../models/domain/user";

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
    case HXAUTH_ACCESS_TOKEN: {
      return {
        hxAuthAccessToken: user.hxAuthUser.accessToken
      }
    }
    default: {
      console.warn("no authentication");
      return null;
    }
  }
};

export default getAuthorizationHeaders;
