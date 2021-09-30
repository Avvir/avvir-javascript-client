import { AssociationIds } from "type_aliases";
import { User } from "../utilities/get_authorization_headers";
import ApiPlannedElement from "../models/api/api_planned_element";
import DeviationStatus from "../models/enums/deviation_status";
import DetailedElement from "../models/domain/detailed_element";
import { RunningProcess } from "../models/domain/running_process";
export default class ElementApi {
    static getPlannedBuildingElements({ projectId, floorId }: AssociationIds, user: User): Promise<ApiPlannedElement[]>;
    static updateDeviationStatus({ projectId, floorId, scanDatasetId }: AssociationIds, deviationGlobalId: string, status: DeviationStatus, user: User): Promise<void>;
    static getDetailedElement({ projectId, floorId, scanDatasetId }: AssociationIds, elementGlobalId: string, user: User): Promise<DetailedElement>;
    static getDetailedElements({ projectId, floorId, scanDatasetId }: AssociationIds, user: User, viewerIds?: string[]): Promise<DetailedElement[]>;
    static updateElement({ projectId, floorId, scanDatasetId, globalId }: AssociationIds, element: DetailedElement, user: User): Promise<void>;
    static updateManyElements({ projectId, floorId, scanDatasetId }: AssociationIds, elements: DetailedElement<any>[], user: User): Promise<void>;
    static createElements({ projectId, floorId }: AssociationIds, elements: DetailedElement<any>[], user: User): Promise<void>;
    static matchPlannedBuildingElements({ projectId, floorId }: AssociationIds, matches: {
        [v1Id: string]: string;
    }, newElements: ApiPlannedElement[], user: User): Promise<RunningProcess>;
    static updatePlannedBuildingElements({ projectId, floorId }: AssociationIds, elements: ApiPlannedElement[], user: User): Promise<Response>;
}
