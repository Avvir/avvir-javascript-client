import AuthApi from "../source/api/auth_api";
import {describe} from "mocha";
import AvvirApi from "../source/avvir_api";
import ApiCloudFile from "../source/models/api/api_cloud_file";
import {OTHER} from "../source/models/enums/purpose_type";
import Pipelines from "../source/models/enums/pipeline_types";
import ApiPipeline, {ApiPipelineArgument} from "../source/models/api/api_pipeline";
import {expect} from "chai";
import RunningProcessStatus from "../source/models/enums/running_process_status";
import {User} from "../source/utilities/get_authorization_headers";

describe("Ingest project files test", () => {
  let projectId: string, user: User, email: string, password: string, checkPipeline, checkPipelineTimeout: number, checkPipelineIterations: number
  beforeEach(() => {
    email = process.env.AVVIR_SANDBOX_EMAIL
    password = process.env.AVVIR_SANDBOX_PASSWORD
    projectId = process.env.AVVIR_SANDBOX_PROJECT_ID
    checkPipelineTimeout = 1000;
    checkPipelineIterations = 100


    checkPipeline = (pipelineResponse, user, index = 0) => {
      console.log("Checking Pipeline:", index + " of " + checkPipelineIterations + " iterations");
      return new Promise((resolve, reject) => {
        AvvirApi.other.checkPipelineStatus({projectId}, pipelineResponse.id, user)
            .then((response) => {
              // console.log(index, response);
              if (index > checkPipelineIterations) {
                reject("Too Many Calls: Check endpoint to make sure the implementation isn't flawed.")
              } else if (response.status !== RunningProcessStatus.COMPLETED) {
                setTimeout( () => resolve(checkPipeline(response, user,  ++index)), checkPipelineTimeout );
              } else {
                resolve(response);
              }
            })
      })
    }
  })

  it("Copies the file into Avvir's cloud storage", function(done) {
    this.timeout(0)
    let apiCloudFile: ApiCloudFile = new ApiCloudFile({
      url: 'https://storage.googleapis.com/avvir-public-readonly/test-fixture.txt',
      purposeType: OTHER
    })

    let pipelineResponse: ApiPipeline;

    AuthApi.login(email, password)
        .then((user) => {
          AvvirApi.files.createProjectFile({projectId}, apiCloudFile, user)
              .then((apiCloudFile) => {
                let pipeline: ApiPipelineArgument = new ApiPipeline({
                  name: Pipelines.INGEST_PROJECT_FILE,
                  firebaseProjectId: projectId,
                  options: {
                    url: apiCloudFile.url,
                    fileType: 'txt'
                  }
                })
                AvvirApi.pipelines.triggerPipeline(pipeline, user)
                .then((pipelineResponse) => {
                  expect(pipelineResponse.status).to.eq(RunningProcessStatus.RUNNING);

                  checkPipeline(pipelineResponse, user)
                      .then((response) => {
                        AvvirApi.files.listProjectFiles({projectId}, user).then((projectFiles) => {
                          let url = projectFiles.slice(-1)[0].url;
                          let isExternalUrl = new RegExp(`https://storage.googleapis.com/avvir-portal-acceptance.appspot.com/project_uploads/${[projectId]}/\\d\\d\\d\\d-\\d\\d-\\d\\d_\\d\\d-\\d\\d-\\d\\d_test-fixture.txt`)
                          expect(isExternalUrl.test(url)).to.eq(true);
                          done()
                        }).catch((err)=>{
                          done(err)
                        });
                      }).catch((err)=>{
                        done(err);
                      });
                }).catch((err)=>{
                  done(err);
                });
              }).catch((err)=>{
                done(err);;
              })
        }).catch((err)=>{
          done(err);;
        });



  })
});