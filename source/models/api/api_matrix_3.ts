export class ApiMatrix3 {
  constructor({ x1 = 1, x2 = 0, x3 = 0,
                y1 = 0, y2 = 1, y3 = 0,
                z1 = 0, z2 = 0, z3 = 1}) {
    this.x1 = x1;
    this.x2 = x2;
    this.x3 = x3;
    this.y1 = y1;
    this.y2 = y2;
    this.y3 = y3;
    this.z1 = z1;
    this.z2 = z2;
    this.z3 = z3;
  }

  x1: number = 1;
  x2: number = 0;
  x3: number = 0;
  y1: number = 0;
  y2: number = 1;
  y3: number = 0;
  z1: number = 0;
  z2: number = 0;
  z3: number = 1;
}

export default ApiMatrix3;
