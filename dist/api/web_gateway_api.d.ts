import ApiInvitation from "../models/api/api_invitation";
import ApiMasterformat from "../models/api/api_masterformat";
import ApiPipeline from "../models/api/api_pipeline";
import DeprecatedApiPipeline from "../models/api/deprecated_api_pipeline";
import { User } from "../utilities/get_authorization_headers";
import { AssociationIds } from "type_aliases";
import { RunningProcess } from "../models/domain/running_process";
export default class WebGatewayApi {
    static connectProjectToStructionSite({ projectId }: AssociationIds, structionSiteProjectUrl: string, token: string, user: User): Promise<ApiPipeline>;
    static checkPipelineStatus({ projectId }: AssociationIds, pipelineId: number, user: User): Promise<ApiPipeline>;
    static createInvitation(inviteeEmail: string, role: string, organizationId: string, user: User): Promise<ApiInvitation>;
    static getInvitation(invitationToken: string, user: User): Promise<ApiInvitation>;
    static getProgressReportPdfUrl(projectId: string, user: User): string;
    static getQualityControlReportPdfUrl(projectId: string): string;
    static getPlannedElementsTsvUrl({ projectId, floorId }: AssociationIds, fileName: string, user: User): string;
    static getDeviationsReportTsvUrl({ projectId, floorId }: AssociationIds, fileName: string, user: User): string;
    static getScanAnalysisUrl({ projectId, floorId, scanDatasetId }: AssociationIds, fileName: string, user: User): string;
    static checkProcoreAccessToken(projectId: string, procoreAccessToken: string, user: User): Promise<{
        expiresInSeconds: number;
    }>;
    static pushPdfToProcore({ projectId, floorId, scanDatasetId }: AssociationIds, procoreProjectId: string, procoreAccessToken: string, pdfType: string, user: User): Promise<void>;
    static getProcoreProjects(projectId: string, procoreAccessToken: string, user: User): Promise<{
        lastUpdated: number;
        projectId: string | number;
    }[]>;
    static getCustomFirebaseToken(user: User): Promise<{
        headers: Headers;
        body: {
            storageToken: string;
        };
    }>;
    static login(username: string, password: string): Promise<{
        headers: Headers;
        body: {
            storageToken: string;
            redirectUrl: string;
        };
    }>;
    static acceptInvitation(token: string, password: string): Promise<void>;
    static exportIfc({ projectId, floorId, scanDatasetId }: AssociationIds, type: string, user: User): Promise<DeprecatedApiPipeline>;
    static checkExportedIfc({ projectId, floorId, scanDatasetId }: AssociationIds, workflowName: string, type: string, user: User): Promise<DeprecatedApiPipeline>;
    static downsampleScan({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<void>;
    static getGcpBearerToken({ projectId }: AssociationIds, user: User): Promise<{
        accessToken: string;
        expireTime: string;
    }>;
    static getMasterformat(version: number): Promise<ApiMasterformat[]>;
    static triggerArgoRunProgressAndDeviations({ projectId, floorId }: AssociationIds, deviationsFlag: string, bimSourceFileExtension: string, user: User): Promise<void>;
    static triggerArgoRunNwdConvert({ projectId, floorId }: AssociationIds, user: User): Promise<void>;
    static recordUserActions(type: any, userActions: any, user: User): Promise<void>;
    static checkRunningProcess(processId: number, user: User): Promise<RunningProcess>;
}
