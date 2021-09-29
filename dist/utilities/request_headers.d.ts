interface HttpPostHeaders extends Record<string, string> {
    (contentType: string): {
        "Accept": string;
        "Content-Type": string;
    };
    "Accept": string;
    "Content-Type": string;
}
export declare const httpPostHeaders: HttpPostHeaders;
interface HttpGetHeaders extends Record<string, string> {
    (contentType: string): {
        "Accept": string;
    };
    "Accept": string;
}
export declare const httpGetHeaders: HttpGetHeaders;
export {};
