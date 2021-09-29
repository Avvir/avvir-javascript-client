import { GatewayUser } from "../utilities/get_authorization_headers";
export default class AuthApi {
    static login(username: string, password: string): Promise<GatewayUser>;
}
