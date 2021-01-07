import ResponseError from "./models/response_error";
import responseStatusText from "./resources/response_statuses.json";
import WebGatewayApi from "./web_gateway_api";
import Http from "./http";

const checkFetchStatus = <R extends string | {}>(response: Response): Promise<R | never> => {
  const requestPath = response.url.split(Http.baseUrl).join("..."); // split and join to replace text
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
        if (text) {
          console.warn(`API returned non-json body from: \`${requestPath}\``);
        }
        return text;
      }) as Promise<R>;
    }
  } else {
    return response.json().then((errorBody) => {
      let message = errorBody.message;
      let statusMessage = responseStatusText[response.status];
      let verboseMessage = `${response.status} ${statusMessage}: '${message}' at \`${requestPath}\``;
      const error = new ResponseError(
        message,
        verboseMessage,
        response,
        errorBody
      );
      console.error(error);
      throw error;
    });
  }
};

export default checkFetchStatus;
