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

    constructor(id, modelElementId, name, progress) {
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

    constructor(id, name, status) {
        this.id = id;
        this.name = name;
        this.status = status
    }
}

export default ApiProjectSummary;