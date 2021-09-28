import ApiPipeline from "../api/api_pipeline";

export type PipelineName = "downsample-scan" |
    "convert-ifc-and-process-scans" |
    "generate-ifc" |
    "create-and-process-svf" |
    "download-and-zip-project-files-folder" |
    "pipeline-steps" |
    "ingest-external-photo-project-data" |
    "ingest-project-file";

export enum Pipelines {
    INGEST_PROJECT_FILE = "ingest-project-file",
    PIPELINE_STEPS = "pipeline-steps"
}

export default Pipelines;
