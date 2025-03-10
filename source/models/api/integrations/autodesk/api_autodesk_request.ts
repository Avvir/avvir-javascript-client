import AutodeskIssue from "./api_autodesk_issue";

export class AutodeskRequest {
    type: string;
    request: AutodeskIssue
    constructor({type,request}: Partial<AutodeskRequest> = {}) {
        this.type=type;
        this.request=request
    }
}

export default AutodeskRequest;
