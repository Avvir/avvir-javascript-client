import _ from "underscore";
import PurposeType, { PurposeType as PurposeTypeString } from "../models/enums/purpose_type";
import { ApiPurposeType } from "../models/api/api_purpose_type";

const apiPurposeTypeByPurposeType = _.invert(PurposeType);

const purposeTypeByApiPurposeType = PurposeType;

export default class PurposeTypeConverter {
  static toApiPurposeType(fileKey: PurposeTypeString): ApiPurposeType {
    return apiPurposeTypeByPurposeType[fileKey];
  }

  static toPurposeType(apiPurposeType: ApiPurposeType): PurposeTypeString {
    return purposeTypeByApiPurposeType[apiPurposeType];
  }
}
