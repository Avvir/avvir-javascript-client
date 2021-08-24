const _ = require("underscore");

let configuration = {logFetch: false};

const addEnvironmentVariablesToConfiguration = () => {
  _.forEach(configuration, (value, varName) => {
    if (process.env[varName] != null && process.env[varName] != '') {
      configuration[varName] = process.env[varName];
    }
  });
}

const useAcceptanceConfiguration = () => {
  configuration = {
    // AVVIR_GATEWAY_URL: "https://acceptance-api.avvir.io",
    AVVIR_GATEWAY_URL: "http://localhost:8080",
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

const setConfigurationFromEnvironmentVariable = () => {
  if(process.env.AVVIR_ENVIRONMENT === 'acceptance'){
    useAcceptanceConfiguration()
  } else if(process.env.AVVIR_ENVIRONMENT === 'local-production'){
    useLocalProductionConfiguration()
  } else {
    useProductionConfiguration()
  }
}


setConfigurationFromEnvironmentVariable()

const sharedErrorHandler = ({error}) => {
  throw error;
}

const getConfiguration = () => {
  return configuration
}

const Config = {useAcceptanceConfiguration, useProductionConfiguration, useLocalProductionConfiguration, getConfiguration, sharedErrorHandler}

module.exports = Config