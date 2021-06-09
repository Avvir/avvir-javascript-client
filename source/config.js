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
    AVVIR_GATEWAY_URL: "https://acceptance-api.avvir.io",
    AVVIR_ENVIRONMENT: "acceptance"
  }
  addEnvironmentVariablesToConfiguration()
}

const useProductionConfiguration = () => {
  config = {
    AVVIR_GATEWAY_URL: "https://api.avvir.io",
    AVVIR_ENVIRONMENT: "production"
  }
  addEnvironmentVariablesToConfiguration()
}

const useLocalProductionConfiguration = () => {
  config = {
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

config.sharedErrorHandler = ({error}) => {
  throw error;
}

console.log("Avvir client configured to reach ", config.AVVIR_GATEWAY_URL);
module.exports = config;
module.exports.useAcceptanceConfiguration = useAcceptanceConfiguration
module.exports.useProductionConfiguration = useProductionConfiguration
module.exports.useLocalProductionConfiguration = useLocalProductionConfiguration
