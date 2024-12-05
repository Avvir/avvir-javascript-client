export class ApiElementProgress {
  projectId: number;
  elementId: number;
  scanDatasetId: number;
  progress: number;

  constructor(elementProgress: Partial<ApiElementProgress>) {
    this.projectId = elementProgress.projectId;
    this.elementId = elementProgress.elementId;
    this.scanDatasetId = elementProgress.scanDatasetId;
    this.progress = elementProgress.progress;
  }
}
