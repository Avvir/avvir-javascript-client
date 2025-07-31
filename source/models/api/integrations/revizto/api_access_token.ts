export class ApiReviztoAccessToken {
    access_token: string;
    token_type: string;
    expires_in: string;
    refresh_token: string;

    constructor({access_token, token_type, expires_in, refresh_token}: Partial<ApiReviztoAccessToken> = {}) {
        this.access_token = access_token;
        this.token_type = token_type;
        this.expires_in = expires_in;
        this.refresh_token = refresh_token;
    }
}

export default ApiReviztoAccessToken;
