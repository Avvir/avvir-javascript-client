import checkFetchStatus from "./check_fetch_status";
import getAuthorizationHeaders, { User } from "./get_authorization_headers";
import getErrorCallback from "./get_error_callback";
import pipelineTriggerFailed, { PipelineTriggerFailedEvent } from "../../events/superadmin/pipelines/pipeline_trigger_failed";
import WebGatewayApi from "./web_gateway_api";
import { AssociationIds, Dispatch } from "type_aliases";
import { httpPostHeaders } from "./request_headers";

export default class PipelineApi {
  static triggerPipeline({ accountId, projectId, floorId, scanDatasetId }: AssociationIds, extraMetadata = {}, user: User, dispatch: Dispatch<PipelineTriggerFailedEvent>) {
    const url = `${WebGatewayApi.baseUrl}/pipeline/${accountId}/${projectId}/${floorId}/${scanDatasetId}/trigger`;
    return (fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(extraMetadata)
    }).then(checkFetchStatus) as Promise<any>)
      .catch(getErrorCallback(dispatch))
      .catch((error) => {
        dispatch(pipelineTriggerFailed({ floorId, scanDatasetId }));
        throw error;
      });
  }
}

