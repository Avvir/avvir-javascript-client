export class PowerBIAccessTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: string;
    refresh_token: string;

    constructor(
        access_token: string,
        token_type: string,
        expires_in: string,
        refresh_token: string
    ) {
        this.access_token = access_token;
        this.token_type = token_type;
        this.expires_in = expires_in;
        this.refresh_token = refresh_token;
    }
}