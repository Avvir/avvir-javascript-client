import {AssociationIds} from "../models";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import {User} from "../utilities/get_authorization_headers";
import ApiPipeline, {ApiPipelineArgument} from "../models/api/api_pipeline";

export default class PipelineApi {
  static triggerJobStepsPipeline(associationIds: AssociationIds, body = {}, user: User): Promise<ApiPipeline> {
    let {accountId, projectId, floorId, scanDatasetId} = associationIds;
    const url = `${Http.baseUrl()}/pipeline/${accountId}/${projectId}/${floorId}/${scanDatasetId}/trigger`;
    return Http.post(url, user, body) as unknown as Promise<ApiPipeline>;
  }

  static triggerPipeline(body: ApiPipelineArgument = {}, user: User): Promise<ApiPipeline> {
    const url = `${Http.baseUrl()}/pipelines`;
    return Http.post(url, user, body) as unknown as Promise<ApiPipeline>;
  }

  static checkPipelineStatus({projectId}: AssociationIds, pipelineId: number, user: User): Promise<ApiPipeline> {
    const url = `${Http.baseUrl()}/pipelines/${pipelineId}`;
    return Http.get(url, user) as unknown as Promise<ApiPipeline>;
  }

  static getFloorPipelines({projectId, floorId}: AssociationIds, user: User): Promise<ApiPipeline[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/pipelines`;
    console.log(url);
    return Http.get(url, user) as unknown as Promise<ApiPipeline[]>;
  }

  static updatePipeLineByExternalId({projectId, floorId}: AssociationIds, externalId: string,
                                                   apiPipeline: ApiPipeline, user: User): Promise<ApiPipeline>{
    const url = `${Http.baseUrl()}/pipelines-by-external-id/${externalId}`;
    return Http.get(url, user) as unknown as Promise<ApiPipeline>;
  }
}
makeErrorsPretty(PipelineApi)
