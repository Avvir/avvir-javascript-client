import AuthApi from "../../source/api/auth_api";
import {describe} from "mocha";
import {expect} from "chai";
import {User} from "../../source/utilities/get_authorization_headers";
import {sandbox} from "../../tests/test_utils/setup_tests";
import Config from "../../source/config";
import ApiPipeline, {ApiPipelineArgument} from "../../source/models/api/api_pipeline";
import PipelineApi from "../../source/api/pipeline_api";
import RunningProcessStatus from "../../source/models/enums/running_process_status";


describe("Process an associated scan", () => {
  let projectId: string, user: User, email: string, password: string, floorId: string, scanDatasetId: string;
  beforeEach(() => {
    email = process.env.AVVIR_SANDBOX_EMAIL
    password = process.env.AVVIR_SANDBOX_PASSWORD
    projectId = '-Mk8kNkZoSOVlAewkBqc';
    floorId = '-Mk8kPX_ISw-nO_5QZ10';
    scanDatasetId = '-Mk8vy1VMMMtaPNltVdg';
    sandbox.stub(Config, "sharedErrorHandler");
  })

  describe("when a project has a scan dataset and processed scan",  () => {
    let login;
    beforeEach(() => {
      login = AuthApi.login(email, password);
    });

    it("can compute deviations", () => {
      // this.timeout(0)
      login.then((user) => {
        console.log("user logged in")
        let pipeline: ApiPipelineArgument = new ApiPipeline({
          name: "pipeline-steps",
          firebaseProjectId: projectId,
          firebaseFloorId: floorId,
          firebaseScanDatasetId: scanDatasetId,
          options: {
            steps: ["compute-deviations"]
          }
        })
        PipelineApi.triggerPipeline(pipeline, user).then((response) => {
          console.log(`Pipeline Status: ${response.status}`);
          expect(response.status).to.be.eq(RunningProcessStatus.RUNNING);
        }).catch(console.log);
      }).catch(console.log)


    });

    it("can compute progress", () => {
      // this.timeout(0)
      login.then((user) => {
        console.log("user logged in")
        let pipeline: ApiPipelineArgument = new ApiPipeline({
          name: "pipeline-steps",
          firebaseProjectId: projectId,
          firebaseFloorId: floorId,
          firebaseScanDatasetId: scanDatasetId,
          options: {
            steps: ["compute-progress"]
          }
        })
        PipelineApi.triggerPipeline(pipeline, user).then((response) => {
          console.log(`Pipeline Status: ${response.status}`);
          expect(response.status).to.be.eq(RunningProcessStatus.RUNNING);


        });
      }).catch(console.log)
    });

    it("can compute deviations and progress", () => {
      // this.timeout(0)
      login.then((user) => {
        console.log("user logged in")
        let pipeline: ApiPipelineArgument = new ApiPipeline({
          name: "pipeline-steps",
          firebaseProjectId: projectId,
          firebaseFloorId: floorId,
          firebaseScanDatasetId: scanDatasetId,
          options: {
            steps: ["compute-deviations", "compute-progress"]
          }
        })
        PipelineApi.triggerPipeline(pipeline, user).then((response) => {
          console.log(`Pipeline Status: ${response.status}`);
          expect(response.status).to.be.eq(RunningProcessStatus.RUNNING);


        });
      }).catch(console.log)
    });
  });

});