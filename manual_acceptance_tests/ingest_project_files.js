const Avvir = require("../dist/avvir_api")
const AvvirApi = Avvir.default.api;
const {ApiCloudFile, ApiPipeline} = Avvir.default;


const email = process.env.AVVIR_SANDBOX_EMAIL
const password = process.env.AVVIR_SANDBOX_PASSWORD
const projectId = process.env.AVVIR_SANDBOX_PROJECT_ID

const maxIterations = 100;
const iterationTimeout = 1000;

const runApi = async () => {
  console.log("Logging in with User Credentials");
  let user = await AvvirApi.auth.login(email, password);
  let apiCloudFile = new ApiCloudFile({
    url: 'https://storage.googleapis.com/avvir-public-readonly/test-fixture.txt', //can be any file.
    purposeType: "OTHER"
  });

  let file = await AvvirApi.files.createProjectFile({projectId}, apiCloudFile, user);
  let pipeline = new ApiPipeline({
    name: "ingest-project-file",
    firebaseProjectId: projectId,
    options: {
      url: apiCloudFile.url,
      fileType: 'txt'
    }
  });
  console.log("created project file \n")
  let response = await AvvirApi.pipelines.triggerPipeline(pipeline, user);
  console.log("triggered pipeline to ingest external file\n");
  /* should be
      {
          name: 'ingest_project_file_[UUID]',
          status: RUNNING,
          id: pipelineID,
          ...
      }
  */

  const pollPipeline = (pipelineResponse, user, index = 0) => {

    console.log("Processing file. Please wait...")
    return new Promise((resolve, reject) => {
      AvvirApi.other.checkPipelineStatus({projectId}, pipelineResponse.id, user)
        .then((response) => {
          // console.log(index, response);
          if (index > maxIterations) {
            reject("Too Many Calls: Check endpoint to make sure the implementation isn't flawed.")
          } else if (response.status !== 'COMPLETED') {
            setTimeout( () => resolve(pollPipeline(response, user,  ++index)), iterationTimeout);
          } else {
            resolve(response);
          }
        })
    })
  }

  let completed = await pollPipeline(response, user);
  console.log("Has pipeline completed successfully? ", completed.status == 'COMPLETED');

  let projectFiles = await AvvirApi.files.listProjectFiles({projectId}, user);
  let latestFile = projectFiles.slice(-1)[0];
  console.log("Check the /files page of the project's dashboard")
  console.log(`Page: https://acceptance-portal.avvir.io/projects/${projectId}/uploads`);
  console.log("Project File Url: ", latestFile.url) //https://storage.googleapis.com/avvir-portal-acceptance.appspot.com/project_uploads/...
}


runApi();