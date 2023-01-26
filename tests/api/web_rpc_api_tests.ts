import {expect} from "chai";
import fetchMock from "fetch-mock";
import {GATEWAY_JWT} from "../../source/models/enums/user_auth_type";
import {USER} from "../../source/models/enums/user_role";
import Http from "../../source/utilities/http";
import {describe} from "mocha";
import {ApiRpcQueryRequest, ApiRpcQueryResponse, ApiRpcSession} from "../../source";
import WebRpcApi, {ApiQueryStatus, ApiRpcExchangeRequest} from "../../source/api/web_rpc_api";

describe("WebRpcApi", () => {
    let webRpcApi, user;
    beforeEach(() => {
        webRpcApi = new WebRpcApi();
        user = {
            authType: GATEWAY_JWT,
            gatewayUser: {idToken: "some-firebase.id.token", role: USER},
        };
    });
    describe("HttpRpcExchangeClient", () => {
        describe("::startSession", () => {
            beforeEach(() => {
                webRpcApi.httpRpcExchangeClient.useLocalHost();
                fetchMock.post(`http://localhost:8000/rpc/start_session`, {
                    status: 200,
                    body: {
                        "sessionId": 250,
                        "serviceDomain": "some_service_domain",
                        "dataScopeDict": {"projectId": "some_project_id"}
                    },
                }, {overwriteRoutes: true, repeat:1});
            });

            it("makes a post request to the exchange server", () => {
                const session = new ApiRpcSession({
                    serviceDomain: "some_service_domain",
                    dataScopeDict: {projectId: "some_project_id"}
                });
                webRpcApi.httpRpcExchangeClient.startSession(session, user);
                const fetchCall = fetchMock.lastCall();
                expect(fetchCall[0]).to.eq(`http://localhost:8000/rpc/start_session`);
                expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
                expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            });

            it("returns a RpcSession object with the session id set", () => {
                const inputSession = new ApiRpcSession({
                    serviceDomain: "some_service_domain",
                    dataScopeDict: {projectId: "some_project_id"}
                });
                return webRpcApi.httpRpcExchangeClient.startSession(inputSession).then(actualSession => {
                       expect(actualSession.sessionId).to.eq(250);
                       expect(actualSession.serviceDomain).to.eq(inputSession.serviceDomain);
                       expect(actualSession.dataScopeDict).to.deep.eq(inputSession.dataScopeDict);
                })
            });
        });
        describe("::endSession", () => {
            beforeEach(() => {
                webRpcApi.httpRpcExchangeClient.useLocalHost();
                fetchMock.post(`http://localhost:8000/rpc/end_session`, {status: 200});
            });

            it("makes a post request to the exchange server", () => {
                const session = new ApiRpcSession({
                    serviceDomain: "some_service_domain",
                    dataScopeDict: {projectId: "some_project_id"}
                });
                webRpcApi.httpRpcExchangeClient.endSession(session, user);
                const fetchCall = fetchMock.lastCall();
                expect(fetchCall[0]).to.eq(`http://localhost:8000/rpc/end_session`);
                // expect(fetchCall[1].body).to.deep.eq(session);
                expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
                expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            });
        });

        describe("::sendQueryRequest", () => {
            beforeEach(() => {
                webRpcApi.httpRpcExchangeClient.useLocalHost();
                fetchMock.post(`http://localhost:8000/rpc/send_query_request`, {
                    status: 200, body: {
                        "queryId": 25,
                        "sessionId": 10,
                        "serviceClassName": "service_class_name",
                        "serviceFunctionName": "service_function_name",
                        "argumentDict": {"arg1": "some_string", "arg2": 5}
                    }
                }, {overwriteRoutes: true});
            });

            it("makes a post request to the exchange server", () => {
                const queryRequest = new ApiRpcQueryRequest({
                    sessionId: 10,
                    serviceClassName: "ServiceClassName",
                    serviceFunctionName: "service_function_name",
                    argumentDict: {arg1: "some_string", arg2: 5},
                });
                webRpcApi.httpRpcExchangeClient.sendQueryRequest(queryRequest, user);
                const fetchCall = fetchMock.lastCall();
                expect(fetchCall[0]).to.eq(`http://localhost:8000/rpc/send_query_request`);
                expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
                expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            });

            it("returns a RpcQueryRequest object with the query id set", () => {
                const queryRequest = new ApiRpcQueryRequest({
                    sessionId: 10,
                    serviceClassName: "ServiceClassName",
                    serviceFunctionName: "service_function_name",
                    argumentDict: {arg1: "some_string", arg2: 5},
                });
                return webRpcApi.httpRpcExchangeClient.sendQueryRequest(queryRequest, user).then(actualQueryRequest => {
                        expect(actualQueryRequest.queryId).to.eq(25);
                })
            });
        });

        describe("::getQueryResponse", () => {
            describe("when a QueryResponse with a non-running status code is returned on the first call", () => {
                beforeEach(() => {
                    webRpcApi.httpRpcExchangeClient.useLocalHost();
                    fetchMock.post(`http://localhost:8000/rpc/get_query_response`, {
                        status: 200, body: {
                            "queryId": 100,
                            "statusCode": 2,
                            "message": "some message",
                            "result": {"someValue": 200}
                        },
                    }, {overwriteRoutes: true});
                });

                it("makes a post request to the exchange server", () => {
                    const exchangeRequest: ApiRpcExchangeRequest = {queryId: 100};
                    webRpcApi.httpRpcExchangeClient.getQueryResponse(exchangeRequest, user);
                    const fetchCall = fetchMock.lastCall();
                    expect(fetchCall[0]).to.eq(`http://localhost:8000/rpc/get_query_response`);
                    expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
                    expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
                });

                it("returns a RpcQueryResponse object with the query id and response set", () => {
                    const exchangeRequest: ApiRpcExchangeRequest = {queryId: 100};
                    const expectedQueryResponse = new ApiRpcQueryResponse({
                        result: {someValue: 200}, queryId: 100,
                        statusCode: ApiQueryStatus.SUCCESS, message: "some message"
                    });
                    return webRpcApi.httpRpcExchangeClient.getQueryResponse(exchangeRequest, user).then((actualQueryResponse: ApiRpcQueryResponse) => {
                            expect(actualQueryResponse).to.deep.eq(expectedQueryResponse);
                    });
                });
            });
            describe("when a QueryResponse with a running status code is returned on the first call", () => {
                beforeEach(() => {
                    webRpcApi.httpRpcExchangeClient.useLocalHost();
                    const body1 = { "queryId": 100, "statusCode": 1, "message": "", "result": ""}
                    const body2 = { "queryId": 100, "statusCode": 2, "message": "some message", "result": {"someValue": 200}}
                    fetchMock.once(`http://localhost:8000/rpc/get_query_response`, body1, {name:"bad"})
                             .post(`http://localhost:8000/rpc/get_query_response`, body2, {name:"good"})
                });

                it("it polls until a non-empty response and returns a RpcQueryResponse object with the query id set", () => {
                    const exchangeRequest: ApiRpcExchangeRequest = {queryId: 100};
                    const expectedQueryResponse = new ApiRpcQueryResponse({
                        result: {someValue: 200}, queryId: 100,
                        statusCode: ApiQueryStatus.SUCCESS, message: "some message"
                    });
                    return webRpcApi.httpRpcExchangeClient.getQueryResponse(exchangeRequest, user).then((actualQueryResponse: ApiRpcQueryResponse) => {
                            expect(actualQueryResponse).to.deep.eq(expectedQueryResponse);
                    });
                });
            });
        });

        describe("::runQuery", () => {
            beforeEach(() => {
                webRpcApi.httpRpcExchangeClient.useLocalHost();
                const body1 = {
                    "queryId": 25,
                    "sessionId": 10,
                    "serviceClassName": "service_class_name",
                    "serviceFunctionName": "service_function_name",
                    "argumentDict": {"arg1": "some_string", "arg2": 5}
                }
                const body2 = {"queryId": 100, "statusCode": 1, "message": "", "result": ""}
                const body3 = {"queryId": 100, "statusCode": 2, "message": "some message", "result": {"someValue": 200}}
                fetchMock.post(`http://localhost:8000/rpc/send_query_request`, body1, {name:"requestRQ"})
                    .once(`http://localhost:8000/rpc/get_query_response`, body2, {name:"badRQ"})
                    .post(`http://localhost:8000/rpc/get_query_response`, body3, {name:"goodRQ"})
            })
            it('sends the query request and retrieves the result', ()  => {
                const expectedQueryResponse = new ApiRpcQueryResponse({
                    result: {someValue: 200}, queryId: 100,
                    statusCode: ApiQueryStatus.SUCCESS, message: "some message"
                });
                const queryRequest = new ApiRpcQueryRequest({
                    sessionId: 10,
                    serviceClassName: "ServiceClassName",
                    serviceFunctionName: "service_function_name",
                    argumentDict: {arg1: "some_string", arg2: 5},
                });
                return webRpcApi.httpRpcExchangeClient.runQuery(queryRequest, user).then((actualQueryResponse: ApiRpcQueryResponse) => {
                    const fetchCall = fetchMock.lastCall();
                    expect(fetchCall[1].body).to.contain("queryId");
                    expect(actualQueryResponse).to.deep.eq(expectedQueryResponse);
                });
            });
        });

        describe("::baseUrl", () => {
            let webRpcApi;
            beforeEach(() => {
                webRpcApi = new WebRpcApi();
            });

            it("returns the baseUrl", () => {
                expect(webRpcApi.httpRpcExchangeClient.baseUrl()).to.eql(Http.baseUrl());
            })

            describe("when useLocalHost is called", () => {
                beforeEach(() => {
                    webRpcApi.httpRpcExchangeClient.useLocalHost();
                });

                it("returns a localhost url", () => {
                    expect(webRpcApi.httpRpcExchangeClient.baseUrl()).to.eql("http://localhost:8000");
                });
            });
        });

        describe("#WebRpcApi", () => {
            describe("#startRpcSession", () => {
                beforeEach(() => {
                    webRpcApi.httpRpcExchangeClient.useLocalHost();
                    fetchMock.post(`http://localhost:8000/rpc/start_session`, {
                        status: 200,
                        body: {
                            "sessionId": 250,
                            "serviceDomain": "some_service_domain",
                            "dataScopeDict": {"projectId": "some_project_id"}
                        },
                    }, {overwriteRoutes: true, repeat:1});
                });

                it("returns a RpcSession object with the session id set", () => {
                    const inputSession = new ApiRpcSession({
                        serviceDomain: "some_service_domain",
                        dataScopeDict: {projectId: "some_project_id"}
                    });
                    return webRpcApi.startRpcSession(inputSession).then(actualSession => {
                        expect(actualSession.sessionId).to.eq(250);
                        expect(actualSession.serviceDomain).to.eq(inputSession.serviceDomain);
                        expect(actualSession.dataScopeDict).to.deep.eq(inputSession.dataScopeDict);
                    })
                });

            });
            describe("#runRpcQuery", () => {
                beforeEach(() => {
                    webRpcApi.httpRpcExchangeClient.useLocalHost();
                    const body1 = {
                        "queryId": 25,
                        "sessionId": 10,
                        "serviceClassName": "service_class_name",
                        "serviceFunctionName": "service_function_name",
                        "argumentDict": {"arg1": "some_string", "arg2": 5}
                    }
                    const body2 = {"queryId": 100, "statusCode": 2, "message": "some message", "result": {"someValue": 200}}
                    fetchMock.post(`http://localhost:8000/rpc/send_query_request`, body1, {name:"requestRQ"})
                             .post(`http://localhost:8000/rpc/get_query_response`, body2, {name:"goodRQ"})
                })

                it('sends the query request and retrieves the result', ()  => {
                    const expectedQueryResponse = new ApiRpcQueryResponse({
                        result: {someValue: 200}, queryId: 100,
                        statusCode: ApiQueryStatus.SUCCESS, message: "some message"
                    });
                    const queryRequest = new ApiRpcQueryRequest({
                        sessionId: 10,
                        serviceClassName: "ServiceClassName",
                        serviceFunctionName: "service_function_name",
                        argumentDict: {arg1: "some_string", arg2: 5},
                    });
                    return webRpcApi.runRpcQuery(queryRequest, user).then((actualQueryResponse: ApiRpcQueryResponse) => {
                        const fetchCall = fetchMock.lastCall();
                        expect(fetchCall[1].body).to.contain("queryId");
                        expect(actualQueryResponse).to.deep.eq(expectedQueryResponse);
                    });
                });

            });
        });
    });
});
