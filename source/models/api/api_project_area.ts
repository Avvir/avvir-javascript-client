import { addReadOnlyPropertiesToModel } from "../../mixins";
import { ApiProjectAreaProgress } from "./api_project_summary";

import type ApiProjectAreaWorkPackage from "./api_project_area_work_package";

export class ApiProjectArea {
  readonly id: number;
  readonly modelElementId: number;
  readonly floorId?: number;
  readonly firebaseFloorId?: string;
  /**
   * @deprecated use {@link ApiProjectArea.workPackages workPackages} instead
   */
  progress: ApiProjectAreaProgress[];
  workPackages: ApiProjectAreaWorkPackage[];

  constructor({ id, modelElementId, progress, floorId, firebaseFloorId, workPackages }: Partial<ApiProjectArea>) {
    addReadOnlyPropertiesToModel(this, { id, modelElementId, floorId, firebaseFloorId });
    this.progress = progress || [];
    this.workPackages = workPackages || [];
  }
}

export default ApiProjectArea;
