import ApiCloudFile from "../models/api/api_cloud_file";
import { AssociationIds, AvvirApiFiles } from "type_aliases";
import { User } from "../utilities/get_authorization_headers";
import { FloorPurposeType, PurposeType } from "../models/enums/purpose_type";
import ApiArgoResponse from "../models/api/api_argo_response";
export default class FileInformationApi {
    static createProjectFile({ projectId }: AssociationIds, apiFile: ApiCloudFile, user: User): Promise<ApiCloudFile>;
    static listProjectFiles({ projectId }: AssociationIds, user: User): Promise<ApiCloudFile[]>;
    static zipProjectFolder(folderName: string, { projectId }: AssociationIds, user: User): Promise<ApiArgoResponse>;
    static listPhotoAreaFiles({ projectId, photoAreaId }: AssociationIds, user: User): Promise<ApiCloudFile[]>;
    static saveFloorFile({ projectId, floorId }: AssociationIds, apiFile: ApiCloudFile, user: User): Promise<ApiCloudFile | void>;
    static listFloorFiles({ projectId, floorId }: AssociationIds, user: User): Promise<AvvirApiFiles<FloorPurposeType>>;
    static saveScanDatasetFile({ projectId, floorId, scanDatasetId }: AssociationIds, apiFile: ApiCloudFile, user: User): Promise<ApiCloudFile>;
    static getScanDatasetFiles({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<{
        files: ApiCloudFile[];
    }>;
    static getScanDatasetFiles({ projectId, floorId, scanDatasetId }: AssociationIds, purposeType: PurposeType, user: User): Promise<{
        files: ApiCloudFile[];
    }>;
    static saveAndIngestE57ProjectFile({ projectId }: AssociationIds, apiFile: ApiCloudFile, user: User): Promise<ApiCloudFile>;
    static saveAndConvertE57ProjectFile({ projectId, floorId, scanDatasetId }: AssociationIds, apiFile: ApiCloudFile, user: User): Promise<ApiCloudFile>;
}
