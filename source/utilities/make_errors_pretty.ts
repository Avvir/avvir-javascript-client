import _ from "underscore";
import checkFetchStatus from "./check_fetch_status";
import Config from "../config";

const makeErrorsPrettyForFunction = (actionName, action) => {
    return (...argumentList) => {
        return action(...argumentList)
            .then(checkFetchStatus)
            .catch((error) => {
                const errorArg = {
                    error,
                    action: actionName,
                    arguments: argumentList
                }
                return Config.sharedErrorHandler(errorArg);
            })

    }
}

const getFunctionNames = (clazz) => {
    let builtinProperties = ["length", "constructor", "name", "prototype"];
    // TODO it might make sense to check the type of each property
    return _.without(Object.getOwnPropertyNames(clazz), ...builtinProperties)
}

const makeErrorsPretty = (apiClass, options: {exclude: string[]} = {exclude: []}) => {
    let functionNames = getFunctionNames(apiClass);
    _.forEach(functionNames, (functionName) => {
        let isExcluded = options.exclude && options.exclude.includes(functionName);
        if (!isExcluded) {
            apiClass[functionName] = makeErrorsPrettyForFunction(functionName, apiClass[functionName]);
        }
    });
    return apiClass;
}

export default makeErrorsPretty;
