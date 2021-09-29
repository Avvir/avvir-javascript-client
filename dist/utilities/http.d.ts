import { User } from "./get_authorization_headers";
export default class Http {
    static baseUrl: () => string;
    static fetch(url: any, data: any): Promise<Response>;
    static get(url: any, user: any): Promise<Response>;
    static delete(url: any, user: any): Promise<Response>;
    static post(url: any, user: any, body: any): Promise<Response>;
    static patch(url: any, user: any, body: any): Promise<Response>;
    static addAuthToDownloadUrl(baseUrl: string, user: User): string;
}
