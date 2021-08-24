import AuthApi from "../source/api/auth_api";
import {describe} from "mocha";
// import Avvir from "../avvir";
import AvvirApi from "../source/avvir_api";
import ApiCloudFile from "../source/models/api/api_cloud_file";
import {OTHER} from "../source/models/enums/purpose_type";
import Pipelines from "../source/models/enums/pipeline_types";
import ApiPipeline, {ApiPipelineArgument} from "../source/models/api/api_pipeline";
import {expect} from "chai";
import RunningProcessStatus from "../source/models/enums/running_process_status";

describe("Ingest project files test", () => {
    let projectId, user, email, password, checkPipeline
    beforeEach(() => {
        email = process.env.AVVIR_SANDBOX_EMAIL
        password = process.env.AVVIR_SANDBOX_PASSWORD
        projectId = process.env.AVVIR_SANDBOX_PROJECT

        checkPipeline = (pipelineResponse, index = 0) => {
            return new Promise((resolve, reject)=> {
                AvvirApi.other.checkPipelineStatus({projectId}, pipelineResponse.id, user)
                .then((response)=>{
                    if(index > 10) {
                        reject("Too Many Calls: Check endpoint to make sure the implementation isn't flawed.")
                    }
                    else if(response.status !== RunningProcessStatus.COMPLETED) {
                        resolve(checkPipeline(response.id, ++index))
                    }else {
                        resolve(response);
                    }
                })
            })
        }
    })

    it("Copies the file into Avvir's cloud storage", () => {
        let apiCloudFile: ApiCloudFile = new ApiCloudFile({url: "TODO: get a file", purposeType: OTHER})

        let pipelineResponse: ApiPipeline;

        AuthApi.login("avvir-client-integration-user@example.com", "password")
            .catch((err)=>{
                console.log(err);
            })
        .then((user)=>{
            console.log("logged in", user);
            AvvirApi.files.createProjectFile({projectId}, apiCloudFile, user)
            .then((apiCloudFile) => {
                let pipeline: ApiPipelineArgument = new ApiPipeline({
                    name: Pipelines.INGEST_PROJECT_FILE,
                    firebaseProjectId: projectId,
                    options: {url: apiCloudFile.url}
                })
                AvvirApi.pipelines.triggerPipeline(pipeline, user).then((pipelineResponse)=>{
                    expect(pipelineResponse.status).to.eq(RunningProcessStatus.RUNNING)
                });

                checkPipeline(pipelineResponse)
                    .catch((err)=>{
                        console.log(err)
                    })
                    .then((response)=>{
                        console.log(response);
                    });
                // do {
                //     AvvirApi.other.checkPipelineStatus({projectId}, pipelineResponse.id, user)
                //     setTimeout( () =>{
                //         console.log("Waited 10 seconds, checking pipeline status")
                //     }, 10000)
                // } while (pipelineResponse.status !== RunningProcessStatus.COMPLETED)
            })
        })


        AvvirApi.files.listProjectFiles({projectId}, user).then((projectFiles) => {
            expect(projectFiles.slice(-1)[0].url).to.be("An avvir gcs url?")

        })

    })
});