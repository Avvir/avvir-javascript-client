import ApiCloudFile from "./api_cloud_file";
import {ApiProjectArea} from "./api_project_area";
export class ApiProjectSummary {
    readonly model?:ApiCloudFile;
    readonly projectAreas?:ApiProjectArea[]

    constructor({model, projectAreas}: Partial<ApiProjectSummary> = {}) {
        this.model = model || null;
        this.projectAreas = projectAreas || null;
    }
}