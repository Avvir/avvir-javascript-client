import { addReadOnlyPropertiesToModel } from "../../mixins";
import { ProjectWorkPackageType } from "../enums";

export default class ApiWorkPackage {
  constructor({ id, name, firebaseProjectId, type }: Partial<ApiWorkPackage> = {}) {
    addReadOnlyPropertiesToModel(this, { id, firebaseProjectId, type });
    this.name = name;
  }

  readonly id: number;
  name: string;
  readonly firebaseProjectId: string;
  readonly type: ProjectWorkPackageType
}
