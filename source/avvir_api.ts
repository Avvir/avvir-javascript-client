import PipelineApi from "./api/pipeline_api";
import ProjectApi from "./api/project_api";
import OrganizationApi from "./api/organization_api";
import Config from "./utilities/config";
import FloorApi from "./api/floor_api";
import WebGatewayApi from "./api/web_gateway_api";
import FileInformationApi from "./api/file_information_api";
import PhotoAreaApi from "./api/photo_area_api";
import ScanDatasetApi from "./api/scan_dataset_api";

export default class AvvirApi {
  static config = Config
  static pipelines = PipelineApi;
  static projects = ProjectApi;
  static organizations = OrganizationApi;
  static photos = PhotoAreaApi;
  static files = FileInformationApi;
  // static authentication =
  static scanDatasets = ScanDatasetApi;
  static floors = FloorApi;
  static other = WebGatewayApi;
}