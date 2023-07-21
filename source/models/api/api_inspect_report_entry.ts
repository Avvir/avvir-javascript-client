import {addInstantGetterAndSetterToApiModel, addReadOnlyPropertiesToModel} from "../../mixins";

export class ApiInspectReportEntry {
    constructor({ id, reportId, name, groupId, elementId, createdBy, createdAt }: Partial<ApiInspectReportEntry>) {
        addReadOnlyPropertiesToModel(this, { id, reportId });
        addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
        this.createdBy = createdBy;
        this.name = name;
        this.groupId = groupId;
        this.elementId = elementId;
    }
    readonly id: number;
    readonly reportId: number;
    name: string;
    groupId?: number;
    elementId?: number;
    createdAt?: string;
    createdBy?: number;
}