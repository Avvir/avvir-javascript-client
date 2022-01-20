import {Quaternion, Vector3} from "three";

export class Location3d {
  constructor(
    public id: number,
    public position: Vector3,
    public orientation: Quaternion,
  ) {
  }
}
