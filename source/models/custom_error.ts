import ResponseError from "./response_error";

export class CustomError extends ResponseError{
    constructor(message, verboseMessage, response, responseBody, displayMessageToUI: boolean) {
        super(message, verboseMessage, response, responseBody);
        this.displayMessageToUI = displayMessageToUI;
    }
    displayMessageToUI: boolean;
}

export default CustomError;