import {DateLike, Modify} from "type_aliases";
import {addInstantGetterAndSetterToApiModel, addReadOnlyPropertiesToModel} from "../../mixins"
import {ApiProjectPurposeType, ApiPurposeType, isApiPurposeType} from "./api_purpose_type";
import {isPurposeType, PurposeType} from "../enums";
import {PurposeTypeConverter} from "../../converters";

export interface ApiCloudFileArgument extends Partial<Modify<ApiCloudFile, {
  lastModified?: DateLike
  createdAt?: DateLike
  purposeType: ApiPurposeType | PurposeType,
  fileType?: string
}>> {
}

export class ApiCloudFile {
  constructor({url, id, lastModified, createdAt, purposeType, fileType}: ApiCloudFileArgument) {
    addInstantGetterAndSetterToApiModel(this, "lastModified");
    addInstantGetterAndSetterToApiModel(this, "createdAt");
    addReadOnlyPropertiesToModel(this, {url, id, fileType});
    let purposeTypeVal: ApiPurposeType = ApiProjectPurposeType.OTHER;
    Object.defineProperties(this, {
      purposeType: {
        get() {
          return purposeTypeVal;
        },
        set(val) {
          if (typeof val === "string") {
            if (isApiPurposeType(val)) {
              purposeTypeVal = val;
            } else if (isPurposeType(val)) {
              purposeTypeVal = PurposeTypeConverter.toApiPurposeType(val);
            }
          }
        },
        enumerable: true
      }
    });
    // @ts-ignore
    this.lastModified = lastModified || null;
    // @ts-ignore
    this.createdAt = createdAt || null;
    // @ts-ignore
    this.purposeType = purposeType;
  }

  readonly url: string;
  readonly id?: number
  lastModified?: number | null = null;
  createdAt?: number | null = null;
  purposeType: ApiPurposeType = ApiProjectPurposeType.OTHER;
}

export default ApiCloudFile;
