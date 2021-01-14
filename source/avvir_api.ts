import PipelineApi from "./api/pipeline_api";
import ProjectApi from "./api/project_api";
import OrganizationApi from "./api/organization_api";
import Config from "./utilities/config";
import FloorApi from "./api/floor_api";
import WebGatewayApi from "./api/web_gateway_api";
import FileInformationApi from "./api/file_information_api";
import PhotoAreaApi from "./api/photo_area_api";
import ScanDatasetApi from "./api/scan_dataset_api";
import AuthApi from "./api/auth_api";

export default {
   config: Config,
   pipelines: PipelineApi,
   projects: ProjectApi,
   organizations: OrganizationApi,
   photos: PhotoAreaApi,
   files: FileInformationApi,
   scanDatasets: ScanDatasetApi,
   floors: FloorApi,
   auth: AuthApi,
   other: WebGatewayApi,
}
