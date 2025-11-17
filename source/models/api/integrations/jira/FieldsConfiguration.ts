import {JiraFieldProperty} from "./JiraFieldProperty";
import {JiraFieldAssignee} from "./JiraFieldAssignee";

export class FieldsConfiguration {
    buildingTypes?: JiraFieldProperty[];
    priorityTypes?: JiraFieldProperty[];
    requestTypes?: JiraFieldProperty[];
    assignees?: JiraFieldAssignee[];
}

export default FieldsConfiguration;