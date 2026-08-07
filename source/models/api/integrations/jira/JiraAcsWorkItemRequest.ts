import { JiraAcsWorkItemRequestModel } from "./JiraAcsWorkItemRequestModel";
import { DateFormatter } from "../../../../converters";

export class JiraAcsWorkItemRequest {
    avvirProjectId: string;
    workItemTypeIds?: number[];
    summary?: string;
    projectName?: string;
    projectLink?: string;
    subTaskNameTemplate?: string;
    numberOfAreasOrLevels?: number;
    totalProjectSquareFootage?: number;
    dueDate?: string;
    buildingType?: string;
    priority?: string;
    assigneeAccountId?: string;
    spreadSheetLink?: string;
    squareFootage?: number;
    dateReceived?: string;
    captureDate?: string;

    constructor(jiraAcsWorkItemRequestModel: JiraAcsWorkItemRequestModel) {
        this.avvirProjectId = jiraAcsWorkItemRequestModel?.avvirProjectId;
        this.workItemTypeIds = jiraAcsWorkItemRequestModel?.workItemTypeIds;
        this.summary = jiraAcsWorkItemRequestModel?.summary;
        this.projectName = jiraAcsWorkItemRequestModel?.projectName;
        this.projectLink = jiraAcsWorkItemRequestModel?.projectLink;
        this.subTaskNameTemplate = jiraAcsWorkItemRequestModel?.subTaskNameTemplate;
        this.numberOfAreasOrLevels = jiraAcsWorkItemRequestModel?.numberOfAreasOrLevels;
        this.totalProjectSquareFootage = jiraAcsWorkItemRequestModel?.totalProjectSquareFootage;
        this.dueDate = this.formatDateToYyyyMmDd(jiraAcsWorkItemRequestModel?.dueDate);
        this.buildingType = this.asOptionId(jiraAcsWorkItemRequestModel?.buildingType);
        this.priority = this.asOptionId(jiraAcsWorkItemRequestModel?.priority);
        this.assigneeAccountId = jiraAcsWorkItemRequestModel?.assigneeAccountId;
        this.spreadSheetLink = jiraAcsWorkItemRequestModel?.spreadSheetLink;
        this.squareFootage = jiraAcsWorkItemRequestModel?.squareFootage;
        this.dateReceived = this.formatDateToYyyyMmDd(jiraAcsWorkItemRequestModel?.dateReceived);
        this.captureDate = this.formatDateToYyyyMmDd(jiraAcsWorkItemRequestModel?.captureDate);
    }

    private formatDateToYyyyMmDd(date: any) {
        if (date) {
            return new DateFormatter("YYYY-MM-DD").formatLocal(new Date(date));
        }
        return undefined;
    }

    private asOptionId(optionId?: number) {
        if (optionId && optionId > 0) {
            return optionId.toString();
        }
        return undefined;
    }
}

export default JiraAcsWorkItemRequest;
