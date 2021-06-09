const _ = require("underscore");

let config;

const addEnvironmentVariablesToConfiguration = () => {
  _.forEach(config, (value, varName) => {
    if (process.env[varName] != null && process.env[varName] != '') {
      config[varName] = process.env[varName];
    }
  });
}

const useAcceptanceConfiguration = () => {
  config = {
    AVVIR_GATEWAY_URL: "https://acceptance-api.avvir.io"
  }
  addEnvironmentVariablesToConfiguration()
}

const useProductionConfiguration = () => {
  config = {
    AVVIR_GATEWAY_URL: "https://avvir-gateway-production.herokuapp.com"
  }
  addEnvironmentVariablesToConfiguration()
}

const setConfigurationFromEnvironmentVariable = () => {
  if(process.env.AVVIR_ENVIRONMENT === 'acceptance'){
    useAcceptanceConfiguration()
  } else {
    useProductionConfiguration()
  }
}


setConfigurationFromEnvironmentVariable()

config.sharedErrorHandler = ({error}) => {
  throw error;
}

console.log("Avvir client configured to reach ", config.AVVIR_GATEWAY_URL);
module.exports = config;