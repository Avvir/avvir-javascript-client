import { DateLike, Modify } from "type_aliases";
import { ApiPurposeType } from "./api_purpose_type";
import { PurposeType } from "../enums/purpose_type";
interface ApiCloudFileArgument extends Partial<Modify<ApiCloudFile, {
    lastModified?: DateLike;
    createdAt?: DateLike;
    purposeType: ApiPurposeType | PurposeType;
    fileType?: string;
}>> {
}
export default class ApiCloudFile {
    constructor({ url, id, lastModified, createdAt, purposeType, fileType }: ApiCloudFileArgument);
    readonly url: string;
    readonly id?: number;
    lastModified?: number | null;
    createdAt?: number | null;
    purposeType: ApiPurposeType;
}
export {};
