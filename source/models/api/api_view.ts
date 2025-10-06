import { Vector3 } from "three";

import addDateGetterAndSetterToDomainModel from "../../mixins/add_date_getter_and_setter_to_domain_model";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";

import type SystemOfMeasurement from "../enums/system_of_measurement";
import type { ApiInspectionModes } from "../enums";
import type { DateLike, ModifyPartial, Vector3Like } from "type_aliases";
import type { UniformatId } from "uniformat";

export class PhotoViewerDetails {
  constructor(photoViewerDetails: Partial<PhotoViewerDetails> = {}) {
    if (photoViewerDetails) {
      const { photoSessionId, photoLocationId, photoSessionIds } = photoViewerDetails;
      this.photoSessionId = photoSessionId;
      this.photoLocationId = photoLocationId;
      this.photoSessionIds = photoSessionIds || [];
    }
  }

  photoSessionId: number;
  photoLocationId: number;
  photoSessionIds: number[];
}

export class DeviationTolerance {
  constructor(tolerance: Partial<DeviationTolerance> = {}) {
    if (tolerance) {
      const { value, systemOfMeasurement } = tolerance;
      this.value = value;
      this.systemOfMeasurement = systemOfMeasurement;
    }
  }

  value: number;
  systemOfMeasurement: SystemOfMeasurement;
}

export class ViewTrades {
  constructor(trades: Partial<ViewTrades> = {}) {
    if (trades) {
      const { shownUniformatCodes } = trades;
      this.shownUniformatCodes = shownUniformatCodes;
    }
  }

  shownUniformatCodes: UniformatId[];
}

export type ViewCameraArgument = ModifyPartial<ViewCamera, { position: Vector3Like, target: Vector3Like }>

export class ViewCamera {
  constructor(camera: ViewCameraArgument = {}) {
    if (camera) {
      const { position, target } = camera;
      this.position = new Vector3(position?.x, position?.y, position?.z);
      this.target = new Vector3(target?.x, target?.y, target?.z);
    }
  }

  position: Vector3;
  target: Vector3;
}

export type ViewFiltersArgument = ModifyPartial<ViewFilters, {
  trades: Partial<ViewTrades>,
  deviationTolerance: Partial<DeviationTolerance>
}>

export class ViewFilters {
  constructor(filters: ViewFiltersArgument = {}) {
    if (filters) {
      const { trades, deviationTolerance, pointCloudVisible, sectionPointCloud } = filters;
      this.trades = new ViewTrades(trades);
      this.deviationTolerance = new DeviationTolerance(deviationTolerance);
      this.pointCloudVisible = pointCloudVisible;
      this.sectionPointCloud = sectionPointCloud;
    } else {
      this.trades = new ViewTrades();
      this.deviationTolerance = new DeviationTolerance();
    }
  }

  trades: ViewTrades;
  deviationTolerance: DeviationTolerance;
  pointCloudVisible: boolean;
  sectionPointCloud: boolean;
}

export type SelectedElements = string[]
export type ViewAttributesArgument = ModifyPartial<ViewAttributes, {
  camera: ViewCameraArgument
  filters: ViewFiltersArgument
  photoViewerDetails: Partial<PhotoViewerDetails>
}>

export class ViewAttributes {
  constructor(attributes: ViewAttributesArgument = {}) {
    if (attributes) {
      const { camera, filters, selectedElements, inspectionMode, photoViewerDetails } = attributes;
      this.camera = new ViewCamera(camera);
      this.filters = new ViewFilters(filters);
      this.selectedElements = selectedElements || [];
      this.inspectionMode = inspectionMode;
      this.photoViewerDetails = new PhotoViewerDetails(photoViewerDetails);
    } else {
      this.camera = new ViewCamera();
      this.filters = new ViewFilters();
      this.selectedElements = [];
      this.photoViewerDetails = new PhotoViewerDetails();
    }
  }

  camera: ViewCamera;
  filters: ViewFilters;
  selectedElements: SelectedElements;
  inspectionMode: ApiInspectionModes;
  photoViewerDetails: PhotoViewerDetails;
}

export type ApiViewArgument = ModifyPartial<ApiView, {
  viewAttributes: ViewAttributesArgument,
  createdAt: DateLike
}>

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
              }: ApiViewArgument)
  {
    addReadOnlyPropertiesToModel(this, { id, firebaseProjectId, firebaseFloorId, firebaseScanDatasetId, createdBy });
    addDateGetterAndSetterToDomainModel(this, "createdAt", createdAt);
    this.viewAttributes = new ViewAttributes(viewAttributes);
    this.commentThreadIds = commentThreadIds;
  }

  readonly id: number;
  readonly firebaseProjectId: string;
  readonly firebaseFloorId: string;
  readonly firebaseScanDatasetId: string;
  viewAttributes: ViewAttributes;
  readonly createdBy: string;
  createdAt: Date;
  commentThreadIds: number[];
}

export default ApiView;
