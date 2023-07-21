import {addInstantGetterAndSetterToApiModel, addReadOnlyPropertiesToModel} from "../../mixins";
import {ApiInspectReportEntry} from "./api_inspect_report_entry";

export class ApiInspectReport {
    constructor({ id, firebaseProjectId, name, entries, createdBy, createdAt }: Partial<ApiInspectReport>) {
        addReadOnlyPropertiesToModel(this, { id, firebaseProjectId, createdBy });
        this.name = name;
        this.entries = !!entries ? entries : [];
        addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
    }
    readonly id: number;
    readonly firebaseProjectId: string;
    name: string;
    entries: ApiInspectReportEntry[];
    createdAt?: string;
    createdBy?: number;
}