import { addReadOnlyPropertiesToModel } from "../../mixins";

export class ApiProjectAreaWorkPackage {
  readonly id: number;
  readonly projectAreaId: number;
  readonly projectWorkPackageId: number;
  readonly workPackageId: number;
  status: string;
  expectedStart: string;
  expectedCompletion: string;
  start: string;
  completion: string;


  constructor({
                id,
                projectAreaId,
                projectWorkPackageId,
                workPackageId,
                status,
                expectedStart,
                expectedCompletion,
                start,
                completion
              }: Partial<ApiProjectAreaWorkPackage>)
  {
    addReadOnlyPropertiesToModel(this, { id, projectAreaId, projectWorkPackageId, workPackageId });
    this.status = status;
    this.expectedStart = expectedStart;
    this.expectedCompletion = expectedCompletion;
    this.start = start;
    this.completion = completion;
  }
}

export default ApiProjectAreaWorkPackage;
