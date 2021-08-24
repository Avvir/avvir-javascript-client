import AuthApi from "../source/api/auth_api";
import {describe} from "mocha";
import Avvir from "../avvir";
import ApiCloudFile from "../source/models/api/api_cloud_file";
import {OTHER} from "../source/models/enums/purpose_type";
import Pipelines from "../source/models/enums/pipeline_types";
import ApiPipeline, {ApiPipelineArgument} from "../source/models/api/api_pipeline";
import {expect} from "chai";
import RunningProcessStatus from "../source/models/enums/running_process_status";

describe("Ingest project files test", () => {
    let projectId, user, email, password
    beforeEach(() => {
        email = process.env.AVVIR_SANDBOX_EMAIL
        password = process.env.AVVIR_SANDBOX_PASSWORD
        projectId = process.env.AVVIR_SANDBOX_PROJECT
        user = AuthApi.login("avvir-client-integration-user@example.com", "password")
    })
    it("Copies the file into Avvir's cloud storage", () => {
        let apiCloudFile: ApiCloudFile = new ApiCloudFile({url: "TODO: get a file", purposeType: OTHER})

        let pipelineResponse: ApiPipeline
        Avvir.api.files.createProjectFile({projectId}, apiCloudFile, user).then((apiCloudFile) => {
            let pipeline: ApiPipelineArgument = new ApiPipeline({
                name: Pipelines.INGEST_PROJECT_FILE,
                firebaseProjectId: projectId,
                options: {url: apiCloudFile.url}
            })
            Avvir.api.pipelines.triggerPipeline(pipeline, user).then((pipelineResponse)=>{
                expect(pipelineResponse.status).to.eq(RunningProcessStatus.RUNNING)
            })
            do {
                Avvir.api.other.checkPipelineStatus({projectId}, pipelineResponse.id, user)
                setTimeout( () =>{
                    console.log("Waited 10 seconds, checking pipeline status")
                }, 10000)
            } while (pipelineResponse.status !== RunningProcessStatus.COMPLETED)
        })

        Avvir.api.files.listProjectFiles({projectId}, user).then((projectFiles) => {
            expect(projectFiles.slice(-1)[0].url).to.be("An avvir gcs url?")

        })

    })
});