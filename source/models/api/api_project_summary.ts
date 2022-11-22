import ApiCloudFile from "./api_cloud_file";
export class ApiProjectSummary {
    readonly model:ApiCloudFile;
    projectAreas: ApiProjectArea[];
}


export class ApiProjectArea {
    readonly id: number
    readonly modelElementId: number
    name: string
    progress: ApiProjectAreaProgress[]

    constructor({id, modelElementId, name, progress} : Partial<ApiProjectArea>) {
        this.id = id;
        this.modelElementId = modelElementId;
        this.name = name;
        this.progress = progress;
    }
}

export class ApiProjectAreaProgress {
    id: number
    name: string
    status: string
    readonly floorId?: number
    readonly firebaseFloorId?: string

    constructor({id, name, status, floorId, firebaseFloorId} : Partial<ApiProjectAreaProgress>) {
        this.id = id;
        this.name = name;
        this.status = status
        this.floorId = floorId;
        this.firebaseFloorId = firebaseFloorId;
    }
}

export default ApiProjectSummary;