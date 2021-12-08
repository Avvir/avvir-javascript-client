export class ApiMatrix4 {
  constructor({ x1 = 1, x2 = 0, x3 = 0, x4 = 0, y1 = 0, y2 = 1, y3 = 0, y4 = 0, z1 = 0, z2 = 0, z3 = 1, z4 = 0, w1 = 0, w2 = 0, w3 = 0, w4 = 1 } = {}) {
    this.x1 = x1;
    this.x2 = x2;
    this.x3 = x3;
    this.x4 = x4;
    this.y1 = y1;
    this.y2 = y2;
    this.y3 = y3;
    this.y4 = y4;
    this.z1 = z1;
    this.z2 = z2;
    this.z3 = z3;
    this.z4 = z4;
    this.w1 = w1;
    this.w2 = w2;
    this.w3 = w3;
    this.w4 = w4;
  }

  x1: number = 1;
  x2: number = 0;
  x3: number = 0;
  x4: number = 0;
  y1: number = 0;
  y2: number = 1;
  y3: number = 0;
  y4: number = 0;
  z1: number = 0;
  z2: number = 0;
  z3: number = 1;
  z4: number = 0;
  w1: number = 0;
  w2: number = 0;
  w3: number = 0;
  w4: number = 1;
}

export default ApiMatrix4;
