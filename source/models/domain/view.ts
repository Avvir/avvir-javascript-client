import { Vector3 } from "three";
import { DateLike, ModifyPartial, Vector3Like } from "type_aliases";
import addDateGetterAndSetterToDomainModel from "../../mixins/add_date_getter_and_setter_to_domain_model";
import { UniformatId } from "uniformat";
import { ApiInspectionModes } from "../enums";
import SystemOfMeasurement from "../enums/system_of_measurement";

export class PhotoViewerDetails {
    constructor(photoViewerDetails: Partial<PhotoViewerDetails> = {}) {
        const { photoSessionId, photoLocationId } = photoViewerDetails;
        this.photoSessionId = photoSessionId;
        this.photoLocationId = photoLocationId;
    }

    photoSessionId: number;
    photoLocationId: number;
}

export class DeviationTolerance {
    constructor(tolerance: Partial<DeviationTolerance> = {}) {
        const { value, systemOfMeasurement } = tolerance;
        this.value = value;
        this.systemOfMeasurement = systemOfMeasurement;
    }

    value: number;
    systemOfMeasurement: SystemOfMeasurement
}

export class ViewTrades {
    constructor(trades: Partial<ViewTrades> = {}) {
        const { shownUniformatCodes } = trades;
        this.shownUniformatCodes = shownUniformatCodes;
    }

    shownUniformatCodes: UniformatId[];
}

export type ViewCameraParameter = ModifyPartial<ViewCamera, { position: Vector3Like, target: Vector3Like }>

export class ViewCamera {
    constructor(camera: ViewCameraParameter = {}) {
        const { position, target } = camera;
        this.position = new Vector3(position?.x, position?.y, position?.z);
        this.target = new Vector3(target?.x, target?.y, target?.z);
    }

    position: Vector3;
    target: Vector3;
}

export class ViewFilters {
    constructor(filters: Partial<ViewFilters> = {}) {
        const { trades, deviationTolerance } = filters;
        this.trades = new ViewTrades(trades);
        this.deviationTolerance = new DeviationTolerance(deviationTolerance);
    }

    trades: ViewTrades;
    deviationTolerance: DeviationTolerance;
}
export type SelectedElements = string[]
export type ViewAttributesParameter = ModifyPartial<ViewAttributes, { camera: ViewCameraParameter }>

export class ViewAttributes {
    constructor(attributes: ViewAttributesParameter = {}) {
        const { camera, filters, selectedElements, inspectionMode, photoViewerDetails } = attributes;
        this.camera = new ViewCamera(camera);
        this.filters = new ViewFilters(filters);
        this.selectedElements = selectedElements;
        this.inspectionMode = inspectionMode;
        this.photoViewerDetails = photoViewerDetails;
    }

    camera: ViewCamera;
    filters: ViewFilters;
    selectedElements: SelectedElements;
    inspectionMode: ApiInspectionModes;
    photoViewerDetails: PhotoViewerDetails;
}

export type ViewParameter = ModifyPartial<View, { viewAttributes: ViewAttributesParameter, createdAt: DateLike }>
export class View {
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

export default View;