import { AssociationIds } from "type_aliases";
import { User } from "../utilities/get_authorization_headers";
import ApiArgoResponse from "../models/api/api_argo_response";
import ApiPipeline, { ApiPipelineArgument } from "../models/api/api_pipeline";
declare class PipelineApi {
    static triggerJobStepsPipeline(associationIds: AssociationIds, body: {}, user: User): Promise<ApiArgoResponse>;
    static triggerPipeline(body: ApiPipelineArgument, user: User): Promise<ApiPipeline>;
    static checkPipelinesApi(name: any): void;
}
export default PipelineApi;
