import type { Vector3Like } from "./type_aliases";

export type ApiBehavioralData = {
  deviation?: Vector3Like
  cameraOrientation?: string
}

export class ApiActionPayload {
  constructor(globalId: string,
              firebaseClientAccountId: string,
              firebaseProjectId: string,
              firebaseFloorId: string,
              firebaseScanDatasetId: string,
              photoAreaId: number,
              photoSessionId: number,
              photoLocationId: number,
              scannedBuildingElementId: number,
              behavioralData: ApiBehavioralData)
  {
    this.globalId = globalId;
    this.firebaseClientAccountId = firebaseClientAccountId;
    this.firebaseProjectId = firebaseProjectId;
    this.firebaseFloorId = firebaseFloorId;
    this.firebaseScanDatasetId = firebaseScanDatasetId;
    this.photoAreaId = photoAreaId;
    this.photoSessionId = photoSessionId;
    this.photoLocationId = photoLocationId;
    this.behavioralData = behavioralData;
    this.scannedBuildingElementId = scannedBuildingElementId;
  }

  globalId?: string;
  firebaseClientAccountId?: string;
  firebaseProjectId?: string;
  firebaseFloorId?: string;
  firebaseScanDatasetId?: string;
  photoAreaId?: number;
  photoSessionId?: number;
  photoLocationId?: number;
  scannedBuildingElementId?: number;
  behavioralData?: ApiBehavioralData;
}

export default ApiActionPayload;
