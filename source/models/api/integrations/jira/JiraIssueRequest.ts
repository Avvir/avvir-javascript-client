import {RequestFieldValues} from "./RequestFieldValues";
import {JiraIssueRequestModel} from "./JiraIssueRequestModel";

export class JiraIssueRequest {
    constructor(jiraIssueRequestModel: JiraIssueRequestModel) {
        this.serviceDeskId = jiraIssueRequestModel?.serviceDeskId;
        this.requestParticipants = jiraIssueRequestModel?.requestParticipants;
        this.raiseOnBehalfOf = jiraIssueRequestModel?.raiseOnBehalfOf;
        this.requestTypeIds = jiraIssueRequestModel?.requestTypeIds?.map((requestTypeId: number) => requestTypeId?.toString());
        this.requestFieldValues = new RequestFieldValues(jiraIssueRequestModel);
    }
    serviceDeskId?: number;
    requestTypeIds?: string[];
    raiseOnBehalfOf?: string;
    requestParticipants?: string[];
    requestFieldValues?: RequestFieldValues;
}