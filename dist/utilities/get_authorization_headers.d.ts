import { BASIC, FIREBASE, GATEWAY_JWT } from "../models/enums/user_auth_type";
import UserRole from "../models/enums/user_role";
export declare class GatewayUser {
    authType: typeof GATEWAY_JWT;
    gatewayUser?: {
        idToken?: string;
        role?: UserRole;
    };
    constructor(authType: any, idToken: any, role: any);
}
export declare type FirebaseUser = {
    firebaseUser: {
        uid?: string;
        role?: UserRole;
        displayName?: string;
        idToken?: string;
        email?: string;
    };
    authType: typeof FIREBASE;
};
export declare type BasicUser = {
    authType: typeof BASIC;
    username: string;
    password: string;
};
export declare type User = BasicUser | GatewayUser | FirebaseUser | null;
declare const getAuthorizationHeaders: (user: User) => {
    Authorization: string;
    firebaseIdToken?: undefined;
} | {
    firebaseIdToken: string;
    Authorization?: undefined;
};
export default getAuthorizationHeaders;
