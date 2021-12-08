export class ApiMasterformat {
  constructor(version: number, code: string, description?: string) {
    this.version = version;
    this.code = code;
    this.description = description;
  }

  version: number;
  code: string;
  description?: string;
}

export default ApiMasterformat;
