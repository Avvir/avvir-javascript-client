import {Vector3Like} from "./type_aliases";
import {DeviationStatus} from "../enums";
import {Vector3} from "three";

export class ApiElementDeviation {
  deviationVectorMeters: Vector3Like;
  deviationMeters: number;
  status: DeviationStatus;
  clashing: boolean;

  constructor(deviation: Partial<ApiElementDeviation> = {}) {
    let deviationVector: Vector3;
    if (deviation?.deviationVectorMeters) {
      deviationVector = new Vector3(deviation.deviationVectorMeters.x, deviation.deviationVectorMeters.y, deviation.deviationVectorMeters.z);
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
