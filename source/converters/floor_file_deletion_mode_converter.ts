import _ from "underscore";

import ApiFloorFileDeletionMode from "../models/enums/api_floor_file_deletion_mode";

const apiFloorFileDeletionModes = _.invert(ApiFloorFileDeletionMode);

type ApiFloorFileDeletionModeKeys = keyof typeof ApiFloorFileDeletionMode;
const apiFloorFileDeletionModeTypeKeys: ApiFloorFileDeletionModeKeys[] = Object.values(ApiFloorFileDeletionMode);

const isApiFloorFileDeletionMode = (type: any): type is ApiFloorFileDeletionMode => apiFloorFileDeletionModeTypeKeys.includes(
  type);

export class FloorFileDeletionModeConverter {
  static toApiFloorFileDeletionMode(fileKey: ApiFloorFileDeletionMode): ApiFloorFileDeletionMode {
    if (isApiFloorFileDeletionMode(fileKey)) {
      return fileKey;
    }
    return apiFloorFileDeletionModes[fileKey];
  }
}

export default FloorFileDeletionModeConverter;
