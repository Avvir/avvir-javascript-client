export default class Masterformat {
  constructor(version?: number, code?: string, description?: string) {
    this.version = version || null;
    this.code = code || null;
    this.description = description;
  }

  version: number | null;
  code: string | null;
  description?: string;
}
