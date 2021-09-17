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

## Troubleshooting

`TypeError: Only absolute URLs are supported`: make sure that your AVVIR_GATEWAY_URL environment variable is set.

## Contributing 
Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to avvir-javascript-client.

##Api Reference

## Getting Started

[[TODO]]: Authentication - need to document the `User` type
[[TODO]]: Response Format

## Floor

### listFloorsForProject(projectId, user)
Get a list of all the floors for a given project
#### Params
1. _projectId_ `String` - Id for your project
1. _user_ `User` - Authenticated User object 
#### Returns
1. `Promise<ApiFloor[]>` - list of floors from that specific project
#### Example
```typescript
Avvir.api.floors.listFloorsForProject(projectId, user).then((response) => {
   console.log(response);
});
```
#### Sample Response
```javascript
[
   {
      id: 86194,
      firebaseId: '-MiRiAGSt7-S1kt_xBRY',
      ordinal: 1,
      floorNumber: '6 of 9 walls built',
      defaultFirebaseScanDatasetId: '-MiRiAGSWRJTgT4M3rhJ',
        firebaseProjectId: '-MiR1yIeEPw0l8-gxr01',
        plannedElementCount: 9,
        offset: {x: 75.3155172380952, y: 38.32947445238094},
        scanDate: 1630421955.679146,
        firebaseScanDatasetIds: ['-MiRiAGSWRJTgT4M3rhJ'],
        constructionGrid: null,
        photoAreaId: null,
        bimMinimapToWorld: {
           x1: 0.08271473050117494,
           x2: 0,
           x3: 28.025103759765624,
           y1: 0,
           y2: -0.08271473050117494,
           y3: 80.10169677734376,
           z1: 0,
           z2: 0,
           z3: 1
        },
        photoAreaMinimapPixelToBimMinimapPixel: null,
        floorElevation: 105.83333
    }
]
```

### createFloor(projectId, floorNumber, user)
Creates a floor for a given project
#### Params
1. _projectId_ `String` - Id for your project
1. _floorNumber_ `String` - ???
1. _user_ `User` - Authenticated User object
#### Returns
1. `Promise<ApiFloor[]>` - ???
#### Example
```typescript

```
#### Sample Response
```typescript

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
const associationIds: AssociationIds = { projectId: '-MiR1yIeEPw0l8-gxr01', floorId: '-MiRiAGSt7-S1kt_xBRY'};
Avvir.api.floors.getFloor(associationIds, user).then((response) => {
    console.log(response);
});
```
#### Sample Response
```javascript
{
  id: 86194,
  firebaseId: '-MiRiAGSt7-S1kt_xBRY',
  ordinal: 1,
  floorNumber: '6 of 9 walls built',
  defaultFirebaseScanDatasetId: '-MiRiAGSWRJTgT4M3rhJ',
  firebaseProjectId: '-MiR1yIeEPw0l8-gxr01',
  plannedElementCount: 9,
  offset: { x: 75.3155172380952, y: 38.32947445238094 },
  scanDate: 1630421955.679146,
  firebaseScanDatasetIds: [ '-MiRiAGSWRJTgT4M3rhJ' ],
  constructionGrid: null,
  photoAreaId: null,
  bimMinimapToWorld: {
    x1: 0.08271473050117494,
    x2: 0,
    x3: 28.025103759765624,
    y1: 0,
    y2: -0.08271473050117494,
    y3: 80.10169677734376,
    z1: 0,
    z2: 0,
    z3: 1
  },
  photoAreaMinimapPixelToBimMinimapPixel: null,
  floorElevation: 105.83333
}
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

###