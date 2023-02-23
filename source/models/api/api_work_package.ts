import {ProjectWorkPackageType} from "../enums";

export class ApiWorkPackage {
    id?: number
    name: string
    type?: ProjectWorkPackageType
    masterformatCodes?: string[];

    constructor({id, name, type, masterformatCodes} : Partial<ApiWorkPackage> = {}) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.masterformatCodes = masterformatCodes;
    }
}
