import {forEach, without} from "underscore";
import checkFetchStatus from "./check_fetch_status";
import Config from "../config";

const makeErrorsPrettyForFunction = (actionName, action, displayErrorMessage) => {
  return (...argumentList) => {
    return action(...argumentList)
      .then((response) => checkFetchStatus(response, displayErrorMessage))
      .catch((error) => {
        return Config.sharedErrorHandler({
          error,
          action: actionName,
          arguments: argumentList
        })
      })

  }
}
const getFunctionNames = (clazz) => {
  let builtinProperties = ["length", "constructor", "name", "prototype"];
  // TODO it might make sense to check the type of each property
  return without(Object.getOwnPropertyNames(clazz), ...builtinProperties)
}

const makeErrorsPretty = (apiClass, options = {exclude: [], overrideErrorMessage: []}) => {
  let functionNames = getFunctionNames(apiClass);
  forEach(functionNames, (functionName) => {
    let isExcluded = options.exclude && options.exclude.includes(functionName);
    let displayErrorMessage = !options.overrideErrorMessage || !options.overrideErrorMessage.includes(functionName);
    if (!isExcluded) {
      apiClass[functionName] = makeErrorsPrettyForFunction(functionName, apiClass[functionName], displayErrorMessage);
    }
  });
  return apiClass;
}

export default makeErrorsPretty;
