import {DateLike, Modify} from "./type_aliases";
import {addInstantGetterAndSetterToApiModel, addReadOnlyPropertiesToModel} from "../../mixins"
import {ApiProjectPurposeType, ApiPurposeType, isApiPurposeType} from "./api_purpose_type";
import {PurposeTypeConverter} from "../../converters";
import {isPurposeType, PurposeType} from "../enums";
import ApiPhotoLocation3d from "./api_photo_location_3d";

export type AvvirApiFiles<Type extends ApiPurposeType = ApiPurposeType> = { [purposeType in Type]?: ApiCloudFile | ApiCloudFile[] }
export type AvvirApiFileIds<Type extends ApiPurposeType = ApiPurposeType> = { [purposeType in Type]?: number[] }

export interface ApiCloudFileArgument extends Partial<Modify<ApiCloudFile, {
  lastModified?: DateLike
  createdAt?: DateLike
  purposeType: ApiPurposeType | PurposeType,
  fileType?: string
}>> {
}

export class ApiCloudFile {
  constructor({url, id, lastModified, createdAt, purposeType, fileType, createdBy, sizeInBytes, location3d}: ApiCloudFileArgument) {
    addInstantGetterAndSetterToApiModel(this, "lastModified", lastModified);
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
    addReadOnlyPropertiesToModel(this, {url, id, fileType, createdBy});
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
    this.purposeType = purposeType;
    this.location3d = location3d;
    this.sizeInBytes = sizeInBytes;
  }

  readonly url: string;
  location3d?: ApiPhotoLocation3d
  readonly id?: number
  lastModified?: number | null = null;
  createdAt?: number | null = null;
  purposeType: ApiPurposeType = ApiProjectPurposeType.OTHER;
  readonly createdBy?: string;
  sizeInBytes?: number;
}

export default ApiCloudFile;
