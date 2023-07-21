import AuthApi from "./api/auth_api";
import Config from "./config";
import CommentApi from "./api/comment_api";
import ElementApi from "./api/element_api";
import FileInformationApi from "./api/file_information_api";
import FloorApi from "./api/floor_api";
import IntegrationsApi from "./api/integrations_api";
import OrganizationApi from "./api/organization_api";
import PhotoAreaApi from "./api/photo_area_api";
import PipelineApi from "./api/pipeline_api";
import ProjectApi from "./api/project_api";
import ProjectSummaryApi from "./api/project_summary_api";
import ReportApi from "./api/report_api";
import ScanDatasetApi from "./api/scan_dataset_api";
import WebGatewayApi from "./api/web_gateway_api";
import UserApi from "./api/user_api";
import {GroupApi, WebRpcApi, RecipeApi} from "./api";

export default {
    auth: AuthApi,
    config: Config,
    comments: CommentApi,
    elements: ElementApi,
    files: FileInformationApi,
    floors: FloorApi,
    groups: GroupApi,
    integrations: IntegrationsApi,
    organizations: OrganizationApi,
    photos: PhotoAreaApi,
    pipelines: PipelineApi,
    projects: ProjectApi,
    projectSummary: ProjectSummaryApi,
    recipes: RecipeApi,
    reports: ReportApi,
    scanDatasets: ScanDatasetApi,
    other: WebGatewayApi,
    webRpcApi: WebRpcApi,
    user: UserApi,
}
