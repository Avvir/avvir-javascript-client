import fetchMock, {InspectionFilter, InspectionOptions} from "fetch-mock";

export interface MockedFetchCall {
  url: string
  requestInit: RequestInit
  request: Request
  response: Response
  body?: string
}

export function lastMockedFetchCall(filter?: InspectionFilter, options?: InspectionOptions,): MockedFetchCall {
  // this is a ridiculous interface to have an array mixed with attributes so lets turn it into a pure object
  const lastCall = fetchMock.lastCall(filter, options);

  // this block makes typescript happy with the body type somehow
  let body = null;
  if (lastCall[1].body) {
    body = lastCall[1].body;
  }

  return {
    url: lastCall[0],
    requestInit: lastCall[1],
    body,
    request: lastCall.request,
    response: lastCall.response
  };
}
