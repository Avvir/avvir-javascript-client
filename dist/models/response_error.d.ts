import ExtendableError from "extendable-error-class";
declare class ResponseError extends ExtendableError {
    constructor(message: string, verboseMessage: string, response: Response, responseBody: any);
    name: string;
    message: string;
    verboseMessage: string;
    status: number;
    responseBody: any & {
        message: string;
    };
}
export default ResponseError;
