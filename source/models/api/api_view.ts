import {Vector3} from "three";
import {DateLike, ModifyPartial, Vector3Like} from "./type_aliases";
import addDateGetterAndSetterToDomainModel from "../../mixins/add_date_getter_and_setter_to_domain_model";
import {UniformatId} from "uniformat";
import {ApiInspectionModes} from "../enums";
import SystemOfMeasurement from "../enums/system_of_measurement";

export class PhotoViewerDetails {
  constructor(photoViewerDetails: Partial<PhotoViewerDetails> = {}) {
    const {photoSessionId, photoLocationId, photoSessionIds} = photoViewerDetails;
    this.photoSessionId = photoSessionId;
    this.photoLocationId = photoLocationId;
    this.photoSessionIds = photoSessionIds || [];
  }

  photoSessionId: number;
  photoLocationId: number;
  photoSessionIds: number[];
}

export class DeviationTolerance {
  constructor(tolerance: Partial<DeviationTolerance> = {}) {
    const {value, systemOfMeasurement} = tolerance;
    this.value = value;
    this.systemOfMeasurement = systemOfMeasurement;
  }

  value: number;
  systemOfMeasurement: SystemOfMeasurement
}

export class ViewTrades {
  constructor(trades: Partial<ViewTrades> = {}) {
    const {shownUniformatCodes} = trades;
    this.shownUniformatCodes = shownUniformatCodes;
  }

  shownUniformatCodes: UniformatId[];
}

export type ViewCameraParameter = ModifyPartial<ViewCamera, { position: Vector3Like, target: Vector3Like }>

export class ViewCamera {
  constructor(camera: ViewCameraParameter = {}) {
    const {position, target} = camera;
    this.position = new Vector3(position?.x, position?.y, position?.z);
    this.target = new Vector3(target?.x, target?.y, target?.z);
  }

  position: Vector3;
  target: Vector3;
}

export class ViewFilters {
  constructor(filters: Partial<ViewFilters> = {}) {
    const {trades, deviationTolerance, pointCloudVisible, sectionPointCloud} = filters;
    this.trades = new ViewTrades(trades);
    this.deviationTolerance = new DeviationTolerance(deviationTolerance);
    this.pointCloudVisible = pointCloudVisible;
    this.sectionPointCloud = sectionPointCloud;
  }

  trades: ViewTrades;
  deviationTolerance: DeviationTolerance;
  pointCloudVisible: boolean;
  sectionPointCloud: boolean;
}

export type SelectedElements = string[]
export type ViewAttributesParameter = ModifyPartial<ViewAttributes, { camera: ViewCameraParameter }>

export class ViewAttributes {
  constructor(attributes: ViewAttributesParameter = {}) {
    const {camera, filters, selectedElements, inspectionMode, photoViewerDetails} = attributes;
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

export type ViewParameter = ModifyPartial<ApiView, { viewAttributes: ViewAttributesParameter, createdAt: DateLike }>

export class ApiView {
  constructor({
                id,
                firebaseProjectId,
                firebaseFloorId,
                firebaseScanDatasetId,
                viewAttributes,
                createdBy,
                createdAt,
                commentThreadIds
              }: ViewParameter) {
    addDateGetterAndSetterToDomainModel(this, "createdAt", createdAt);
    this.id = id;
    this.firebaseProjectId = firebaseProjectId;
    this.firebaseFloorId = firebaseFloorId;
    this.firebaseScanDatasetId = firebaseScanDatasetId;
    this.viewAttributes = new ViewAttributes(viewAttributes);
    this.createdBy = createdBy;
    this.commentThreadIds = commentThreadIds;
  }

  id: number;
  firebaseProjectId: string;
  firebaseFloorId: string;
  firebaseScanDatasetId: string;
  viewAttributes: ViewAttributes;
  createdBy: string;
  createdAt: Date;
  commentThreadIds: number[];
}

export default ApiView;
