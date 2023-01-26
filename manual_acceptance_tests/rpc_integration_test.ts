import {WebRpcApi, ApiQueryStatus, ApiRpcExchangeRequest} from "../source/api/web_rpc_api"
import GATEWAY_JWT from "../source/models/enums/user_auth_type"
import USER from "../source/models/enums/user_role"

const runIntegretionTest = async () =>{
    let webRpcApi, user;
    webRpcApi = new WebRpcApi();
    user = {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER},
    };
    webRpcApi.httpRpcExchangeClient.useLocalHost();
    const session = await webRpcApi.startRpcSession("avvir_dataflow", user)
    const baseAddRequest = {"sessionId": session.sessionId, "serviceClassName": "MathematicsService", "serviceFunctionName":"add"}
    const baseSubtractRequest = {"sessionId": session.sessionId, "serviceClassName": "MathematicsService", "serviceFunctionName":"subtract"}
    // when a valid add query is sent
    const addQueryResult = await webRpcApi.runRpcQuery({...baseAddRequest, argumentDict:{a:5, b:10}}, user)
    console.log(addQueryResult.result, 15)
    // when a valid subtract query is sent
    const subtractQueryResult = await webRpcApi.runRpcQuery({...baseSubtractRequest, argumentDict:{a:10, b:5}}, user)
    console.log(subtractQueryResult.result, 5)
    // when an invalid add query is sent, it returns a query result with a RUNTIME_ERROR code
    let badAddQueryResult = await webRpcApi.runRpcQuery({...baseAddRequest, argumentDict:{a:5, b:"monkey"}})
    console.log(badAddQueryResult.status_code, ApiQueryStatus.RUNTIME_ERROR)
    // when the session is ended
    await webRpcApi.endSession(user)
    // when a valid add query is sent, returns a query result with a SESSION_ERROR code"
    badAddQueryResult = await webRpcApi.runRpcQuery({...baseAddRequest, argumentDict:{a:5, b:10}})
    console.log(badAddQueryResult.status_code, ApiQueryStatus.SESSION_ERROR)
}
runIntegretionTest()