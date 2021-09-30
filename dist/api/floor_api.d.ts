import ApiFloor from "../models/api/api_floor";
import { User } from "../utilities/get_authorization_headers";
import { AssociationIds } from "type_aliases";
export default class FloorApi {
    static listFloorsForProject(projectId: string, user: User): Promise<ApiFloor[]>;
    static createFloor(projectId: string, floorNumber: string, user: User): Promise<ApiFloor[]>;
    static getFloor({ projectId, floorId }: AssociationIds, user: User): Promise<ApiFloor[]>;
    static updateFloor({ projectId, floorId }: AssociationIds, floor: ApiFloor, user: User): Promise<void>;
    static updateFloorOrder({ projectId, floorId }: AssociationIds, ordinal: number, user: User): Promise<void>;
    static deleteFloor({ projectId, floorId }: {
        projectId: any;
        floorId: any;
    }, user: User): Promise<ApiFloor[]>;
}
