import Masterformat from "../masterformat";
export default class ProjectMasterformatProgress {
    constructor(masterformat: any, percentComplete: any, scanDate: any);
    masterformat: Masterformat | null;
    percentComplete: number | null;
    scanDate: Date | null;
}
