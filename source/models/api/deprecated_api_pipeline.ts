/**
 * @deprecated use {@link ApiPipeline} instead
 */
export class DeprecatedApiPipeline {
  workflowName: string;
  startTime: number;
  status: "running" | "complete";
}

export default DeprecatedApiPipeline;
