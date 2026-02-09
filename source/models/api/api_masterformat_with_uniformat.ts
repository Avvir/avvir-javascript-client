import ApiMasterformat from "./api_masterformat";

export class ApiMasterFormatWithUniformat {
    constructor(masterformat: ApiMasterformat, uniformat?: string) {
        this.masterformat = {
            code: masterformat.code,
            version: masterformat.version,
            description: masterformat.description,
        };
        this.uniformat = uniformat;
    }

    masterformat: ApiMasterformat;
    uniformat?: string;
}

export default ApiMasterFormatWithUniformat;