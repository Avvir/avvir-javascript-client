// noinspection JSDeprecatedSymbols

import {invert} from "underscore";
import PurposeType, {PurposeType as PurposeTypeString} from "../models/enums/purpose_type";
import {ApiPurposeType, isApiPurposeType} from "../models";

const apiPurposeTypeByPurposeType = invert(PurposeType);

const purposeTypeByApiPurposeType = PurposeType;

export class PurposeTypeConverter {
  static toApiPurposeType(fileKey: ApiPurposeType | PurposeTypeString): ApiPurposeType {
    if (isApiPurposeType(fileKey)) {
      return fileKey;
    }
    return apiPurposeTypeByPurposeType[fileKey];
  }

  static toPurposeType(apiPurposeType: ApiPurposeType): PurposeTypeString {
    return purposeTypeByApiPurposeType[apiPurposeType];
  }
}

export default PurposeTypeConverter;
