// @ts-nocheck
import ApiFloor from "../models/api/api_floor";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import {ApiMasterformatProgress, ApiRunningProcess, AssociationIds, ProgressType} from "../models";
import { User } from "../utilities/get_authorization_headers";
import {ApiPlannedElement} from "../models";
import {DateConverter} from "../converters";
import {DateLike} from "type_aliases";
import FloorFileDeletionModeConverter from "../converters/floor_file_deletion_mode_converter";

export default class FloorApi {
  static listFloorsForProject(projectId: string, user: User): Promise<ApiFloor[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors`;
    return Http.get(url, user);
  }

  static createFloor(projectId: string, floorNumber: string, user: User): Promise<ApiFloor> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors`;
    return Http.post(url, user, { text: floorNumber });
  }

  static getFloor({ projectId, floorId }: AssociationIds, user: User): Promise<ApiFloor> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}`;
    return Http.get(url, user);
  }

  static updateFloor({ projectId, floorId }: AssociationIds, floor: ApiFloor, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}`;
    return Http.patch(url, user, floor);
  }

  static reorderFloors({ projectId }: AssociationIds, floorIds: string[], user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/reorder-floors`;
    return Http.post(url, user, floorIds);
  }

  static deleteFloor({ projectId, floorId, deletionModeSelection }, user: User): Promise<void> {
    let query: any;
    if (deletionModeSelection && typeof deletionModeSelection === "string" && deletionModeSelection != "") {
      query = `?deletionModeSelection=${FloorFileDeletionModeConverter.toApiFloorFileDeletionMode(deletionModeSelection)}`;
    } else {
      query = "";
    }
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}${query}`;
    return Http.delete(url, user);
  }

  static updatePlannedBuildingElements({ projectId, floorId }: AssociationIds, elements: ApiPlannedElement[], user: User, validate?: boolean) {
    return Http.patch(`${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements?validate=${!!validate}`, user, elements)
  }

  static getMasterformatProgress({ projectId, floorId }: AssociationIds,
                                 scheduleType: ProgressType,
                                 user: User): Promise<ApiMasterformatProgress[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/masterformat-progresses/${scheduleType}`;
    return Http.get(url, user) as unknown as Promise<ApiMasterformatProgress[]>;
  }

  static setMasterformatProgress({ projectId, floorId }: AssociationIds,
                                 scheduleType: ProgressType,
                                 masterformatProgresses: ApiMasterformatProgress[],
                                 user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/masterformat-progresses/${scheduleType}`;
    return Http.post(url, user, masterformatProgresses) as unknown as Promise<void>;
  }

  static generateMasterformatProgress({ projectId, floorId }: AssociationIds,
                                      reportDate: DateLike,
                                      masterformatVersion: number,
                                      user: User): Promise<ApiRunningProcess> {
    const formattedDate = DateConverter.dateToISO(reportDate);
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/generate-masterformat-progress?masterformatVersion=${masterformatVersion}&reportDate=${formattedDate}`;
    return Http.post(url, user) as unknown as Promise<ApiRunningProcess>;
  }

}

makeErrorsPretty(FloorApi);
