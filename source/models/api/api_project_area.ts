import {ApiProjectAreaWorkStatus} from "./api_project_area_work_status";

export class ApiProjectArea {
    readonly id: number;
    readonly dbId: number;
    readonly name: string;
    readonly progress: ApiProjectAreaWorkStatus[]

    constructor({id, dbId, name, progress}: Partial<ApiProjectArea> = {}) {
        this.id = id || null;
        this.dbId = dbId || null;
        this.name = name || null;
        this.progress = progress || null;
    }
}