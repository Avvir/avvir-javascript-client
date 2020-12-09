import ApiArgoResponse from "./models/api/api_argo_response";
import ApiCloudFile from "./models/api/api_cloud_file";
import checkFetchStatus from "./check_fetch_status";
import getAuthorizationHeaders, { User } from "./get_authorization_headers";
import PurposeTypeConverter from "./converters/purpose_type_converter";
import WebGatewayApi from "./web_gateway_api";
import { AssociationIds, AvvirApiFiles } from "type_aliases";
import { httpGetHeaders, httpPostHeaders } from "./request_headers";
import { FloorPurposeType, PurposeType } from "./models/enums/purpose_type";
import Config from "./config";

export default class FileInformationApi {
  static createProjectFile({ projectId }: AssociationIds, apiFile: ApiCloudFile, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/files`;
    return (fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(apiFile)
    }).then(checkFetchStatus) as Promise<void>)
      .catch(Config.sharedErrorHandler);
  }

  static listProjectFiles({ projectId }: AssociationIds, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/files`;
    return fetch(url, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiCloudFile[]>;
  };

  static zipProjectFolder(folderName: string, { projectId }: AssociationIds, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/zip-project-folder?folder-prefix=${folderName}`;
    return fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiArgoResponse>;
  }

  static listPhotoAreaFiles({ projectId, photoAreaId }: AssociationIds, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/photo-areas/${photoAreaId}/files`;
    return (fetch(url, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiCloudFile[]>);
  }

  static saveFloorFile({ projectId, floorId }: AssociationIds, apiFile: ApiCloudFile, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/file`;
    return (fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(apiFile)
    }).then(checkFetchStatus) as Promise<void>)
      .catch(Config.sharedErrorHandler);
  }

  static listFloorFiles({ projectId, floorId }: AssociationIds, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/files`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<AvvirApiFiles<FloorPurposeType>>;
  }

  static saveScanDatasetFile({ projectId, floorId, scanDatasetId }: AssociationIds, apiFile: ApiCloudFile, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/file`;
    return (fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(apiFile)
    }).then(checkFetchStatus) as Promise<void>)
      .catch(Config.sharedErrorHandler);
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
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/files${query}`;
    return fetch(url, {
      method: "GET",
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      },
    }).then(checkFetchStatus) as Promise<{ files: ApiCloudFile[] }>;
  }
}
