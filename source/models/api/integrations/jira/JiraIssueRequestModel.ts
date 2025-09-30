import { Moment } from "moment/moment";

export class JiraIssueRequestModel {
    serviceDeskId?: number;
    requestTypeIds?: number[];
    raiseOnBehalfOf?: string;
    requestParticipants?: string[];
    summary?: string;
    projectName?: string;
    projectLink?: string;
    captureDate?: Moment;
    subTaskNameTemplate?: string;
    numberOfAreasOrLevels?: number;
    totalProjectSquareFootage?: number;
    spreadSheetLink?: string;
    squareFootage?: number;
    dateReceived?: Moment;
    dueDate?: Moment;
    buildingType?: string;
    priority: string;

    constructor(jiraTicketModel: JiraIssueRequestModel) {
        this.serviceDeskId = jiraTicketModel.serviceDeskId;
        this.requestTypeIds = jiraTicketModel.requestTypeIds;
        this.requestParticipants = jiraTicketModel?.requestParticipants;
        this.raiseOnBehalfOf = jiraTicketModel?.raiseOnBehalfOf;
        this.dateReceived = jiraTicketModel.dateReceived;
        this.buildingType = jiraTicketModel.buildingType;
        this.summary = jiraTicketModel.summary;
        this.projectLink = jiraTicketModel.projectLink;
        this.projectName = jiraTicketModel.projectName;
        this.captureDate = jiraTicketModel.captureDate;
        this.subTaskNameTemplate = jiraTicketModel.subTaskNameTemplate;
        this.numberOfAreasOrLevels = jiraTicketModel.numberOfAreasOrLevels;
        this.totalProjectSquareFootage = jiraTicketModel.totalProjectSquareFootage;
        this.spreadSheetLink = jiraTicketModel.spreadSheetLink;
        this.squareFootage = jiraTicketModel.squareFootage;
        this.dueDate = jiraTicketModel.dueDate;
        this.priority = jiraTicketModel.priority;
    }
}