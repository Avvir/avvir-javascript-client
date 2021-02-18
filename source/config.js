const _ = require("underscore");

let config;
if(process.env.AVVIR_ENVIRONMENT == 'acceptance'){
  config = {
    AVVIR_GATEWAY_URL: "https://avvir-web-gateway-acceptance.herokuapp.com"
  }
} else {
  config = {
    AVVIR_GATEWAY_URL: "https://avvir-gateway-production.herokuapp.com"
  }
}

_.forEach(config, (value, varName) =>{
  if(process.env[varName] != null && process.env[varName] != '') {
    config[varName] = process.env[varName];
  }
});

console.log("Avvir client configured to reach ", config.AVVIR_GATEWAY_URL);
module.exports = config;