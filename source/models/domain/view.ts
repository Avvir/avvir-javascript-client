import THREE from "three";
import { DateLike, ModifyPartial, Vector3Like } from "type_aliases";
import addDateGetterAndSetterToDomainModel from "../../mixins/add_date_getter_and_setter_to_domain_model";
import { UniformatId } from "uniformat";
import { ApiInspectionModes } from "../enums/inspection_modes";
import SystemOfMeasurement from "../enums/system_of_measurement";

export class DeviationTolerance {
    constructor(tolerance: Partial<DeviationTolerance> = {}) {
        const { value, systemOfMeasurement } = tolerance;
        this.value = value;
        this.systemOfMeasurement = systemOfMeasurement;
    }

    value: number;
    systemOfMeasurement: SystemOfMeasurement
}

class ViewTrades {
    constructor(trades: Partial<ViewTrades> = {}) {
        const { shownUniformatCodes } = trades;
        this.shownUniformatCodes = shownUniformatCodes;
    }

    shownUniformatCodes: UniformatId[];
}

type ViewCameraParameter = ModifyPartial<ViewCamera, { position: Vector3Like, target: Vector3Like }>

class ViewCamera {
    constructor(camera: ViewCameraParameter = {}) {
        const { position, target } = camera;
        this.position = new THREE.Vector3(position?.x, position?.y, position?.z);
        this.target = new THREE.Vector3(target?.x, target?.y, target?.z);
    }

    position: THREE.Vector3;
    target: THREE.Vector3;
}

class ViewFilters {
    constructor(filters: Partial<ViewFilters> = {}) {
        const { trades, deviationTolerance } = filters;
        this.trades = new ViewTrades(trades);
        this.deviationTolerance = new DeviationTolerance(deviationTolerance);
    }

    trades: ViewTrades;
    deviationTolerance: DeviationTolerance;
}
type SelectedElements = string[]
type ViewAttributesParameter = ModifyPartial<ViewAttributes, { camera: ViewCameraParameter }>

export class ViewAttributes {
    constructor(attributes: ViewAttributesParameter = {}) {
        const { camera, filters, selectedElements, inspectionMode } = attributes;
        this.camera = new ViewCamera(camera);
        this.filters = new ViewFilters(filters);
        this.selectedElements = selectedElements;
        this.inspectionMode = inspectionMode;
    }

    camera: ViewCamera;
    filters: ViewFilters;
    selectedElements: SelectedElements;
    inspectionMode: ApiInspectionModes;
}

export type ViewParameter = ModifyPartial<View, { viewAttributes: ViewAttributesParameter, createdAt: DateLike }>

export default class View {
    constructor(view: ViewParameter = {}) {
        const { id, firebaseProjectId, firebaseFloorId, firebaseScanDatasetId, viewAttributes, createdBy, createdAt } = view;
        addDateGetterAndSetterToDomainModel(this, "createdAt");
        this.id = id;
        this.firebaseProjectId = firebaseProjectId;
        this.firebaseFloorId = firebaseFloorId;
        this.firebaseScanDatasetId = firebaseScanDatasetId;
        this.viewAttributes = new ViewAttributes(viewAttributes);
        this.createdBy = createdBy;
        // @ts-ignore
        this.createdAt = createdAt;
    }

    id: number;
    firebaseProjectId: string;
    firebaseFloorId: string;
    firebaseScanDatasetId: string;
    viewAttributes: ViewAttributes;
    createdBy: string;
    createdAt: Date;
}
