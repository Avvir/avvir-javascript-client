import ApiCloudFile, { ApiCloudFileArgument } from "./api_cloud_file";

import type { ModifyPartial } from "type_aliases";

export type ApiProjectSummaryArg = ModifyPartial<ApiProjectSummary, {
  model: ApiCloudFileArgument
}>

export class ApiProjectSummary {
  readonly model: ApiCloudFile;
  projectAreaIds: number[];

  constructor({ model, projectAreaIds }: ApiProjectSummaryArg = {}) {
    this.model = new ApiCloudFile(model);
    this.projectAreaIds = projectAreaIds || [];
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
