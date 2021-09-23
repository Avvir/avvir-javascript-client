import ExtendableError from "extendable-error-class";
import {Response} from "node-fetch";

class ResponseError extends ExtendableError {
  constructor(message: string, verboseMessage: string, response: Response, responseBody: any) {
    super(message);
    this.name = "ResponseError";
    this.message = message;
    this.verboseMessage = verboseMessage;
    this.status = response.status;
    this.responseBody = responseBody;
  }

  name: string;
  message: string;
  verboseMessage: string;
  status: number;
  responseBody: any & { message: string };
}

export default ResponseError;
