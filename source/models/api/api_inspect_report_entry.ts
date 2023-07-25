import {addInstantGetterAndSetterToApiModel, addReadOnlyPropertiesToModel} from "../../mixins";
import {DateLike} from "type_aliases";
import ApiPlannedElement from "./api_planned_element";
import ApiUser from "./api_user";

export class ApiInspectReportEntry {
    constructor({ id, reportId, name, elements, createdBy, createdAt }: Partial<ApiInspectReportEntry>) {
        addReadOnlyPropertiesToModel(this, { id, reportId, createdBy });
        addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
        this.name = name;
        this.elements = elements;
    }
    readonly id: number;
    readonly reportId: number;
    name: string;
    elements?: ApiPlannedElement[];
    createdAt?: DateLike;
    createdBy?: ApiUser;
}