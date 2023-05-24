/**
 * @name ApiClassificationCode
 * @description Categorization of building elements. This is the standard masterformat for projects that do not
 * utilize a work breakdown structure (WBS). For projects with a WBS, this is a WBS line item classification.
 *
 * @param code - The standard masterformat code or the WBS code
 * @param description - The standard masterformat title or the component description from the WBS
 */
export class ApiClassificationCode {
    constructor(code: string, description?: string) {
        this.code = code;
        this.description = description;
    }

    code: string;
    description?: string;
}

export default ApiClassificationCode