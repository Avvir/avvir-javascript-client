export enum UserAuthType {
  GATEWAY_JWT = "GATEWAY_JWT",
  BASIC = "BASIC",
  FIREBASE = "FIREBASE"
}

export const GATEWAY_JWT = UserAuthType.GATEWAY_JWT;
export const BASIC = UserAuthType.BASIC;
export const FIREBASE = UserAuthType.FIREBASE;

export default UserAuthType;
