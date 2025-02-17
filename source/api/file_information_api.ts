// noinspection JSDeprecatedSymbols

import ApiArgoResponse from "../models/api/api_argo_response";
import AvvirApi from "../avvir_api";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import PurposeTypeConverter from "../converters/purpose_type_converter";
import type { ApiCloudFile, ApiFloorPurposeType, ApiPhotoAreaPurposeType, ApiPipelineArgument, ApiPurposeType, PhotoAreaPurposeType, PurposeType } from "../models";
import { ApiPipeline, Pipelines } from "../models";
import { pollPipeline } from "../utilities/poll_pipeline";
import type { AssociationIds, AvvirApiFiles } from "type_aliases";
import type { User } from "../utilities/get_authorization_headers";

export default class FileInformationApi {
  static createProjectFile({ projectId }: AssociationIds, apiFile: ApiCloudFile, user: User): Promise<ApiCloudFile> {
    const url = `${Http.baseUrl()}/projects/${projectId}/files`;
    return Http.post(url, user, apiFile) as unknown as Promise<ApiCloudFile>;
  }

  static associateProjectFiles({ projectId }: AssociationIds,
                               files: ApiCloudFile[],
                               user: User): Promise<ApiCloudFile[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/associate-files`;
    return Http.post(url, user, files) as unknown as Promise<ApiCloudFile[]>;
  }

  static listProjectFiles({ projectId }: AssociationIds,
                          user: User,
                          purposeType?: ApiPurposeType | PurposeType): Promise<ApiCloudFile[]> {
    let query;
    if (typeof purposeType === "string") {
      query = `?purpose-type=${PurposeTypeConverter.toApiPurposeType(purposeType)}`;
    } else {
      query = "";
    }
    const url = `${Http.baseUrl()}/projects/${projectId}/files${query}`;
    return Http.get(url, user) as unknown as Promise<ApiCloudFile[]>;
  };

  static listFloorFilesForProject({ projectId }: AssociationIds,
                                  user: User): Promise<{ floorId: string, files: ApiCloudFile[] }[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floor-files`;
    return Http.get(url, user) as unknown as Promise<{ floorId: string, files: ApiCloudFile[] }[]>;
  }

  static listScanDatasetFilesForProject({ projectId }: AssociationIds,
                                        user: User): Promise<{ [scanDatasetId: string]: ApiCloudFile[] }> {
    const url = `${Http.baseUrl()}/projects/${projectId}/scan-dataset-files`;
    return Http.get(url, user) as unknown as Promise<{ [scanDatasetId: string]: ApiCloudFile[] }>;
  }

  static zipProjectFolder(folderName: string, { projectId }: AssociationIds, user: User): Promise<ApiArgoResponse> {
    const url = `${Http.baseUrl()}/projects/${projectId}/zip-project-folder?folder-prefix=${folderName}`;
    return Http.post(url, user, null) as unknown as Promise<ApiArgoResponse>;
  }

  static listPhotoAreaFiles({ projectId, photoAreaId }: AssociationIds, user: User): Promise<ApiCloudFile[]>
  static listPhotoAreaFiles({ projectId, photoAreaId }: AssociationIds,
                            purposeTypes: ApiPhotoAreaPurposeType[] | PhotoAreaPurposeType[],
                            user: User): Promise<ApiCloudFile[]>;
  static listPhotoAreaFiles({
                              projectId,
                              photoAreaId
                            }: AssociationIds,
                            purposeTypes: ApiPhotoAreaPurposeType[] | PhotoAreaPurposeType[] | User,
                            user?: User): Promise<ApiCloudFile[]> {
    let query;
    if (Array.isArray(purposeTypes)) {
      query = `?purposeType=${purposeTypes.map(purposeType => PurposeTypeConverter.toApiPurposeType(purposeType))
        .join(",")}`;
    } else {
      query = "";
      user = purposeTypes as User;
    }
    const url = `${Http.baseUrl()}/projects/${projectId}/photo-areas/${photoAreaId}/files${query}`;
    return Http.get(url, user) as unknown as Promise<ApiCloudFile[]>;
  }

  static saveFloorFile({ projectId, floorId }: AssociationIds,
                       apiFile: ApiCloudFile,
                       user: User): Promise<ApiCloudFile> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/file`;
    return Http.post(url, user, apiFile) as unknown as Promise<ApiCloudFile>;
  }

  static listFloorFiles({ projectId, floorId }: AssociationIds,
                        user: User): Promise<AvvirApiFiles<ApiFloorPurposeType>> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/files`;
    return Http.get(url, user) as unknown as Promise<AvvirApiFiles<ApiFloorPurposeType>>;
  }

  static savePhotoAreaFile({
                             projectId,
                             photoAreaId
                           }: AssociationIds, apiFile: ApiCloudFile, user: User): Promise<ApiCloudFile> {
    const url = `${Http.baseUrl()}/projects/${projectId}/photo-areas/${photoAreaId}/files`;
    return Http.post(url, user, apiFile) as unknown as Promise<ApiCloudFile>;
  }

  static saveScanDatasetFile({
                               projectId,
                               floorId,
                               scanDatasetId
                             }: AssociationIds, apiFile: ApiCloudFile, user: User): Promise<ApiCloudFile> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/file`;
    return Http.post(url, user, apiFile) as unknown as Promise<ApiCloudFile>;
  }

  static getScanDatasetFiles({ projectId, floorId, scanDatasetId }: AssociationIds,
                             user: User): Promise<{ files: ApiCloudFile[] }>
  static getScanDatasetFiles({ projectId, floorId, scanDatasetId }: AssociationIds,
                             purposeType: ApiPurposeType | PurposeType,
                             user: User): Promise<{ files: ApiCloudFile[] }>
  static getScanDatasetFiles({ projectId, floorId, scanDatasetId }: AssociationIds,
                             purposeType: ApiPurposeType | PurposeType | User,
                             user?: User)
  {
    let query;
    if (typeof purposeType === "string") {
      query = `?purposeType=${PurposeTypeConverter.toApiPurposeType(purposeType)}`;
    } else {
      query = "";
      user = purposeType as User;
    }
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/files${query}`;
    return Http.get(url, user) as unknown as Promise<{ files: ApiCloudFile[] }>;
  }

  /** @deprecated */
  static saveAndIngestE57ProjectFile({ projectId }: AssociationIds,
                                     apiFile: ApiCloudFile,
                                     user: User): Promise<ApiCloudFile> {
    return FileInformationApi.createProjectFile({ projectId }, apiFile, user).then(() => {
      let pipeline: ApiPipelineArgument = new ApiPipeline({
        name: Pipelines.INGEST_PROJECT_FILE,
        firebaseProjectId: projectId,
        options: {
          url: apiFile.url,
          fileType: "e57"
        }
      });
      return AvvirApi.pipelines.triggerPipeline(pipeline, user)
        .then((pipelineResponse) => {
          return pollPipeline(pipelineResponse, user).then(() => {
            //pipeline is finished, return cloudfile
            return FileInformationApi.listProjectFiles({ projectId }, user).then((projectFiles) => {
              return projectFiles.slice(-1)[0];
            });
          });
        });
    });
  }

  /** @deprecated */
  static saveAndConvertE57ProjectFile({ projectId }: AssociationIds,
                                      apiFile: ApiCloudFile,
                                      user: User): Promise<ApiCloudFile> {
    return FileInformationApi.saveAndIngestE57ProjectFile({ projectId }, apiFile, user).then((e57CloudFile) => {
      let pipeline: ApiPipelineArgument = new ApiPipeline({
        name: Pipelines.CONVERT_E57_TO_LAS,
        firebaseProjectId: projectId,
        options: {
          fileUri: e57CloudFile.url,
          url: `acceptance/projects/${projectId}/photo-areas/None`
        }
      });

      return AvvirApi.pipelines.triggerPipeline(pipeline, user)
        .then((pipelineResponse) => {
          return pollPipeline(pipelineResponse, user).then(() => {
            //pipeline is finished, return cloudfile
            return FileInformationApi.listProjectFiles({ projectId }, user).then((projectFiles) => {
              return projectFiles.slice(-1)[0];
            });
          });
        });
    });
  }

  static deleteFile({ projectId }: AssociationIds, fileId: number, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/files/${fileId}`;
    return Http.delete(url, user) as unknown as Promise<void>;
  }
}

makeErrorsPretty(FileInformationApi);
