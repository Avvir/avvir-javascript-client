import ApiCloudFile from "./api_cloud_file";
export class ApiProjectSummary {
    readonly model:ApiCloudFile;
    projectAreas: ApiProjectArea[];
}


export class ApiProjectArea {
    readonly id: number
    readonly modelElementId: number
    readonly floorId?: number
    readonly firebaseFloorId?: string
    name: string
    progress: ApiProjectAreaProgress[]

    constructor({id, modelElementId, name, progress, floorId, firebaseFloorId} : Partial<ApiProjectArea>) {
        this.id = id;
        this.modelElementId = modelElementId;
        this.name = name;
        this.progress = progress;
        this.floorId = floorId;
        this.firebaseFloorId = firebaseFloorId;
    }
}

export class ApiProjectAreaProgress {
    id: number
    name: string
    status: string


    constructor({id, name, status} : Partial<ApiProjectAreaProgress>) {
        this.id = id;
        this.name = name;
        this.status = status
    }
}

export default ApiProjectSummary;