type QuaternionLike = { x: number, y: number, z: number, w: number };

export class ApiQuaternion {
  constructor({a = 0, b = 0, c = 0, d = 1}) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }

  a: number;
  b: number;
  c: number;
  d: number;

  static create(q: QuaternionLike | ApiQuaternion): ApiQuaternion | null {
    if (q == null) {
      return null;
    } else if (isApiQuaternion(q)) {
      return q;
    }

    return new ApiQuaternion({a: q.x, b: q.y, c: q.z, d: q.w});
  }
}

export function isApiQuaternion(type: any): type is ApiQuaternion {
  return type != null
    && Number.isFinite(type.a)
    && Number.isFinite(type.b)
    && Number.isFinite(type.c)
    && Number.isFinite(type.d);
}
