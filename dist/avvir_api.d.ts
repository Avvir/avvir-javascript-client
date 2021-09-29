import AuthApi from "./api/auth_api";
import ElementApi from "./api/element_api";
import FileInformationApi from "./api/file_information_api";
import FloorApi from "./api/floor_api";
import PhotoAreaApi from "./api/photo_area_api";
import PipelineApi from "./api/pipeline_api";
import ScanDatasetApi from "./api/scan_dataset_api";
import WebGatewayApi from "./api/web_gateway_api";
declare const _default: {
    auth: typeof AuthApi;
    config: {
        useAcceptanceConfiguration: () => void;
        useProductionConfiguration: () => void;
        useLocalProductionConfiguration: () => void;
        useLocalConfiguration: () => void;
        getConfiguration: () => {
            [key: string]: any;
        };
        sharedErrorHandler: ({ error }: any) => never;
    };
    elements: typeof ElementApi;
    files: typeof FileInformationApi;
    floors: typeof FloorApi;
    organizations: any;
    photos: typeof PhotoAreaApi;
    pipelines: typeof PipelineApi;
    projects: any;
    scanDatasets: typeof ScanDatasetApi;
    other: typeof WebGatewayApi;
};
export default _default;
