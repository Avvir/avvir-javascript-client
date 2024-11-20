import { addInstantGetterAndSetterToApiModel, addReadOnlyPropertiesToModel } from "../../mixins";
import ApiInspectReportEntryElement from "./api_inspect_report_entry_element";

import type ApiUser from "./api_user";
import type ApiCloudFile from "./api_cloud_file";
import type ApiView from "./api_view";
import type { DateLike, ModifyPartial } from "type_aliases";

export type ApiInspectReportEntryArgument = ModifyPartial<ApiInspectReportEntry, {
  createdAt: DateLike
  elements: Partial<ApiInspectReportEntryElement>[]
}>

export class ApiInspectReportEntry {
  constructor({
                id,
                reportId,
                name,
                view,
                screenshot,
                minimapFile,
                zoomedMinimapFile,
                elements,
                createdBy,
                createdAt,
                obstructingTrades,
                obstructedTrades
              }: ApiInspectReportEntryArgument)
  {
    addReadOnlyPropertiesToModel(this, { id, reportId, createdBy });
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
    this.name = name;
    this.view = view;
    this.screenshot = screenshot;
    this.minimapFile = minimapFile;
    this.zoomedMinimapFile = zoomedMinimapFile;
    this.elements = elements?.map(element => new ApiInspectReportEntryElement(element)) || [];
    this.obstructingTrades = obstructingTrades || [];
    this.obstructedTrades = obstructedTrades || [];
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
  obstructingTrades?: string[];
  createdAt?: number;
  createdBy?: ApiUser;
}

export default ApiInspectReportEntry;
