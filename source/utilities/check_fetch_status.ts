import responseStatusText from "../resources/response_statuses.json";
import Http from "./http";
import CustomError from "../models/custom_error";

const checkFetchStatus = <R extends string | {}>(response: Response, displayErrorMessage: boolean = true): Promise<R | never> => {
  //@ts-ignore
  if(typeof response == "string" || !response.headers) return Promise.resolve(response);

  const requestPath = response.url.split(Http.baseUrl()).join("..."); // split and join to replace text
  if (response.headers.has("Warning")) {
    console.warn(`Warning present in response: ${response.headers.get("Warning")}
from: \`${requestPath}\``);
  }
  if (response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json().then(body => {
        return body;
      }) as Promise<R>;
    } else {
      return response.text().then(text => {
        return text;
      }) as Promise<R>;
    }
  } else {
    return response.json().then((errorBody) => {
      let message = errorBody.errorDetails || errorBody.message;
      let statusMessage = responseStatusText[response.status];
      let verboseMessage = `${response.status} ${statusMessage}: '${message}' at \`${requestPath}\``;
      const error = new CustomError(
        message,
        verboseMessage,
        response,
        errorBody,
        displayErrorMessage
      );
      console.error(error);
      throw error;
    });
  }
};

export default checkFetchStatus;
