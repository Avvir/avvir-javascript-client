import AuthApi from "../source/api/auth_api";
import {describe} from "mocha";
import ApiCloudFile from "../source/models/api/api_cloud_file";
import {BIM_NWD} from "../source/models/enums/purpose_type";
import {expect} from "chai";
import FileInformationApi from "../source/api/file_information_api";
import {sandbox} from "../tests/test_utils/setup_tests";
import Config from "../source/config";
import PipelineApi from "../source/api/pipeline_api";
import ApiPipeline, {ApiPipelineArgument} from "../source/models/api/api_pipeline";
import Pipelines from "../source/models/enums/pipeline_types";
import AvvirApi from "../source/avvir_api";
import RunningProcessStatus from "../source/models/enums/running_process_status";
import {ApiFloorPurposeType} from "../source";

describe("Assocate Project file to scan dataset files test", () => {
  let projectId: string, email: string, password: string, checkPipeline, checkPipelineTimeout: number,
      checkPipelineIterations: number, fileUrl: string;
  beforeEach(() => {
    email = process.env.AVVIR_SANDBOX_EMAIL
    password = process.env.AVVIR_SANDBOX_PASSWORD
    projectId = '-Mk8kNkZoSOVlAewkBqc';
    fileUrl = "https://storage.googleapis.com/avvir-public-readonly/old_bim.nwd"
    checkPipelineTimeout = 1000;
    checkPipelineIterations = 100
    sandbox.stub(Config, "sharedErrorHandler");
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

  describe("when a project file has been ingested and a scan dataset exists",  () => {
    beforeEach(()=>{

      // pipeline =
    })
    it("should return a success response",  function () {
      this.timeout(0)
      console.log("starting...")
      return AuthApi.login(email, password)
          .then((user) => {
            console.log("user logged in");
            let floorId = '-MlLg4ZVUYsv9oA39nOE';
            let cloudFile = new ApiCloudFile({
              url: fileUrl,
              purposeType: BIM_NWD
            });

            return AvvirApi.files.createProjectFile({projectId}, cloudFile, user)
                .then((apiCloudFile) => {
                  let pipeline: ApiPipelineArgument = new ApiPipeline({
                    name: Pipelines.INGEST_PROJECT_FILE,
                    firebaseProjectId: projectId,
                    options: {
                      url: apiCloudFile.url,
                      fileType: 'nwd'
                    }
                  })
                  return AvvirApi.pipelines.triggerPipeline(pipeline, user).then((pipelineResponse)=> {
                    return checkPipeline(pipelineResponse, user).then((pipelineResponse)=>{
                      expect(pipelineResponse.status).to.be.eq(RunningProcessStatus.COMPLETED);

                      return AvvirApi.files.listProjectFiles({projectId}, user).then((projectFiles) => {
                        let file: ApiCloudFile = projectFiles.slice(-1)[0];
                        let newFile = new ApiCloudFile({
                          url: file.url,
                          purposeType: ApiFloorPurposeType.BIM_NWD
                        });

                        return FileInformationApi.saveFloorFile({ projectId, floorId }, newFile, user)
                            .then(() => {

                              let pipeline = new ApiPipeline({
                                name: Pipelines.CREATE_AND_PROCESS_SVF,
                                firebaseProjectId: projectId,
                                firebaseFloorId: floorId,
                                options: {
                                  matchAndUpdateElements: false
                                }
                              });

                              return  PipelineApi.triggerPipeline(pipeline, user).then((pipelineResponse)=>{
                                expect(pipelineResponse.status).to.eq(RunningProcessStatus.RUNNING);
                                return checkPipeline(pipelineResponse, user).then(response => {
                                  expect(response.status).to.eq(RunningProcessStatus.COMPLETED);
                                  console.log("Completed processing bim for area: "+ floorId);

                                });

                              })

                      });
                    })
                  })
                });

                })
          })



    });
  })


});