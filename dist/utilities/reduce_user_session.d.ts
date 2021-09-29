import { FirebaseUser, GatewayUser, User } from "./get_authorization_headers";
export declare const isFirebaseUser: (user: User) => user is FirebaseUser;
export declare const isGatewayUser: (user: User) => user is GatewayUser;
