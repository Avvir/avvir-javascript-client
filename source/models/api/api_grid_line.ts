import { Vector2 } from "three";
import { Vector2Like } from "type_aliases";

export default class ApiGridLine {
  constructor({ name, point1, point2 }: Partial<ApiGridLine>) {
    this.name = name || null;
    if (point1) {
      this.point1 = new Vector2(point1.x, point1.y);
    } else {
      this.point1 = null;
    }

    if (point2) {
      this.point2 = new Vector2(point2.x, point2.y);
    } else {
      this.point2 = null;
    }
  }

  name: string | null = null;
  point1: Vector2Like | null = null;
  point2: Vector2Like | null = null;
}
