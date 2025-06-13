import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import ApiMasterformat from "./api_masterformat";
import {DateLike} from "type_aliases";
import {ProgressType} from "../enums";

export type ApiMasterformatProgressArgument = Partial<ApiMasterformatProgress>;

export class ApiMasterformatProgress {
    constructor({
                    masterformat,
                    percentComplete,
                    scanDate,
                    createdAt,
                    customTradeCode,
                    progressType
                }: ApiMasterformatProgressArgument) {
        addInstantGetterAndSetterToApiModel(this, "scanDate");
        addInstantGetterAndSetterToApiModel(this, "createdAt");
        if (masterformat) {
            this.masterformat = new ApiMasterformat(masterformat.version, masterformat.code);
        } else {
            this.masterformat = null;
        }
        this.percentComplete = percentComplete ?? null;
        // @ts-ignore
        this.scanDate = scanDate;
        this.createdAt = createdAt;
        this.customTradeCode = customTradeCode;
        this.progressType = progressType;
    }

    masterformat: ApiMasterformat | null = null;
    percentComplete: number | null = null;
    scanDate: number | null | DateLike = null;
    createdAt: number | null | DateLike = null;
    customTradeCode: string | null = null;
    progressType: ProgressType | null = null;
}

export default ApiMasterformatProgress;
