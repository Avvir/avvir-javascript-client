import { JiraFieldProperty } from "./JiraFieldProperty";
import { JiraFieldAssignee } from "./JiraFieldAssignee";

export class JiraAcsFieldsConfiguration {
    buildingTypes?: JiraFieldProperty[];
    priorityTypes?: JiraFieldProperty[];
    workItemTypes?: JiraFieldProperty[];

    assignees?: JiraFieldAssignee[];
}

export default JiraAcsFieldsConfiguration;
