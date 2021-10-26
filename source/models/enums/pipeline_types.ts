import ApiPipeline from "../api/api_pipeline";

export type PipelineName = "downsample-scan" |
    "convert-ifc-and-process-scans" |
    "generate-ifc" |
    "create-and-process-svf" |
    "download-and-zip-project-files-folder" |
    "pipeline-steps" |
    "ingest-external-photo-project-data" |
    "ingest-project-file" |
    "convert-e57-to-las";

export enum Pipelines {
    INGEST_PROJECT_FILE = "ingest-project-file",
    PIPELINE_STEPS = "pipeline-steps",
    DOWNSAMPLE_SCAN = "downsample-scan",
    CONVERT_IFC_AND_PROCESS_SCANS = "convert-ifc-and-process-scans",
    DOWNLOAD_AND_ZIP_PROJECT_FILES_FOLDER = "download-and-zip-project-files-folder",
    INGEST_EXTERNAL_PHOTO_PROJECT_DATA = "ingest-external-photo-project-data",
    GENERATE_IFC = "generate-ifc",
    CREATE_AND_PROCESS_SVF = "create-and-process-svf",
    CONVERT_E57_TO_LAS = "convert-e57-to-las"
}

export default Pipelines;
