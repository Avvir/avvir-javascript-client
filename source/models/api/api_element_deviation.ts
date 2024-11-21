import { Vector3 } from "three";

import { DeviationStatus } from "../enums";

import type { ModifyPartial, Vector3Like } from "type_aliases";

export type ApiElementDeviationArgument = ModifyPartial<ApiElementDeviation, {
  deviationVectorMeters: Vector3Like
}>

export class ApiElementDeviation {
  deviationVectorMeters: Vector3;
  deviationMeters: number;
  status: DeviationStatus;
  /** @deprecated This is now stored as obstructing/obstructed id pairs and will be ignored */
  clashing: boolean;

  constructor(deviation: ApiElementDeviationArgument = {}) {
    let deviationVector: Vector3;
    if (deviation?.deviationVectorMeters) {
      deviationVector = new Vector3(deviation.deviationVectorMeters.x,
        deviation.deviationVectorMeters.y,
        deviation.deviationVectorMeters.z);
    } else {
      deviationVector = new Vector3();
    }
    this.deviationVectorMeters = deviationVector;
    this.deviationMeters = deviation.deviationMeters || deviationVector.length();
    this.status = deviation.status || DeviationStatus.DETECTED;
    this.clashing = !!deviation.clashing;
  }
}

export default ApiElementDeviation;
