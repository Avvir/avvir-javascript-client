import checkFetchStatus from "./check_fetch_status";
import getAuthorizationHeaders, { User } from "./get_authorization_headers";
import WebGatewayApi from "./web_gateway_api";
import { AssociationIds } from "type_aliases";
import { httpPostHeaders } from "./request_headers";
import Config from "./config";

export default class PipelineApi {
  static triggerPipeline({ accountId, projectId, floorId, scanDatasetId }: AssociationIds, extraMetadata = {}, user: User) {
    const url = `${WebGatewayApi.baseUrl}/pipeline/${accountId}/${projectId}/${floorId}/${scanDatasetId}/trigger`;
    return (fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(extraMetadata)
    }).then(checkFetchStatus) as Promise<any>)
      .catch(Config.sharedErrorHandler);
  }
}

