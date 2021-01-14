# avvir-javascript-client


# Getting Started Guide

configure environment:

`AVVIR_GATEWAY_URL=https://avvir-gateway-production.herokuapp.com`


```javascript
import AvvirApi from "./dist/avvir_api";
// if you're using nodejs, instead of import do:
// const AvvirApi = require("./dist/avvir_api").default;

async ()=>{
  let username = "you@example.com";
  let password = "yourPassword123";

  let user = await AvvirApi.auth.login(username, password);
  

  // at this point you can either upload directly to avvir using the storage token
  // or simply post the 3rd-party url to Avvir and Avvir will do ingestion automatically.
  // url should be a signed url valid for at least 30 hours
  let file = new ApiCloudFile({url, purposeType:ProjectPurposeType.OTHER});
  await AvvirApi.files.createProjectFile({projectId:"your-project-id"}, file, user);

  // at this point if you go to the upload page for the project, you should see your file listed
  // If you posted a 3rd party url, the url will change after some time once the Avvir system ingests the file.
  
}
```