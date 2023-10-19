import { ProjectWorkPackageType } from "../enums";

export class ApiWorkPackage {
    id?: number
    name: string
    ordinal: number
    type?: ProjectWorkPackageType
    masterformatCodes?: string[];

    constructor({id, name, ordinal, type, masterformatCodes} : Partial<ApiWorkPackage> = {}) {
        this.id = id;
        this.name = name;
        this.ordinal = ordinal;
        this.type = type;
        this.masterformatCodes = masterformatCodes;
    }
}
