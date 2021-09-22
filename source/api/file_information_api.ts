// @ts-nocheck
import ApiCloudFile from "../models/api/api_cloud_file";
import PurposeTypeConverter from "../converters/purpose_type_converter";
import {AssociationIds, AvvirApiFiles} from "type_aliases";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import {User} from "../utilities/get_authorization_headers";
import {FloorPurposeType, PurposeType} from "../models/enums/purpose_type";
import ApiArgoResponse from "../models/api/api_argo_response";

export default class FileInformationApi {
  static createProjectFile({ projectId }: AssociationIds, apiFile: ApiCloudFile, user: User) : Promise<ApiCloudFile>{
    const url = `${Http.baseUrl()}/projects/${projectId}/files`;
    return Http.post(url, user, apiFile);
  }

  static listProjectFiles({ projectId }: AssociationIds, user: User): Promise<ApiCloudFile[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/files`;
    return Http.get(url, user);
  };

  static zipProjectFolder(folderName: string, { projectId }: AssociationIds, user: User):Promise<ApiArgoResponse> {
    const url = `${Http.baseUrl()}/projects/${projectId}/zip-project-folder?folder-prefix=${folderName}`;
    return Http.post(url, user, null);
  }

  static listPhotoAreaFiles({ projectId, photoAreaId }: AssociationIds, user: User) :Promise<ApiCloudFile[]>{
    const url = `${Http.baseUrl()}/projects/${projectId}/photo-areas/${photoAreaId}/files`;
    return Http.get(url, user);
  }

  static saveFloorFile({ projectId, floorId }: AssociationIds, apiFile: ApiCloudFile, user: User) :Promise<void>{
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/file`;
    return Http.post(url, user, apiFile);
  }

  static listFloorFiles({ projectId, floorId }: AssociationIds, user: User):Promise<AvvirApiFiles<FloorPurposeType>> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/files`;
    return Http.get(url, user);
  }

  static saveScanDatasetFile({ projectId, floorId, scanDatasetId }: AssociationIds, apiFile: ApiCloudFile, user: User):Promise<ApiCloudFile> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/file`;
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
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/files${query}`;
    return Http.get(url, user);
  }
}

makeErrorsPretty(FileInformationApi);