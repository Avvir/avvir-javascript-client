import Config from "./config";
import * as Api from "./api";

export default {
  auth: Api.AuthApi,
  config: Config,
  comments: Api.CommentApi,
  elements: Api.ElementApi,
  files: Api.FileInformationApi,
  floors: Api.FloorApi,
  groups: Api.GroupApi,
  integrations: Api.IntegrationsApi,
  organizations: Api.OrganizationApi,
  photos: Api.PhotoAreaApi,
  pipelines: Api.PipelineApi,
  projects: Api.ProjectApi,
  projectSummary: Api.ProjectSummaryApi,
  recipes: Api.RecipeApi,
  reports: Api.ReportApi,
  scanDatasets: Api.ScanDatasetApi,
  other: Api.WebGatewayApi,
  webRpcApi: Api.WebRpcApi,
  user: Api.UserApi,
};
