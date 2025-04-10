import { addInstantGetterAndSetterToApiModel, addReadOnlyPropertiesToModel } from "../../mixins";
import { ApiProjectPurposeType, ApiPurposeType, isApiPurposeType } from "../enums/api_purpose_type";
import { AssociationType, isPurposeType, PurposeType } from "../enums";
import { PurposeTypeConverter } from "../../converters";

import type ApiPhotoLocation3d from "./photos/api_photo_location_3d";
import type { DateLike, ModifyPartial, Vector2Like } from "type_aliases";

export type AvvirApiFileIds<Type extends ApiPurposeType = ApiPurposeType> = { [purposeType in Type]?: number[] }

export interface ApiCloudFileMetadata {
  offset?: Vector2Like;
}

export type ApiCloudFileArgument = ModifyPartial<ApiCloudFile, {
  lastModified?: DateLike
  createdAt?: DateLike
  purposeType: ApiPurposeType | PurposeType,
}>

export class ApiCloudFile {
  constructor({
                url,
                id,
                lastModified,
                createdAt,
                purposeType,
                fileType,
                createdBy,
                fileSize,
                location3d,
                originalFileName,
                projectId,
                associationType,
                associationId,
                metadata
              }: ApiCloudFileArgument)
  {
    addInstantGetterAndSetterToApiModel(this, "lastModified", lastModified);
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
    addReadOnlyPropertiesToModel(this,
      { url, id, fileType, createdBy, fileSize, projectId, associationType, associationId, originalFileName });
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
    // noinspection JSDeprecatedSymbols
    this.location3d = location3d;
    this.metadata = metadata;
  }

  readonly url: string;
  /** @deprecated Use metadata.offset */
  location3d?: ApiPhotoLocation3d;
  readonly id?: number;
  lastModified?: number | null = null;
  readonly createdAt?: number | null = null;
  readonly purposeType: ApiPurposeType = ApiProjectPurposeType.OTHER;
  readonly createdBy?: string;
  readonly fileSize?: number;
  readonly originalFileName?: string;
  readonly associationType?: AssociationType;
  readonly projectId?: number;
  readonly associationId?: number;
  metadata?: ApiCloudFileMetadata;
  readonly fileType?: string;
}

export default ApiCloudFile;
