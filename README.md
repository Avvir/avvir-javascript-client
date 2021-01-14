# avvir-javascript-client


# Getting Started Guide

configure environment:

`AVVIR_GATEWAY_URL=https://avvir-gateway-production.herokuapp.com`

get your project id:

// TODO


## Sample client code (Node)
```javascript
// if you're writing code for the browser, instead of require use this import:
// import Avvir from "./dist/avvir_api";
const Avvir = require("./dist/avvir_api").default;


let createExampleFile = async ()=>{
  let username = "you@example.com";
  let password = "yourPassw0rd123 ";
  let projectId = "-LjqojzBLuyn94lHJT2f";
  let user = await Avvir.api.auth.login(username, password);
  let url = "https://YOUR-DOMAIN-HERE/samplefile.las"


  // at this point you can either upload directly to avvir using the storage token
  // or simply post the 3rd-party url to Avvir and Avvir will do ingestion automatically.
  // url should be a signed url valid for at least 30 hours
  let file = new Avvir.ApiCloudFile({url, purposeType: Avvir.ProjectPurposeType.OTHER});
  await Avvir.api.files.createProjectFile({projectId}, file, user);

  // at this point if you go to the upload page for the project, you should see your file listed
  // If you posted a 3rd party url, the url will change after some time once the Avvir system ingests the file.

}

createExampleFile();
```

# Troubleshooting

`TypeError: Only absolute URLs are supported`: make sure that your AVVIR_GATEWAY_URL environment variable is set.