import {addInstantGetterAndSetterToApiModel, addReadOnlyPropertiesToModel} from "../../mixins";
import ApiUser from "./api_user";
import ApiCloudFile from "./api_cloud_file";
import ApiView from "./api_view";
import {ApiInspectReportEntryElement} from "./api_inspect_report_entry_element";

export class ApiInspectReportEntry {
    constructor({ id, reportId, name, view, screenshot, minimapFile, zoomedMinimapFile, elements, createdBy, createdAt, obstructingTrades, obstructedTrades }: Partial<ApiInspectReportEntry>) {
        addReadOnlyPropertiesToModel(this, { id, reportId, createdBy });
        addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
        this.name = name;
        this.view = view;
        this.screenshot = screenshot;
        this.minimapFile = minimapFile;
        this.zoomedMinimapFile = zoomedMinimapFile;
        this.elements = elements;
        this.obstructingTrades = obstructingTrades;
        this.obstructedTrades = obstructedTrades;
    }
    readonly id: number;
    readonly reportId: number;
    name: string;
    view: ApiView;
    screenshot: ApiCloudFile;
    minimapFile: ApiCloudFile;
    zoomedMinimapFile: ApiCloudFile;
    elements: ApiInspectReportEntryElement[];
    obstructedTrades?: string[];
    obstructingTrades?: string[]
    createdAt?: number;
    createdBy?: ApiUser;
}