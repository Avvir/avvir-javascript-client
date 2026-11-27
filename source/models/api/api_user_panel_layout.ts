import {addInstantGetterAndSetterToApiModel} from "../../mixins";

export type PanelLayoutMode = "fullBim" | "bimPrep" | "qualityControlBim" | "monitorBim";

/** A layout as a JSON object; `length?: never` rejects arrays. */
export type PanelLayoutJson = { [key: string]: any } & { length?: never };

export class ApiUserPanelLayout {
  pageName: string;
  mode: PanelLayoutMode;
  layout: PanelLayoutJson;
  layoutVersion: number;
  updatedAt: number | null;

  constructor({pageName, mode, layout, layoutVersion, updatedAt}: Partial<ApiUserPanelLayout> = {}) {
    this.pageName = pageName;
    this.mode = mode;
    this.layout = layout;
    this.layoutVersion = layoutVersion;
    addInstantGetterAndSetterToApiModel(this, "updatedAt", updatedAt);
  }
}
