# avvir-javascript-client

## Getting Project Id
Get your project id:
1. Navigate to https://portal.avvir.io/
2. Log in with your credentials
3. Choose project you'd like to work with
4. Take project id from the URL
   - ex: https://portal.avvir.io/admin/organizations/{organizationId}/projects/{projectId}
   
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

## Contributing 
Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to avvir-javascript-client.
