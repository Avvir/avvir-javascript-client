import { Moment } from "moment/moment";

export class JiraAcsWorkItemRequestModel {

    avvirProjectId: string;
    workItemTypeIds?: number[];
    summary?: string;
    projectName?: string;
    projectLink?: string;
    subTaskNameTemplate?: string;
    numberOfAreasOrLevels?: number;
    totalProjectSquareFootage?: number;
    dueDate?: Moment;
    buildingType?: number;
    priority?: number;
    assigneeAccountId?: string;

    // Only on the CAP BIM Classification create screen.
    spreadSheetLink?: string;
    squareFootage?: number;
    dateReceived?: Moment;

    // Only on the CAP Phototagging and CAP Scan QAQC create screens.
    captureDate?: Moment;

    constructor(jiraAcsWorkItemRequestModel: JiraAcsWorkItemRequestModel) {
        this.avvirProjectId = jiraAcsWorkItemRequestModel?.avvirProjectId;
        this.workItemTypeIds = jiraAcsWorkItemRequestModel?.workItemTypeIds;
        this.summary = jiraAcsWorkItemRequestModel?.summary;
        this.projectName = jiraAcsWorkItemRequestModel?.projectName;
        this.projectLink = jiraAcsWorkItemRequestModel?.projectLink;
        this.subTaskNameTemplate = jiraAcsWorkItemRequestModel?.subTaskNameTemplate;
        this.numberOfAreasOrLevels = jiraAcsWorkItemRequestModel?.numberOfAreasOrLevels;
        this.totalProjectSquareFootage = jiraAcsWorkItemRequestModel?.totalProjectSquareFootage;
        this.dueDate = jiraAcsWorkItemRequestModel?.dueDate;
        this.buildingType = jiraAcsWorkItemRequestModel?.buildingType;
        this.priority = jiraAcsWorkItemRequestModel?.priority;
        this.assigneeAccountId = jiraAcsWorkItemRequestModel?.assigneeAccountId;
        this.spreadSheetLink = jiraAcsWorkItemRequestModel?.spreadSheetLink;
        this.squareFootage = jiraAcsWorkItemRequestModel?.squareFootage;
        this.dateReceived = jiraAcsWorkItemRequestModel?.dateReceived;
        this.captureDate = jiraAcsWorkItemRequestModel?.captureDate;
    }
}

export default JiraAcsWorkItemRequestModel;
