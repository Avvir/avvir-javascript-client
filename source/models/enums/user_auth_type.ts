export enum UserAuthType {
  GATEWAY_JWT = "GATEWAY_JWT",
  BASIC = "BASIC",
  FIREBASE = "FIREBASE",
  HXAUTH_ACCESS_TOKEN = "HXAUTH_ACCESS_TOKEN"
}

export const GATEWAY_JWT = UserAuthType.GATEWAY_JWT;
export const BASIC = UserAuthType.BASIC;
export const FIREBASE = UserAuthType.FIREBASE;
export const HXAUTH_ACCESS_TOKEN = UserAuthType.HXAUTH_ACCESS_TOKEN;

export default UserAuthType;
