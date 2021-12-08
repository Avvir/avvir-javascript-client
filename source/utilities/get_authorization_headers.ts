import {BASIC, FIREBASE, GATEWAY_JWT} from "../models/enums/user_auth_type";
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
    default: {
      console.warn("no authentication");
      return null;
    }
  }
};

export default getAuthorizationHeaders;
