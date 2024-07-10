import ApiCloudFile from "./api_cloud_file";
import ApiProjectArea from "./api_project_area";
import { addReadOnlyPropertiesToModel } from "../../mixins";

export class ApiProjectSummary {
  readonly model: ApiCloudFile;
  projectAreas: ApiProjectArea[];

  constructor({ model, projectAreas }: Partial<ApiProjectSummary> = {}) {
    addReadOnlyPropertiesToModel(this, { model });
    this.projectAreas = projectAreas || [];
  }
}

/**
 * @deprecated use {@link ApiProjectAreaWorkPackage} instead
 */
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
