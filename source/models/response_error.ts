import ExtendableError from "extendable-error-class";

class ResponseError extends ExtendableError {
  constructor(message: string, response: Response, responseBody: any) {
    super(message);
    this.name = "ResponseError";
    this.message = message;
    this.status = response.status;
    this.responseBody = responseBody;
  }

  name: string;
  message: string;
  status: number;
  responseBody: any & { message: string };
}

export default ResponseError;
