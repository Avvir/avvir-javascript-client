import {JiraIssueRequestModel} from "./JiraIssueRequestModel";

export class RequestFieldValues {
    constructor(jiraIssueRequestModel: JiraIssueRequestModel) {
        this.dateReceived = this.formatDateToYyyyMmDd(jiraIssueRequestModel?.dateReceived);
        this.buildingType = jiraIssueRequestModel?.buildingType;
        this.summary = jiraIssueRequestModel?.summary;
        this.projectLink = jiraIssueRequestModel?.projectLink;
        this.projectName = jiraIssueRequestModel?.projectName;
        this.captureDate = this.formatDateToYyyyMmDd(jiraIssueRequestModel?.captureDate);
        this.subTaskNameTemplate = jiraIssueRequestModel?.subTaskNameTemplate;
        this.numberOfAreasOrLevels = jiraIssueRequestModel?.numberOfAreasOrLevels;
        this.totalProjectSquareFootage = jiraIssueRequestModel?.totalProjectSquareFootage;
        this.spreadSheetLink = jiraIssueRequestModel?.spreadSheetLink;
        this.squareFootage = jiraIssueRequestModel?.squareFootage;
        this.dueDate = this.formatDateToYyyyMmDd(jiraIssueRequestModel?.dueDate);
        this.priority = jiraIssueRequestModel?.priority ? jiraIssueRequestModel?.priority : "Unprioritized";
    }
    summary?: string;
    projectName?: string;
    projectLink?: string;
    captureDate?: string;
    subTaskNameTemplate?: string;
    numberOfAreasOrLevels?: number;
    totalProjectSquareFootage?: number;
    spreadSheetLink?: string;
    squareFootage?: number;
    dateReceived?: string;
    dueDate?: string;
    buildingType?: string;
    priority: string;

    private formatDateToYyyyMmDd(date: any) {
        if (date) {
            const selectedDate = new Date(date);
            const yyyy = selectedDate.getFullYear();
            const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const dd = String(selectedDate.getDate()).padStart(2, '0');

            return`${yyyy}-${mm}-${dd}`;
        }
        return date;
    }
}