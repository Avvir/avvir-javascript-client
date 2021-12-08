import {BASIC, FIREBASE, GATEWAY_JWT} from "../enums/user_auth_type";
import { UserRole } from "../enums";

export class GatewayUser {
    authType: typeof GATEWAY_JWT
    gatewayUser?: {
        idToken?: string,
        role?: UserRole,
        redirectUrl?: string,
        storageToken?: string
    }

    constructor(authType, idToken, role, storageToken?, redirectUrl?) {
        this.authType = authType;
        this.gatewayUser = {
            idToken,
            role,
            storageToken,
            redirectUrl
        }
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

export default User;
