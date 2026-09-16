import {DateLike} from "type_aliases";
import {ApiTosVersion} from "./api_tos_version";

export class ApiTosAcceptance {
    id: number
    createdAt: DateLike
    tosVersion: ApiTosVersion

    constructor({ id, tosVersion, createdAt }: Partial<ApiTosAcceptance> = {}) {
        this.id = id;
        this.createdAt = createdAt;
        this.tosVersion = tosVersion;
    }
}
