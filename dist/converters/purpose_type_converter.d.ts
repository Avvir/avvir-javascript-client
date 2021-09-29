import { PurposeType as PurposeTypeString } from "../models/enums/purpose_type";
import { ApiPurposeType } from "../models/api/api_purpose_type";
export default class PurposeTypeConverter {
    static toApiPurposeType(fileKey: PurposeTypeString): ApiPurposeType;
    static toPurposeType(apiPurposeType: ApiPurposeType): PurposeTypeString;
}
