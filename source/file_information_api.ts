import ApiCloudFile from "./models/api/api_cloud_file";
import PurposeTypeConverter from "./converters/purpose_type_converter";
import { AssociationIds } from "type_aliases";
import Http from "./http";
import makeErrorsPretty from "./make_errors_pretty";
import {User} from "./get_authorization_headers";
import {PurposeType} from "./models/enums/purpose_type";

export default class FileInformationApi {
  static createProjectFile({ projectId }: AssociationIds, apiFile: ApiCloudFile, user: User) {
    const url = `${Http.baseUrl}/projects/${projectId}/files`;
    return Http.post(url, user, apiFile);
  }

  static listProjectFiles({ projectId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl}/projects/${projectId}/files`;
    return Http.get(url, user);
  };

  static zipProjectFolder(folderName: string, { projectId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl}/projects/${projectId}/zip-project-folder?folder-prefix=${folderName}`;
    return Http.post(url, user, null);
  }

  static listPhotoAreaFiles({ projectId, photoAreaId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl}/projects/${projectId}/photo-areas/${photoAreaId}/files`;
    return Http.get(url, user);
  }

  static saveFloorFile({ projectId, floorId }: AssociationIds, apiFile: ApiCloudFile, user: User) {
    const url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/file`;
    return Http.post(url, user, apiFile);
  }

  static listFloorFiles({ projectId, floorId }: AssociationIds, user: User) {
    let url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/files`;
    return Http.get(url, user);
  }

  static saveScanDatasetFile({ projectId, floorId, scanDatasetId }: AssociationIds, apiFile: ApiCloudFile, user: User) {
    const url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/file`;
    return Http.post(url, user, apiFile);
  }

  static getScanDatasetFiles({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<{ files: ApiCloudFile[] }>
  static getScanDatasetFiles({ projectId, floorId, scanDatasetId }: AssociationIds, purposeType: PurposeType, user: User): Promise<{ files: ApiCloudFile[] }>
  static getScanDatasetFiles({ projectId, floorId, scanDatasetId }: AssociationIds, purposeType: PurposeType | User, user?: User) {
    let query;
    if (typeof purposeType === "string") {
      query = `?purposeType=${PurposeTypeConverter.toApiPurposeType(purposeType)}`;
    } else {
      query = "";
      user = purposeType as User;
    }
    const url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/files${query}`;
    return Http.get(url, user);
  }
}

makeErrorsPretty(FileInformationApi);