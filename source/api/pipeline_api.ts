import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";

import type { ApiPipeline, ApiPipelineArgument, User } from "../models";
import type { AssociationIds } from "type_aliases";

export default class PipelineApi {
  static triggerPipeline(body: ApiPipelineArgument = {}, user: User): Promise<ApiPipeline> {
    const url = `${Http.baseUrl()}/pipelines`;
    return Http.post(url, user, body) as unknown as Promise<ApiPipeline>;
  }

  static checkPipelineStatus({ projectId }: AssociationIds, pipelineId: number, user: User): Promise<ApiPipeline> {
    const url = `${Http.baseUrl()}/pipelines/${pipelineId}`;
    return Http.get(url, user) as unknown as Promise<ApiPipeline>;
  }

  static getFloorPipelines({ projectId, floorId }: AssociationIds, user: User): Promise<ApiPipeline[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/pipelines`;
    console.log(url);
    return Http.get(url, user) as unknown as Promise<ApiPipeline[]>;
  }
}

makeErrorsPretty(PipelineApi);
