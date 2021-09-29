import ApiMasterformat from "./api_masterformat";
import { DateLike } from "type_aliases";
export default class ApiProjectMasterformatProgress {
    constructor(masterformat?: ApiMasterformat, percentComplete?: number, scanDate?: DateLike);
    masterformat: ApiMasterformat | null;
    percentComplete: number | null;
    scanDate: number | null;
}
