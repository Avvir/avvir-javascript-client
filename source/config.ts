const _ = require("underscore");

let configuration: {[key: string]: any} = {logFetch: false};

const addEnvironmentVariablesToConfiguration = () => {
  _.forEach(configuration, (value, varName) => {
    if (process.env[varName] != null && process.env[varName] != '') {
      configuration[varName] = process.env[varName];
    }
  });
}

const useAcceptanceConfiguration = () => {
  configuration = {
    ...configuration,
    AVVIR_GATEWAY_URL: "https://acceptance-api.avvir.io",
    AVVIR_ENVIRONMENT: "acceptance"
  }
  addEnvironmentVariablesToConfiguration()
}

const useProductionConfiguration = () => {
  addEnvironmentVariablesToConfiguration()
  configuration = {
    ...configuration,
    AVVIR_GATEWAY_URL: "https://api.avvir.io",
    AVVIR_ENVIRONMENT: "production"
  }
}

const useLocalProductionConfiguration = () => {
  addEnvironmentVariablesToConfiguration();
  configuration = {
    ...configuration,
    AVVIR_GATEWAY_URL: "https://api.avvir.io",
    AVVIR_ENVIRONMENT: "local-production"
  }
}

const useLocalConfiguration = () => {
  addEnvironmentVariablesToConfiguration()
  configuration = {
    ...configuration,
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
  } else if (env === 'production') {
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
  useLocalProductionConfiguration,
  useLocalConfiguration,
  getConfiguration,
  sharedErrorHandler,
  setConfigurationForEnvironment
}

export default Config
