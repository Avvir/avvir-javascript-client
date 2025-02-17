import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";
import ApiProjectReport, { ApiProjectReportArgument } from "./api_project_report";
import SystemOfMeasurement, { IMPERIAL } from "../enums/system_of_measurement";

import type ApiProjectCostAnalysisProgress from "./api_project_cost_analysis_progress";
import type ApiTeamMember from "./api_team_member";
import type ApiMasterformatProgress from "./api_masterformat_progress";
import type ApiProjectSettings from "./api_project_settings";
import type { DateLike, ModifyPartial } from "type_aliases";

export type ApiProjectArgument = ModifyPartial<ApiProject, {
  archivedAt: DateLike
  startDate: DateLike
  endDate: DateLike
  projectReports: ApiProjectReportArgument[]
}>

export class ApiProject {
  constructor({
                city,
                country,
                addressLine1,
                addressLine2,
                state,
                zip,
                defaultFirebaseFloorId,
                archivedAt,
                progressNotes,
                avvirAnalysisNotes,
                endDate,
                firebaseId,
                name,
                notes,
                pricing,
                sourceAnalysisNotes,
                startDate,
                systemOfMeasurement,
                id,
                clientAccountId,
                scannedProjectMasterformatProgresses,
                baselineProjectMasterformatProgresses,
                currentProjectMasterformatProgresses,
                costAnalysisProgresses,
                projectReports,
                firebaseFloorIds,
                generateMasterformatProgressEnabled,
                teamMembers,
                integrationProjectId,
                settings,
                baselineScheduleDate,
                currentScheduleDate
              }: ApiProjectArgument = {})
  {
    addInstantGetterAndSetterToApiModel(this, "startDate", startDate);
    addInstantGetterAndSetterToApiModel(this, "endDate", endDate);
    addInstantGetterAndSetterToApiModel(this, "archivedAt", archivedAt);

    addReadOnlyPropertiesToModel(this, { firebaseId, clientAccountId, id });

    this.firebaseFloorIds = firebaseFloorIds || [];
    this.defaultFirebaseFloorId = defaultFirebaseFloorId || null;
    this.city = city || null;
    this.country = country || null;
    this.addressLine1 = addressLine1 || null;
    this.addressLine2 = addressLine2 || null;
    this.state = state || null;
    this.zip = zip || null;
    this.name = name || null;
    this.notes = notes || null;
    this.pricing = pricing || null;
    this.progressNotes = progressNotes || null;
    this.avvirAnalysisNotes = avvirAnalysisNotes || null;
    this.sourceAnalysisNotes = sourceAnalysisNotes || null;
    this.scannedProjectMasterformatProgresses = scannedProjectMasterformatProgresses || [];
    this.baselineProjectMasterformatProgresses = baselineProjectMasterformatProgresses || [];
    this.currentProjectMasterformatProgresses = currentProjectMasterformatProgresses || [];
    this.costAnalysisProgresses = costAnalysisProgresses || [];
    this.projectReports = projectReports?.map(report => new ApiProjectReport(report)) || [];

    this.systemOfMeasurement = systemOfMeasurement || IMPERIAL;
    this.generateMasterformatProgressEnabled = generateMasterformatProgressEnabled;
    this.integrationProjectId = integrationProjectId;
    this.teamMembers = teamMembers;
    this.settings = settings;
    this.baselineScheduleDate = baselineScheduleDate;
    this.currentScheduleDate = currentScheduleDate;
  }

  readonly id: number;
  readonly firebaseId: string;
  readonly clientAccountId: string;
  name: string;
  scannedProjectMasterformatProgresses: ApiMasterformatProgress[];
  baselineProjectMasterformatProgresses: ApiMasterformatProgress[];
  currentProjectMasterformatProgresses: ApiMasterformatProgress[];
  costAnalysisProgresses: ApiProjectCostAnalysisProgress[];
  projectReports: ApiProjectReport[];
  defaultFirebaseFloorId: string | null = null;
  firebaseFloorIds: string[] = [];
  addressLine1: string | null = null;
  addressLine2: string | null = null;
  city: string | null = null;
  state: string | null = null;
  country: string | null = null;
  zip: string | null = null;
  pricing: string | null = null;
  notes: string | null = null;
  startDate: number | null = null;
  endDate: number | null = null;
  archivedAt: number | null = null;
  systemOfMeasurement: SystemOfMeasurement = IMPERIAL;
  progressNotes: string | null = null;
  avvirAnalysisNotes: string | null = null;
  sourceAnalysisNotes: string | null = null;
  generateMasterformatProgressEnabled: boolean | null;
  integrationProjectId?: number;
  teamMembers?: ApiTeamMember[] = [];
  settings?: ApiProjectSettings;
  baselineScheduleDate?: Date;
  currentScheduleDate?: Date;
}

export default ApiProject;
