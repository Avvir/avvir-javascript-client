import _ from "underscore";
import checkFetchStatus from "./check_fetch_status";
import Config from "./config";

const makeErrorsPrettyForFunction = (actionName, action) => {
  return (...argumentList) => {
    return action(...argumentList)
      .then(checkFetchStatus)
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
  return _.without(Object.getOwnPropertyNames(clazz), ...builtinProperties)
}

const makeErrorsPretty = (apiClass) => {
  console.log(apiClass)
  let functionNames = getFunctionNames(apiClass);
  _.forEach(functionNames, (functionName) => {
    apiClass[functionName] = makeErrorsPrettyForFunction(functionName, apiClass[functionName]);
  })
}

export default makeErrorsPretty;