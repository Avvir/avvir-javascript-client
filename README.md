# avvir-javascript-client

## Getting Started

### Definitions
- [Project](./source/models/api/api_project.ts) - Groups together all of the information related to a construction project such as the name and location. Also contains the building model indirectly through Areas.
- [Area](./source/models/api/api_floor.ts) - Projects are divided into areas to keep the complexity of the model manageable. They have been called "floors" in the past because they would usually map to a building floor but they have been renamed because that is not always true.
- [Capture Dataset](./source/models/api/api_scan_dataset.ts) - In order to perform analysis on the BIM, data must be captured from reality and this is where it is stored. Previously called "Scan Datasets" because the data was in the form of a laser scan but it has been renamed to match the fact that other types of data such as photos can be captured.    

### Getting A Project ID 
Get your project id:
1. Navigate to https://portal.avvir.io/
2. Log in with your credentials
3. Choose project you'd like to work with
4. Take project id from the URL
   - ex: https://portal.avvir.io/admin/organizations/{organizationId}/projects/{projectId}

### Sample client code (node)
Before running any sample code make sure the project dependencies are available by running:
```bash
yarn install
```

As a basic example this code will retrieve all the areas associated with a project along with their capture datasets and log the results to the console. [This example](./samples/areas-and-capture-datasets.js) as well as others can be found in the [samples](./samples) directory.

```javascript
const Avvir = require("avvir-javascript-client").default;

async function printAreasAndCaptureDatasets() {
   // Make sure to replace the credentials with your actual username and password
   const username = "you@example.com";
   const password = "yourPassw0rd123";

   // Replace this with the project ID you retrieved from the "Getting a project ID" step
   const projectId = "your-project-id";
   
   const user = await Avvir.api.auth.login(username, password);
   const areas = await Avvir.api.floors.listFloorsForProject(projectId, user);

   for (const area of areas) {
      console.log(`Area: ${area.floorNumber}`);
      console.log(area);

      console.log(`\nCapture Datasets for area ${area.floorNumber}: [`)
      const captureDatasets = await Avvir.api.scanDatasets.listScanDatasetsForFloor({projectId, floorId: area.firebaseId}, user);
      for (const dataset of captureDatasets) {
         console.log(dataset);
      }
      console.log("]");
   }
}

printAreasAndCaptureDatasets();
```

## Contributing
Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to avvir-javascript-client.
