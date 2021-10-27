# Avvir

## Getting Started

### Definitions

- [Project](./source/models/api/api_project.ts) - Groups together all of the information related to a construction
  project such as the name and location. Also contains the building model indirectly through Areas.
- [Area](./source/models/api/api_floor.ts) - Projects are divided into areas to keep the complexity of the model
  manageable. They have been called "floors" in the past because they would usually map to a building floor but they
  have been renamed because that is not always true.
- [Capture Dataset](./source/models/api/api_scan_dataset.ts) - In order to perform analysis on the BIM, data must be
  captured from reality and this is where it is stored. Previously called "Scan Datasets" because the data was in the
  form of a laser scan but it has been renamed to match the fact that other types of data such as photos can be
  captured.

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

As a basic example this code will retrieve all the areas associated with a project along with their capture datasets and
log the results to the console. [This example](./samples/areas-and-capture-datasets.js) as well as others can be found
in the [samples](./samples) directory.

```javascript
const AvvirApi = require("avvir/node");
// Make sure to replace the credentials with your actual username and password
const username = "you@example.com";
const password = "yourPassw0rd123";

// Replace this with the project ID you retrieved from the "Getting a project ID" step
const projectId = "your-project-id";

async function printAreasAndCaptureDatasets() {
  const user = await AvvirApi.api.auth.login(username, password);
  const areas = await AvvirApi.api.floors.listFloorsForProject(projectId, user);

  for (const area of areas) {
    console.log(`Area: ${area.floorNumber}`);
    console.log(area);

    console.log(`\nCapture Datasets for area ${area.floorNumber}: [`)
    const captureDatasets = await AvvirApi.api.scanDatasets.listScanDatasetsForFloor({
      projectId,
      floorId: area.firebaseId
    }, user);
    for (const dataset of captureDatasets) {
      console.log(dataset);
    }
    console.log("]");
  }
}

printAreasAndCaptureDatasets();
```

## Using in the Browser

If you are using avvir in the browser, either use the cdn source in a script tag

```html

<script src="https://unpkg.com/avvir/browser.js"></script>
```

or use ES imports with the source `module.js`

```html

<script type="module">
    import AvvirApi from "https://unpkg.com/avvir/module";
</script>
```

## Uploading a Project File

When you have a scan file that you wish to upload into your project, you can use the api to pull a file from an external
data source, and apply it to your project. All uploaded project files can be found at:

https://acceptance-portal.avvir.io/projects/{projectId}/uploads

Where the `projectId` should be replaced with the projectID acquired through the steps [above](#getting-a-project-id).

```javascript
const uploadProjectFile = async () => {
  const user = await AvvirApi.api.auth.login(username, password);
  //create the payload for creating a project file
  const apiCloudFile = new ApiCloudFile({
    url: 'https://some-external-host.com/scan-file.las',
    purposeType: OTHER
  });

  //This will make the external file reference available to you in the avvir portal in on the files page
  let fileRef = await AvvirApi.files.createProjectFile({ projectId }, apiCloudFile, user);
  console.log(fileRef)
  let pipeline = new ApiPipeline({
    name: Pipelines.INGEST_PROJECT_FILE,
    firebaseProjectId: projectId,
    options: {
      url: apiCloudFile.url,
      fileType: 'las'
    }
  });

  //This will trigger the avvir portal to dowload the created file reference into your project
  let pipelineResponse = await AvvirApi.pipelines.triggerPipeline(pipeline, user);
  //you must poll the pipeline in to check on its status while downloading your file.
  let pipelineStatus = await AvvirApi.other.checkPipelineStatus({ projectId }, pipelineResponse.id, user);
  while (pipeline.status == 'RUNNING') {
    pipelineStatus = await AvvirApi.other.checkPipelineStatus({ projectId }, pipelineResponse.id, user);
  }
  if (pipeline.status == 'COMPLETE') {
    //once completed, you can get the file by listing the project files, and grabbing the latest.
    let files = await AvvirApi.files.listProjectFiles({ projectId }, user);
    const newFile = files.pop();
    //you can also navigate to /uploads in the portal to view the file in the UI
    return newFile
  }
}
uploadProjectFile();
```

## Uploading a BIM file to an area

Using the files api, you have the ability to upload a bim to an area to be viewable in the 3d Viewer. The bim can be
either an `.nwd` file or an `.ifc` file.

To begin uploading a bim to an area, first get your project id and area id from the area you would like to upload the
bim to. You will need to ingest the file first before saving it to the floor. 

```javascript
const AvvirApi = require("avvir/node");
const {Pipelines, ApiFloorPurposeType, ApiCloudFile, ApiPipeline} = AvvirApi;

//The instructions above details how to get the following variables
let username = "<You-User-Login>";
let password = "<Your-Password>";
let projectId = "<Your-Project-ID>";

//use the instructions above to get area id
const areaId = '<Your-Area-Id>';
//replace this with an actual bim file. 
const fileUrl = 'https://some-external-host.com/bim-file.nwd';

const pollIterations = 100;
const pollTimeout = 1000; //milliseconds
//helper function to poll the pipeline
const checkPipeline = (pipelineResponse, user, index = 0) => {
  console.log("Checking Pipeline:", index + " of " + pollIterations + " iterations");
  return new Promise((resolve, reject) => {
    AvvirApi.api.other.checkPipelineStatus({projectId}, pipelineResponse.id, user)
      .then((response) => {
        // console.log(index, response);
        if (index > pollIterations) {
          reject("Too Many Calls: Check endpoint to make sure the implementation isn't flawed.")
        } else if (response.status !== 'COMPLETED') {
          setTimeout( () => resolve(checkPipeline(response, user,  ++index)), pollTimeout);
        } else {
          resolve(response);
        }
      })
  })
}

const uploadBim = async () => {
  const user = await AvvirApi.api.auth.login(username, password);
  let floorId = areaId;

  const apiCloudFile = new ApiCloudFile({
    url: fileUrl,
    purposeType: ApiFloorPurposeType.BIM_NWD //Can also be BIM_IFC if your uploading an ifc
  });
  
  //Creates the project file and associates it the project
  //can view by navigating to the files page in the portal
  const projectFile = await AvvirApi.api.files.createProjectFile({projectId}, apiCloudFile, user);
  let pipeline = new ApiPipeline({
    name: Pipelines.INGEST_PROJECT_FILE,
    firebaseProjectId: projectId,
    options: {
      url: apiCloudFile.url,
      fileType: 'nwd'
    }
  });
  let pipelineResponse = await AvvirApi.api.pipelines.triggerPipeline(pipeline, user);
  console.log("Check Ingest Project File Pipeline: ", pipelineResponse.externalUrl);
  await checkPipeline(pipelineResponse, user);
  
  //get the bim file from the project files list
  const allProjectfiles = await AvvirApi.api.files.listProjectFiles({projectId}, user);
  const bimFile = allProjectfiles[allProjectfiles.length - 1];
  const newFile = new ApiCloudFile({
    url: bimFile.url,
    purposeType: ApiFloorPurposeType.BIM_NWD
  });
  
  //save the project file as a floor file
  let file = await AvvirApi.api.files.saveFloorFile({ projectId, floorId }, newFile, user);
  //check the pipeline to check on your the file upload status of the bim.
  console.log(file, "\n");

  pipeline = new ApiPipeline({
    name: Pipelines.CREATE_AND_PROCESS_SVF,
    firebaseProjectId: projectId,
    firebaseFloorId: floorId,
    options: {
      matchAndUpdateElements: false
    }
  });

  pipelineResponse = await AvvirApi.api.pipelines.triggerPipeline(pipeline, user);
  console.log("Check Bim Processing Pipeline: ", pipelineResponse.externalUrl);
  await checkPipeline(pipelineResponse, user);
  
  //check the floor for updated bim and check the viewer to make sure it is "viewable"
}

//call the method
uploadBim();
```

## Associating a Scan File to a Project Area

Once a scan file has be ingested by the portal, you can now associate a scan to an area's scan dataset. By doing this,
you gain the ability to run analysis on the scan to determine deviations and progress for the given area.

You must first acquire an area id from the portal by navigating to a floor in the portal and copying the id from the
url:

https://portal.avvir.io/admin/organizations/{organizationId}/projects/{projectId}/floors/{areaId}

Or can create a floor programatically:

```javascript
const createFloor = async () => {
  return await AvvirApi.api.floors.createFloor(projectId, "<Any Area Name>", user);
}
let area = await createFloor()
let areaId = area.firebaseId;
```

Then, assuming you've already uploaded a scan file to your project, apply the following steps to associate the scan to
an area.

> If you haven't uploaded a file using the api, you can subsequently upload a file through the portal by navigating to the "files" section of the portal, and dragging your file into the dropzone located at the top of that page. Once file has completed uploading, bring the file into view, and copy the file address by right clicking the cloud icon, and selecting "Copy link address".

```javascript

const AvvirApi = require("avvir/node");
//The instructions above details how to get the following variables
let username = "<You-User-Login>";
let password = "<Your-Password>";
let projectId = "<Your-Project-ID>";

//use the instructions above to get area id
const areaId = '<Your-Area-Id>';
//you can get this url from the portal or by calling the uploadProjectFile() above, and getting the url property. 
const fileUrl = 'https://some-file-source.com/scan.las';

const associateScan = async (areaId, fileUrl) => {
  const user = await AvvirApi.api.auth.login(username, password);
  let floorId = areaId;
  //this creates a new scan on the area you've selected.
  const scanDataset = await AvvirApi.api.scanDatasets.createScanDataset({ projectId, floorId }, user);
  const cloudFile = new AvvirApi.ApiCloudFile({
    url: fileUrl,
    purposeType: 'PREPROCESSED_SCAN'
  });
  let scanDatasetId = scanDataset.firebaseId;
  await AvvirApi.api.files.saveScanDatasetFile({ projectId, floorId, scanDatasetId }, cloudFile, user);
  console.log(`Go to Scan #${scanDataset.scanNumber} in the scan datasets dropdown of the portal under your selected floor`);
  console.log(`Completed associating scan dataset...`)
}

associateScan(areaId, fileUrl)
```

## Process Deviations and Progress analysis on Scan Dataset

Given you have a scan associated to a scan dataset on your area, to get analysis on the scandataset, you must trigger
the `process-steps` pipeline, with the type of analysis you wish to compute.

```javascript
let Avvir = require("avvir-javscript-client");
let AvvirApi = Avvir.api;
let username = "<You-User-Login>";
let password = "<Your-Password>";
let projectId = "<Your-Project-ID>";
let captureDatasetId = "<Your-Capture-Dataset-ID>";
let areaId = "<Your-Area-ID>";

const processSteps = async (type) => {
  let steps = [];
  if (type == "deviation") {
    steps.push("compute-deviations")
  } else if (type == "progress") {
    steps.push("compute-progress");
  } else {
    steps = ["compute-deviations", "compute-progress"]
  }

  let user = await AvvirApi.auth.login(username, password)
  let pipeline = new Avvir.ApiPipeline({
    name: "pipeline-steps",
    firebaseProjectId: projectId,
    firebaseFloorId: areaId,
    firebaseScanDatasetId: captureDatasetId,
    options: {
      steps
    }
  })
  let response = await AvvirApi.pipelines.triggerPipeline(pipeline, user);
  console.log(response.status);
}

//will process both deviations and progress
processSteps()
```

After the pipeline has finished processing your scans, you should be able to navigate to the `3d Viewer` and see the
deviations displayed in the model. You can also view progress data by exporting the `Progress Pdf` from
the `Exports & Reports` dropdown on the upper right of the viewer.

## Process scan for 3d Viewer

Given you have associated a scan to a scan dataset, using the same scan dataset id and credentials as above, if you want
to view your scan in the viewer, you will need to run another pipeline.

```javascript
const Avvir = require("avvir/node");
const { ApiPipeline } = require("avvir/node");

let username = "<You-User-Login>";
let password = "<Your-Password>";
let projectId = "<Your-Project-ID>";
let captureDatasetId = "<Your-Capture-Dataset>";
let areaId = "<Your-Area-ID>";

const processScan = async () => {
  const user = await Avvir.api.auth.login(username, password);
  let pipeline = new ApiPipeline({
    name: "downsample-scan",
    firebaseProjectId: projectId,
    firebaseFloorId: areaId,
    firebaseScanDatasetId: captureDatasetId
  });

  return Avvir.api.pipelines.triggerPipeline(pipeline, user).then((response) => {
    console.log(`Pipeline Status: ${response.status}`);
    // expect(response.status).to.be.eq(RunningProcessStatus.RUNNING);
  });
}

processScan();
```

After the pipeline has completed processing your scan, you should be able to navigate to the 3d viewer in the portal,
and view your scan by changing viewer's mode to `Inspection Mode` in the left panel, and toggling `View Point Cloud`.

## Getting Project Deviation Tsv 
There exists a tab separated file that users can export from the portal which provides deviation metrics for the entire project. To download this file, use `getProjectDeviationsReportTsv` and it will return a plaintext response with the contents of the file.

```javascript
const Avvir = require("avvir-javascript-client");
const email = "youremail@email.com"
const password = "yourpassword";
const projectId = "<your-project-id>";

const getTsv = async () => {
  let user = await Avvir.api.auth.login(email, password);
  let tsv = await Avvir.api.projects.getProjectDeviationsReportTsv({projectId}, user);
  return tsv;
}

getTsv().then(console.log);
```


## Saving and Converting E57 Files to project
Avvir portal gateway utilizes scans to detect clashes and deviances in the Bim. The portal only ingests scans that are in las format utilizing `saveScanDatasetFile()`. 

If you have a scan that is in e57 format, there is a different method which will convert your e57 file before ingesting it into the portal.

```javascript
const Avvir = require("avvir-javascript-client");
const email = "youremail@email.com"
const password = "yourpassword";
const projectId = "<your-project-id>";
const url = "some-url.com/external-e57-point-cloud.e57"

const saveAndConvertE57 = async () => {
  let user = await Avvir.api.auth.login(email, password);
  let apiFile = new Avvir.ApiCloudFile({
    url,
    purposeType: 'OTHER'
  });
  return await Avvir.api.files.saveAndConvertE57ProjectFile({projectId}, apiFile, user);
}

saveAndConvertE57().then(console.log)
```


## Contributing

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and
improvements, and how to build and test your changes to avvir.

## Api Reference

___

## Floor

### listFloorsForProject(projectId, user)

Get a list of all the floors for a given project

#### Params

1. _projectId_ `String` - Id for your project
1. _user_ `User` - Authenticated User object

#### Returns

1. `Promise<ApiFloor[]>` - list of floors from that specific project

#### Example

```javascript
AvvirApi.api.floors.listFloorsForProject(projectId, user).then((response) => {
  console.log(response);
});
```

### createFloor(projectId, areaNumber, user)

Creates a floor for a given project

#### Params

1. _projectId_ `String` - Id for your project
1. _areaNumber_ `String` - The label which references the area (usually a number)
1. _user_ `User` - Authenticated User object

#### Returns

1. `Promise<ApiFloor[]>` - An api object which represents the meta data of a floor.

#### Example

```typescript
AvvirApi.api.floors.createFloor(projectId, "<Any Area Name>", user).then((floor) => {
  console.log(floor)
})
```

### getFloor(associationIds, user)

gets a floor by a given projectId and floorId

#### Params

1. _associationIds_ `AssociationIds` - Wrapper object for housing projectId and floorId
1. _user_ `User` - Authenticated User object

#### Returns

1. `Promise<ApiFloor[]>` - list of floors that match param requirements
   <br><br>
   *see [ApiFloor](###ApiFloor) for type info

#### Example

```typescript
const associationIds = { projectId: '-MiR1yIeEPw0l8-gxr01', floorId: '-MiRiAGSt7-S1kt_xBRY' };
AvvirApi.api.floors.getFloor(associationIds, user).then((response) => {
  console.log(response);
});
```

## Scan Dataset

## Photo Area

# Types

### ApiFloor

#### Properties

- _readonly_ `Number` id
- _readonly_ `String` firebaseId
- _readonly_ `String` firebaseProjectId
- `Number` ordinal
- `String` floorNumber
- `String` defaultFirebaseScanDatasetId
- `String[]` firebaseScanDatasetIds
- `ApiConstructionGrid | Null` constructionGrid
- `Number | Null` plannedElementCount
- `Number | Null` scanDate
- _readonly_ `Vector2Like` offset
- `Number | Null` photoAreaId
- `ApiMatrix3 | Null` photoAreaMinimapPixelToBimMinimapPixel
- `ApiMatrix3 | Null` bimMinimapToWorld
- `Number | Null` floorElevation
