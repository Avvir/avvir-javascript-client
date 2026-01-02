export class EmbedTokenResponse {
    token: string;
    expiration: string;

    constructor(token: string, expiration: string) {
        this.token = token;
        this.expiration = expiration;
    }
}