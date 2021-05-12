import AuthApi from "./api/auth_api";
import Config from "./config";
import ElementApi from "./api/element_api";
import FileInformationApi from "./api/file_information_api";
import FloorApi from "./api/floor_api";
import OrganizationApi from "./api/organization_api";
import PhotoAreaApi from "./api/photo_area_api";
import PipelineApi from "./api/pipeline_api";
import ProjectApi from "./api/project_api";
import ScanDatasetApi from "./api/scan_dataset_api";
import WebGatewayApi from "./api/web_gateway_api";

export default {
   auth: AuthApi,
   config: Config,
   elements: ElementApi,
   files: FileInformationApi,
   floors: FloorApi,
   organizations: OrganizationApi,
   photos: PhotoAreaApi,
   pipelines: PipelineApi,
   projects: ProjectApi,
   scanDatasets: ScanDatasetApi,
   other: WebGatewayApi,
}
