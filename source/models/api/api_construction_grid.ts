import { addReadOnlyPropertiesToModel } from "../../mixins";

import type ApiGridLine from "./api_grid_line";

export class ApiConstructionGrid {
  constructor({ id, globalId, axisULines, axisVLines, firebaseFloorId }: Partial<ApiConstructionGrid>) {
    addReadOnlyPropertiesToModel(this, { id, firebaseFloorId, globalId });
    this.axisULines = axisULines;
    this.axisVLines = axisVLines;
  }

  readonly id: number | null = null;
  readonly globalId: string | null = null;
  axisULines: ApiGridLine[] = [];
  axisVLines: ApiGridLine[] = [];
  readonly firebaseFloorId: string | null = null;
}

export default ApiConstructionGrid;
