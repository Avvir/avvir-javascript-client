import { DateLike, Modify } from "type_aliases";
import addInstantGetterAndSetterToApiModel from "../../services/utilities/mixins/add_instant_getter_and_setter_to_api_model";
import addReadOnlyPropertiesToModel from "../../services/utilities/mixins/add_read_only_properties_to_model";
import ApiTypesEnum, { ApiPurposeType, isApiPurposeType } from "./api_purpose_type";
import { PurposeType, isPurposeType } from "../domain/enums/purpose_type";
import PurposeTypeConverter from "../../converters/purpose_type_converter";

interface ApiCloudFileArgument extends Partial<Modify<ApiCloudFile, {
  lastModified?: DateLike
  createdAt?: DateLike
  purposeType: ApiPurposeType | PurposeType
}>> {}

export default class ApiCloudFile {
  constructor({ url, id, lastModified, createdAt, purposeType }: ApiCloudFileArgument) {
    addInstantGetterAndSetterToApiModel(this, "lastModified");
    addInstantGetterAndSetterToApiModel(this, "createdAt");
    addReadOnlyPropertiesToModel(this, { url, id });
    let purposeTypeVal: ApiPurposeType = ApiTypesEnum.OTHER;
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
  purposeType: ApiPurposeType = ApiTypesEnum.OTHER;
}
