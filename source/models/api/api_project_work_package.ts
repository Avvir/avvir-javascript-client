import type { ProjectWorkPackageType } from "../enums";

/**
 * @deprecated Use {@link ApiWorkPackage} instead.
 */
export class ApiProjectWorkPackage {
  id?: number;
  name: string;
  ordinal: number;
  type?: ProjectWorkPackageType;
  masterformatCodes?: string[];

  constructor({ id, name, ordinal, type, masterformatCodes }: Partial<ApiProjectWorkPackage> = {}) {
    this.id = id;
    this.name = name;
    this.ordinal = ordinal;
    this.type = type;
    this.masterformatCodes = masterformatCodes;
  }
}

export default ApiProjectWorkPackage;
