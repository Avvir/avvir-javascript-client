import {User} from "../utilities/get_authorization_headers";
import {ApiRpcQueryRequest, ApiRpcSession} from "../models";
import ApiRpcQueryResponse from "../models/api/api_rpc_query_response";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import Http from "../utilities/http";
import user from "../models/domain/user";

export enum ApiQueryStatus {
    SUCCESS=2,
    RUNNING=1,
    RUNTIME_ERROR=0,
    SESSION_ERROR=-1,
}

export interface ApiRpcExchangeRequest {
    queryId: number
}

class HttpRpcExchangeClient {
    isLocalUrl = false;
    baseUrl(): string {
        if (this.isLocalUrl) {
            return "http://localhost:8000";
        } else {
            return Http.baseUrl();
        }
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    post(route, user, response): Promise<any> {
        const url = `${this.baseUrl()}${route}`;
        return Http.post(url, user, response).then(response => {
            return response.json().then(json => {
                return json
            })
        })
    }

    useLocalHost(): void {
        this.isLocalUrl = true;
    }

    startSession(session: ApiRpcSession, user: User): Promise<ApiRpcSession> {
        return this.post("/rpc/start_session", user, session) as unknown as Promise<ApiRpcSession>;
    }

    endSession(session: ApiRpcSession, user: User): Promise<ApiRpcSession> {
        return this.post("/rpc/end_session", user, session) as unknown as Promise<ApiRpcSession>;
    }

    sendQueryRequest(queryRequest: ApiRpcQueryRequest, user: User): Promise<ApiRpcQueryRequest> {
        return this.post("/rpc/send_query_request", user, queryRequest) as unknown as Promise<ApiRpcQueryRequest>;
    }

    getQueryResponse(exchangeRequest: ApiRpcExchangeRequest, user: User): Promise<ApiRpcQueryResponse> {
        const resultPromise = this.post("/rpc/get_query_response", user, exchangeRequest) as unknown as Promise<ApiRpcQueryResponse>
        return resultPromise.then(result => {
            if(result.statusCode != ApiQueryStatus.RUNNING)
            {
                return result
            }else {
                return this.sleep(1000).then(() => { return this.getQueryResponse(exchangeRequest, user) })
            }
        })
    }

    runQuery(queryRequest: ApiRpcQueryRequest, user: User): Promise<ApiRpcQueryResponse> {
        return this.sendQueryRequest(queryRequest, user).then(
            (newQueryRequest: ApiRpcQueryRequest) => {
                let exchangeRequest = {queryId:newQueryRequest.queryId};
                return this.getQueryResponse(exchangeRequest, user);
            }
        )
    }
}

export default class WebRpcApi {
    httpRpcExchangeClient = new HttpRpcExchangeClient();
    startRpcSession(user: User): Promise<ApiRpcSession> {
        return new Promise((resolve) => resolve(new ApiRpcSession({sessionId: -1})));
    }

    runRpcQuery(request: ApiRpcQueryRequest, user: User): Promise<ApiRpcQueryResponse> {
        return this.httpRpcExchangeClient.runQuery(request, user);
    }
}

makeErrorsPretty(WebRpcApi, {
    exclude: [],
    overrideErrorMessage: [],
});

function exchangeRequest(exchangeRequest: any, user: User): Promise<ApiRpcQueryResponse> {
    throw new Error("Function not implemented.");
}
