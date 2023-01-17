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
    expectedStart: string;
    expectedCompletion: string;
    start: string;
    completion: string;


    constructor({id, name, status, expectedStart, expectedCompletion, start, completion} : Partial<ApiProjectAreaProgress>) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.expectedStart = expectedStart;
        this.expectedCompletion = expectedCompletion;
        this.start = start;
        this.completion = completion;
    }
}

export default ApiProjectSummary;