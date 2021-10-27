import { User } from "./get_authorization_headers";
export default class Http {
    static baseUrl: () => string;
    static fetch(url: any, data: any): any;
    static get(url: any, user: any, contentType?: string): any;
    static delete(url: any, user: any): any;
    static post(url: any, user: any, body: any): any;
    static patch(url: any, user: any, body: any): any;
    static addAuthToDownloadUrl(baseUrl: string, user: User): string;
    static __fetch: any;
}
