import AuthApi from "../source/api/auth_api";
import {describe} from "mocha";
import {expect} from "chai";
import {User} from "../source/utilities/get_authorization_headers";
import {sandbox} from "../tests/test_utils/setup_tests";
import Config from "../source/config";
import ApiPipeline, {ApiPipelineArgument} from "../source/models/api/api_pipeline";
import PipelineApi from "../source/api/pipeline_api";
import RunningProcessStatus from "../source/models/enums/running_process_status";
import ProjectApi from "../source/api/project_api";
import Http from "../source/utilities/http";
import checkFetchStatus from "../source/utilities/check_fetch_status";


describe("Process an associated scan", () => {
  let projectId: string, user: User, email: string, password: string, floorId: string, scanDatasetId: string;
  beforeEach(() => {
    email = process.env.AVVIR_SANDBOX_EMAIL
    password = process.env.AVVIR_SANDBOX_PASSWORD
    projectId = '-Mk8kNkZoSOVlAewkBqc';
    sandbox.stub(Config, "sharedErrorHandler");
  })

  describe("when a project has a scan dataset and processed scan",  () => {
    let login;
    beforeEach(() => {
      login = AuthApi.login(email, password);
    });

    it("can compute deviations", () => {
      // this.timeout(0)
      return AuthApi.login(email, password).then((user) => {
        let filename = "abc"
        return ProjectApi.getProjectDeviationsReportTsv({projectId}, user).then(tsv => {
           expect(tsv).to.contain("Deviation Report for");
           let rows = tsv.split("\n");
           expect(rows[1]).to.contain("Floor");
           expect(rows[1]).to.contain("Avvir Viewer ID");
           expect(rows[1]).to.contain("Navisworks GUID");
          });
          // console.log()
      })


    });

  });

});