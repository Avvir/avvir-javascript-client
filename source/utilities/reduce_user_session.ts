import { FirebaseUser, GatewayUser, User } from "./get_authorization_headers";


export const isFirebaseUser = (user: User): user is FirebaseUser => !!(user as FirebaseUser)?.firebaseUser;
export const isGatewayUser = (user: User): user is GatewayUser => !!(user as GatewayUser)?.gatewayUser;

