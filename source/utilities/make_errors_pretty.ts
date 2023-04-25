import _ from "underscore";
import checkFetchStatus from "./check_fetch_status";
import Config from "../config";

type ObjectWithMethodProperties = Record<string, (...args: any) => any>
const makeErrorsPrettyForFunction = <Class extends ObjectWithMethodProperties, Key extends keyof Class>(actionName: Key, action: Class[Key], displayErrorMessage: boolean): Class[Key] => {
  return ((...argumentList) => {
    return action(...argumentList)
      .then((response) => checkFetchStatus(response, displayErrorMessage))
      .catch((error) => {
        return Config.sharedErrorHandler({
          error,
          action: actionName,
          arguments: argumentList
        });
      });
  }) as Class[Key];
};

type MethodProperties<T> = keyof { [P in keyof T as T[P] extends (...args: any) => any ? P : never]: any }
const getFunctionNames = <Class>(clazz: Class): MethodProperties<Class>[] => {
  let builtinProperties = ["length", "constructor", "name", "prototype"];
  // TODO it might make sense to check the type of each property
  return _.without(Object.getOwnPropertyNames(clazz), ...builtinProperties) as MethodProperties<Class>[];
};

type Options<Class> = {
  exclude?: MethodProperties<Class>[],
  overrideErrorMessage?: MethodProperties<Class>[]
}

const makeErrorsPretty = <Class>(apiClass: Class, options: Options<Class> = { exclude: [], overrideErrorMessage: [] }) => {
  let functionNames = getFunctionNames(apiClass);
  _.forEach(functionNames, (functionName) => {
    let isExcluded = options.exclude && options.exclude.includes(functionName);
    let displayErrorMessage = !options.overrideErrorMessage || !options.overrideErrorMessage.includes(functionName);
    if (!isExcluded) {
      // @ts-ignore
      apiClass[functionName] = makeErrorsPrettyForFunction(functionName, apiClass[functionName], displayErrorMessage);
    }
  });
  return apiClass;
};

export default makeErrorsPretty;
