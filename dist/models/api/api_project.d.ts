import ApiProjectCostAnalysisProgress from "./api_project_cost_analysis_progress";
import ApiProjectMasterformatProgress from "./api_project_masterformat_progress";
import SystemOfMeasurement from "../enums/system_of_measurement";
import { DateLike, Modify } from "type_aliases";
interface ApiProjectArgument extends Partial<Modify<ApiProject, {
    archivedAt?: DateLike;
    startDate?: DateLike;
    endDate?: DateLike;
}>> {
}
declare class ApiProject {
    constructor({ city, country, addressLine1, addressLine2, state, zip, defaultFirebaseFloorId, archivedAt, progressNotes, avvirAnalysisNotes, endDate, firebaseId, name, notes, pricing, sourceAnalysisNotes, startDate, systemOfMeasurement, id, clientAccountId, scannedProjectMasterformatProgresses, scheduledProjectMasterformatProgresses, costAnalysisProgresses, firebaseFloorIds }?: ApiProjectArgument);
    readonly id: number;
    readonly firebaseId: string;
    readonly clientAccountId: string;
    name: string;
    scannedProjectMasterformatProgresses: Array<ApiProjectMasterformatProgress>;
    scheduledProjectMasterformatProgresses: Array<ApiProjectMasterformatProgress>;
    costAnalysisProgresses: Array<ApiProjectCostAnalysisProgress>;
    defaultFirebaseFloorId: string | null;
    firebaseFloorIds: string[];
    addressLine1: string | null;
    addressLine2: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    zip: string | null;
    pricing: string | null;
    notes: string | null;
    startDate: number | null;
    endDate: number | null;
    archivedAt: number | null;
    systemOfMeasurement: SystemOfMeasurement;
    progressNotes: string | null;
    avvirAnalysisNotes: string | null;
    sourceAnalysisNotes: string | null;
}
export default ApiProject;
