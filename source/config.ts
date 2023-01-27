import {forEach} from "underscore";

let configuration: {[key: string]: any} = {logFetch: false};

const addEnvironmentVariablesToConfiguration = () => {
  forEach(configuration, (value, varName) => {
    const envValue = process.env[varName];
    if (envValue && envValue != "") {
      configuration[varName] = envValue;
    }
  });
}

const useQAConfiguration = () => {
  configuration = {
    AVVIR_GATEWAY_URL: "https://qa-api.avvir.io",
    AVVIR_ENVIRONMENT: "qa"
  }
  addEnvironmentVariablesToConfiguration()
}

const useAcceptanceConfiguration = () => {
  configuration = {
    AVVIR_GATEWAY_URL: "https://acceptance-api.avvir.io",
    AVVIR_ENVIRONMENT: "acceptance"
  }
  addEnvironmentVariablesToConfiguration()
}

const useProductionConfiguration = () => {
  configuration = {
    AVVIR_GATEWAY_URL: "https://api.avvir.io",
    AVVIR_ENVIRONMENT: "production"
  }
  addEnvironmentVariablesToConfiguration()
}

const useLocalProductionConfiguration = () => {
  configuration = {
    AVVIR_GATEWAY_URL: "https://api.avvir.io",
    AVVIR_ENVIRONMENT: "local-production"
  }
  addEnvironmentVariablesToConfiguration()
}

const useLocalConfiguration = () => {
  addEnvironmentVariablesToConfiguration()
  configuration = {
    AVVIR_GATEWAY_URL: "http://localhost:8080",
    AVVIR_ENVIRONMENT: "local"
  }
}

const setConfigurationFromEnvironmentVariable = () => {
  setConfigurationForEnvironment(process.env.AVVIR_ENVIRONMENT);
}

const setConfigurationForEnvironment = (env) => {
  if(env === 'acceptance'){
    useAcceptanceConfiguration()
  } else if(env === 'local-production'){
    useLocalProductionConfiguration()
  } else if(env === 'local'){
    useLocalConfiguration()
  } else if(env ==='qa') {
    useQAConfiguration()
  } else {
    useProductionConfiguration()
  }
}

setConfigurationFromEnvironmentVariable()

const sharedErrorHandler = ({error}: any) => {
  throw error;
}

const getConfiguration = () => {
  return configuration
}

const Config = {
  useAcceptanceConfiguration,
  useProductionConfiguration,
  useQAConfiguration,
  useLocalProductionConfiguration,
  useLocalConfiguration,
  getConfiguration,
  sharedErrorHandler,
  setConfigurationForEnvironment,
  setConfigurationFromEnvironmentVariable
}

export default Config
