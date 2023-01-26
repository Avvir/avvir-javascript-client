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
            if (result.statusCode != ApiQueryStatus.RUNNING) {
                return result
            } else {
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
    stubCalls = true;
    startRpcSession(session: ApiRpcSession, user: User): Promise<ApiRpcSession> {
        if (this.stubCalls) {
            return new Promise((resolve) => resolve(new ApiRpcSession({sessionId: -1})));
        } else {
            return this.httpRpcExchangeClient.startSession(session, user);
        }
    }

    runRpcQuery(request: ApiRpcQueryRequest, user: User): Promise<ApiRpcQueryResponse> {
        if (this.stubCalls) {
            return new Promise((resolve) => resolve(new ApiRpcQueryResponse({queryId: -1, statusCode: 2, message: "fake response", result: {photoUrl: "https://storage.googleapis.com/avvir-portal-acceptance.appspot.com/hackathon2023/j9tsglzc1xksmx1lxl78.jpg?Expires=253370764800&GoogleAccessId=firebase-adminsdk-buats%40avvir-portal-acceptance.iam.gserviceaccount.com&Signature=r5zxE8EJhjt%2BwNALhoOq0Iu7OaepcLo6RApylsRxoeNd%2BtAhNIR8Dh%2BiDTGBms3JhjmKm7ykdOhlGamorgf57%2Fd9RHPMp%2BqBq2i0xRyskC4bD4msSATAW285qzXg6CCkocLC6jruSpSGgdZgEmMW9Jo%2FzwYa%2BovoRj8d5CXVO1A5nEgxysdpje%2F4fqVUFI9uZoR%2B%2FTg9oJlybsPKZjhGk7FnS4UlBuWnRz8nai3Ln2zwqp%2BDaecCMGvwF3R%2FXd5UNQm8J1neYVZsTKj4q%2FImdaCb%2BNxcmP11omoAAz8AzCeG3SYaFVjn9ZaWZwCeDsCV6v413sEuB3QjHp9QEFvT1A%3D%3D"}})))
        } else {
            return this.httpRpcExchangeClient.runQuery(request, user);
        }
    }

    static printHello() {
        console.log("hello");
    }
}

makeErrorsPretty(WebRpcApi, {
    exclude: [],
    overrideErrorMessage: [],
});

function exchangeRequest(exchangeRequest: any, user: User): Promise<ApiRpcQueryResponse> {
    throw new Error("Function not implemented.");
}
