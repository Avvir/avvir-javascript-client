// noinspection JSDeprecatedSymbols

import PurposeTypeConverter from "../converters/purpose_type_converter";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import {User} from "../utilities/get_authorization_headers";
import ApiArgoResponse from "../models/api/api_argo_response";
import ApiPipeline, {ApiPipelineArgument} from "../models/api/api_pipeline";
import Pipelines from "../models/enums/pipeline_types";
import AvvirApi from "../avvir_api";
import {pollPipeline} from "../utilities/pollPipeline";
import {
  ApiCloudFile,
  AvvirApiFiles,
  ApiFloorPurposeType,
  ApiPhotoAreaPurposeType,
  ApiPurposeType,
  AssociationIds, PhotoAreaPurposeType, PurposeType
} from "../models";

export default class FileInformationApi {
  static createProjectFile({projectId}: AssociationIds, apiFile: ApiCloudFile, user: User): Promise<ApiCloudFile> {
    const url = `${Http.baseUrl()}/projects/${projectId}/files`;
    return Http.post(url, user, apiFile) as unknown as Promise<ApiCloudFile>;
  }

  static listProjectFiles({projectId}: AssociationIds, user: User): Promise<ApiCloudFile[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/files`;
    return Http.get(url, user) as unknown as Promise<ApiCloudFile[]>;
  };

  static zipProjectFolder(folderName: string, {projectId}: AssociationIds, user: User): Promise<ApiArgoResponse> {
    const url = `${Http.baseUrl()}/projects/${projectId}/zip-project-folder?folder-prefix=${folderName}`;
    return Http.post(url, user, null) as unknown as Promise<ApiArgoResponse>;
  }

  static listPhotoAreaFiles({projectId, photoAreaId}: AssociationIds, user: User): Promise<ApiCloudFile[]>
  static listPhotoAreaFiles({
                              projectId,
                              photoAreaId
                            }: AssociationIds, purposeTypes: ApiPhotoAreaPurposeType[] | PhotoAreaPurposeType[] | User, user: User): Promise<ApiCloudFile[]>;
  static listPhotoAreaFiles({
                              projectId,
                              photoAreaId
                            }: AssociationIds, purposeTypes: ApiPhotoAreaPurposeType[] | PhotoAreaPurposeType[] | User, user?: User): Promise<ApiCloudFile[]> {
    let query;
    if (Array.isArray(purposeTypes)) {
      query = `?purposeType=${purposeTypes.map(purposeType => PurposeTypeConverter.toApiPurposeType(purposeType)).join(",")}`;
    } else {
      query = "";
      user = purposeTypes as User;
    }
    const url = `${Http.baseUrl()}/projects/${projectId}/photo-areas/${photoAreaId}/files${query}`;
    return Http.get(url, user) as unknown as Promise<ApiCloudFile[]>;
  }

  static saveFloorFile({projectId, floorId}: AssociationIds, apiFile: ApiCloudFile, user: User): Promise<ApiCloudFile> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/file`;
    return Http.post(url, user, apiFile) as unknown as Promise<ApiCloudFile>;
  }

  static listFloorFiles({projectId, floorId}: AssociationIds, user: User): Promise<AvvirApiFiles<ApiFloorPurposeType>> {
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

  static getScanDatasetFiles({
                               projectId,
                               floorId,
                               scanDatasetId
                             }: AssociationIds, user: User): Promise<{ files: ApiCloudFile[] }>
  static getScanDatasetFiles({
                               projectId,
                               floorId,
                               scanDatasetId
                             }: AssociationIds, purposeType: ApiPurposeType | PurposeType, user: User): Promise<{ files: ApiCloudFile[] }>
  static getScanDatasetFiles({
                               projectId,
                               floorId,
                               scanDatasetId
                             }: AssociationIds, purposeType: ApiPurposeType | PurposeType | User, user?: User) {
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
  static saveAndIngestE57ProjectFile({projectId}: AssociationIds, apiFile: ApiCloudFile, user: User): Promise<ApiCloudFile> {
    return FileInformationApi.createProjectFile({projectId}, apiFile, user).then(() => {
      let pipeline: ApiPipelineArgument = new ApiPipeline({
        name: Pipelines.INGEST_PROJECT_FILE,
        firebaseProjectId: projectId,
        options: {
          url: apiFile.url,
          fileType: 'e57'
        }
      });
      return AvvirApi.pipelines.triggerPipeline(pipeline, user)
        .then((pipelineResponse) => {
          return pollPipeline(pipelineResponse, user).then(() => {
            //pipeline is finished, return cloudfile
            return FileInformationApi.listProjectFiles({projectId}, user).then((projectFiles) => {
              return projectFiles.slice(-1)[0];
            })
          })
        });
    })
  }

  /** @deprecated */
  static saveAndConvertE57ProjectFile({
                                        projectId,
                                        floorId,
                                        scanDatasetId
                                      }: AssociationIds, apiFile: ApiCloudFile, user: User): Promise<ApiCloudFile> {
    return FileInformationApi.saveAndIngestE57ProjectFile({projectId}, apiFile, user).then((e57CloudFile) => {
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
            return FileInformationApi.listProjectFiles({projectId}, user).then((projectFiles) => {
              return projectFiles.slice(-1)[0];
            })
          })
        });
    })
  }
}

makeErrorsPretty(FileInformationApi);