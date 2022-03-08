import addReadOnlyPropertiesToModel from "../../../mixins/add_read_only_properties_to_model";
import {AvvirApiFiles, AvvirFiles, Modify} from "type_aliases";
import {PhotoAreaPurposeType} from "../../enums";

export interface PhotoAreaArgs extends Partial<Modify<PhotoArea, {
  files?: AvvirFiles<PhotoAreaPurposeType> | AvvirApiFiles<PhotoAreaPurposeType>
}>> {
}

export class PhotoArea {
  constructor({
                id,
                name,
                files,
                firebaseProjectId,
                externalProjectUrl,
                globalOffsetYaw
              }: PhotoAreaArgs = {}) {
    addReadOnlyPropertiesToModel(this, {id, firebaseProjectId});
    this.name = name;
    this.externalProjectUrl = externalProjectUrl;
    // @ts-ignore
    this.files = files || {};
    this.globalOffsetYaw = globalOffsetYaw;
  }

  readonly id: number;
  readonly firebaseProjectId: string;
  name: string;
  externalProjectUrl?: string;
  files?: AvvirFiles<PhotoAreaPurposeType>;
  globalOffsetYaw: number;
}
