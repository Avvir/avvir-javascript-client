import addReadOnlyPropertiesToModel from "../../../mixins/add_read_only_properties_to_model";
import { AvvirApiFiles, AvvirFiles, Modify } from "type_aliases";
import { PhotoAreaPurposeType } from "../../enums/purpose_type";

interface PhotoAreaArgs extends Partial<Modify<PhotoArea, {
  files?: AvvirFiles<PhotoAreaPurposeType> | AvvirApiFiles<PhotoAreaPurposeType>
}>> {}

export default class PhotoArea {
  constructor({ name, id, files, firebaseProjectId, structionsiteProjectUrl }: PhotoAreaArgs = {}) {
    addReadOnlyPropertiesToModel(this, { id, firebaseProjectId });
    this.name = name;
    this.structionsiteProjectUrl = structionsiteProjectUrl;
    // @ts-ignore
    this.files = files || {};
  }

  readonly id: number;
  readonly firebaseProjectId: string;
  name: string;
  structionsiteProjectUrl?: string;
  files?: AvvirFiles<PhotoAreaPurposeType>;
}
