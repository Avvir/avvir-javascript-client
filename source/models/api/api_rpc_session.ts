export class ApiRpcSession {
    readonly sessionId: number;
    serviceDomain: string;
    dataScopeDict: object;

    constructor({ sessionId, serviceDomain, dataScopeDict }: Partial<ApiRpcSession> = {}) {
        this.sessionId = sessionId;
        this.serviceDomain = serviceDomain;
        this.dataScopeDict = dataScopeDict;
    }


}

export default ApiRpcSession;