import {ApiTosVersion} from "../models/api/api_tos_version";
import Http from "../utilities/http";
import type {User} from "../models";
import makeErrorsPretty from "../utilities/make_errors_pretty";

export default class TosApi {
    static getLatest(user: User): Promise<ApiTosVersion> {
        const url = `${Http.baseUrl()}/tos/latest`;
        return Http.get(url, user) as unknown as Promise<ApiTosVersion>;
    }

    static accept(tosVersionId: number, user: User): Promise<ApiTosVersion> {
        const url = `${Http.baseUrl()}/tos/${tosVersionId}/accept`;
        return Http.post(url, user) as unknown as Promise<ApiTosVersion>;
    }
}

makeErrorsPretty(TosApi);
