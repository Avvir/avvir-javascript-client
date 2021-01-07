import PipelineApi from "./pipeline_api";
import ProjectApi from "./project_api";
import OrganizationApi from "./organization_api";
import Config from "./config";
import FloorApi from "./floor_api";
import WebGatewayApi from "./web_gateway_api";
import FileInformationApi from "./file_information_api";
import PhotoAreaApi from "./photo_area_api";
import ScanDatasetApi from "./scan_dataset_api";

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