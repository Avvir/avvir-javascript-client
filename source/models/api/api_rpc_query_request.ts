export class ApiRpcQueryRequest {
    queryId: number;
    sessionId: number;
    serviceClassName: string;
    serviceFunctionName: string;
    argumentDict: object;

    constructor({ queryId, sessionId, serviceClassName, serviceFunctionName, argumentDict }: Partial<ApiRpcQueryRequest>) {
        this.queryId = queryId;
        this.sessionId = sessionId;
        this.serviceClassName = serviceClassName;
        this.serviceFunctionName = serviceFunctionName;
        this.argumentDict = argumentDict;
    }
}

export default ApiRpcQueryRequest;