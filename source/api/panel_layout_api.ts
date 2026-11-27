import {ApiUserPanelLayout, PanelLayoutJson, PanelLayoutMode} from "../models";
import Http from "../utilities/http";
import type {User} from "../models";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import checkFetchStatus from "../utilities/check_fetch_status";

export default class PanelLayoutApi {
  /** Returns the user's saved layout for each mode they customized. */
  static getPanelLayouts(user: User): Promise<ApiUserPanelLayout[]> {
    const url = `${Http.baseUrl()}/users/accounts/self/panel-layouts`;
    // Parses the response here so each layout can be built as an ApiUserPanelLayout.
    return Http.get(url, user)
      .then((response) => checkFetchStatus<Partial<ApiUserPanelLayout>[]>(response))
      .then((panelLayouts) => panelLayouts.map((panelLayout) => new ApiUserPanelLayout(panelLayout)));
  }

  static savePanelLayout(mode: PanelLayoutMode, layout: PanelLayoutJson, layoutVersion: number, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/users/accounts/self/panel-layouts/${mode}`;
    return Http.put(url, user, {layout, layoutVersion}) as unknown as Promise<void>;
  }

  static resetPanelLayout(mode: PanelLayoutMode, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/users/accounts/self/panel-layouts/${mode}`;
    return Http.delete(url, user) as unknown as Promise<void>;
  }
}

makeErrorsPretty(PanelLayoutApi);
