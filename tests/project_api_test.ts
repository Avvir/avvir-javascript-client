import "./test_utils/setup_tests";
import { expect } from "chai";
import fetchMock from "fetch-mock";
import moment from "moment";

import ApiMasterformat from "../source/javascript/models/api/api_masterformat";
import ApiProjectCostAnalysisProgress from "../source/javascript/models/api/api_project_cost_analysis_progress";
import ApiProjectMasterformatProgress from "../source/javascript/models/api/api_project_masterformat_progress";
import DateConverter from "../source/javascript/services/converters/date_converter";
import ProjectApi from "../source/javascript/services/gateway_api_services/project_api";
import WebGatewayApi from "../source/javascript/services/gateway_api_services/web_gateway_api";
import { FIREBASE } from "../source/javascript/models/domain/enums/user_auth_type";

describe("ProjectApi", () => {
  let user;
  beforeEach(() => {
    user = {
      authType: FIREBASE,
      firebaseUser: {
        idToken: "some-firebase.id.token"
      }
    };
  });

  describe("#listProjectsForOrganization", () => {
    beforeEach(() => {
      fetchMock.get(`${WebGatewayApi.baseUrl}/client-accounts/some-organization-id/projects`, {
        status: 200,
        body: [{
          projectId: "some-project-id",
          name: "Some Project",
          archivedAt: DateConverter.dateToInstant(moment("2019-04-01"))
        }]
      });
    });

    it("makes an authenticated call to the endpoint", () => {
      ProjectApi.listProjectsForOrganization("some-organization-id", user);

      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/client-accounts/some-organization-id/projects`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#getProject", () => {
    beforeEach(() => {
      fetchMock.get(`${WebGatewayApi.baseUrl}/projects/some-project-id`, 200);
    });

    it("makes a request to the gateway api", () => {
      ProjectApi.getProject("some-project-id", {
        authType: "GATEWAY_JWT",
        gatewayUser: { idToken: "some-firebase.id.token" }
      });
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      ProjectApi.getProject("some-project-id", {
        authType: "GATEWAY_JWT",
        gatewayUser: { idToken: "some-firebase.id.token" }
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("#updateProject", () => {
    beforeEach(() => {
      fetchMock.patch(`${WebGatewayApi.baseUrl}/projects/some-project-id`, 200);
    });

    it("makes a request to the gateway", () => {
      ProjectApi.updateProject("some-project-id", {
        name: "Some Project Name"
      }, user);

      expect(fetchMock.lastUrl()).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id`);
      expect(fetchMock.lastOptions().headers["Content-Type"]).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      ProjectApi.updateProject("some-project-id", {
        name: "Some Project Name"
      }, user);

      expect(fetchMock.lastOptions().headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#saveScannedProjectMasterformatProgress", () => {
    let progress;
    beforeEach(() => {
      progress = [new ApiProjectMasterformatProgress(
        new ApiMasterformat(2016, "00 00 01"),
        0.8,
        DateConverter.dateToInstant(moment("2018-04-01")))];
      fetchMock.post(`${WebGatewayApi.baseUrl}/projects/some-project-id/masterformat-progress`, 200);
    });

    it("makes a call to the masterformat progress endpoint", () => {
      ProjectApi.saveScannedProjectMasterformatProgress(
        { projectId: "some-project-id" },
        progress,
        { firebaseUser: { idToken: "some-firebase.id.token" } });
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/masterformat-progress`);
      expect(JSON.parse(fetchCall[1].body)).to.deep.eq([{
        masterformat: { version: 2016, code: "00 00 01" },
        scanDate: DateConverter.dateToInstant(moment("2018-04-01")),
        percentComplete: 0.8
      }]);
    });

    it("sends the request with authorization headers", () => {
      ProjectApi.saveScannedProjectMasterformatProgress(
        { projectId: "some-project-id" },
        progress,
        user);

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    it("resolves the promise", () => {
      return ProjectApi.saveScannedProjectMasterformatProgress(
        { projectId: "some-project-id" },
        progress,
        { firebaseUser: { idToken: "some-firebase.id.token" } });
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.post(`${WebGatewayApi.baseUrl}/projects/some-project-id/masterformat-progress`,
          { status: 500, body: { some: "body" }, sendAsJson: true },
          { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        let rejected = false;
        return ProjectApi.saveScannedProjectMasterformatProgress(
          { projectId: "some-project-id" },
          progress,
          { firebaseUser: { idToken: "some-firebase.id.token" } })
          .catch(() => {rejected = true;})
          .finally(() => {
            expect(rejected).to.eq(true);
          });
      });
    });
  });

  describe("#saveProjectCostAnalysisProgress", () => {
    let progress;
    beforeEach(() => {
      progress = {
        date: DateConverter.dateToInstant(moment("2018-04-01")),
        data: [new ApiProjectCostAnalysisProgress({
          masterformatCode: "00 00 01",
          sequence: "100",
          name: "some-name",
          description: "some-description",
          unitOfMeasure: "some-unit-of-measure",
          unitCost: 100.1,
          quantity: 0,
          totalCost: 10000.24,
          bimQuantity: 1,
          reportedInstalled: 1,
          installedQuantity: 1,
          installedCost: 10000.24,
          analysisDate: 0
        })]
      };
      fetchMock.post(`${WebGatewayApi.baseUrl}/projects/some-project-id/cost-analysis-progress`, 200);
    });

    it("makes a call to the cost analysis progress endpoint", () => {
      ProjectApi.saveProjectCostAnalysisProgress(
        { projectId: "some-project-id" },
        progress,
        { firebaseUser: { idToken: "some-firebase.id.token" } });
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/cost-analysis-progress`);
      expect(JSON.parse(fetchCall[1].body)).to.deep.eq({
        date: DateConverter.dateToInstant(moment("2018-04-01")),
        data: [{
          analysisDate: 0,
          masterformatCode: "00 00 01",
          sequence: "100",
          name: "some-name",
          description: "some-description",
          unitOfMeasure: "some-unit-of-measure",
          unitCost: 100.1,
          quantity: 0,
          totalCost: 10000.24,
          bimQuantity: 1,
          reportedInstalled: 1,
          installedQuantity: 1,
          installedCost: 10000.24,
        }]
      });
    });

    it("sends the request with authorization headers", () => {
      ProjectApi.saveProjectCostAnalysisProgress(
        { projectId: "some-project-id" },
        progress,
        user);

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    it("resolves the promise", () => {
      return ProjectApi.saveProjectCostAnalysisProgress(
        { projectId: "some-project-id" },
        progress,
        { firebaseUser: { idToken: "some-firebase.id.token" } });
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.post(`${WebGatewayApi.baseUrl}/projects/some-project-id/cost-analysis-progress`,
          { status: 500, body: { some: "body" }, sendAsJson: true },
          { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        let rejected = false;
        return ProjectApi.saveProjectCostAnalysisProgress(
          { projectId: "some-project-id" },
          progress,
          { firebaseUser: { idToken: "some-firebase.id.token" } })
          .catch(() => {rejected = true;})
          .finally(() => {
            expect(rejected).to.eq(true);
          });
      });
    });
  });

  describe("#saveScheduledProjectMasterformatProgress", () => {
    let progress;
    beforeEach(() => {
      progress = [new ApiProjectMasterformatProgress(
        new ApiMasterformat(2016, "00 00 01"),
        0.8,
        DateConverter.dateToInstant(moment("2018-04-01")))];
      fetchMock.post(`${WebGatewayApi.baseUrl}/projects/some-project-id/scheduled-masterformat-progress`, 200);
    });

    it("makes a call to the scheduled masterformat progress endpoint", () => {
      ProjectApi.saveScheduledProjectMasterformatProgress(
        { projectId: "some-project-id" },
        progress,
        { firebaseUser: { idToken: "some-firebase.id.token" } });
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/scheduled-masterformat-progress`);
      expect(JSON.parse(fetchCall[1].body)).to.deep.eq([{
        masterformat: { version: 2016, code: "00 00 01" },
        scanDate: DateConverter.dateToInstant(moment("2018-04-01")),
        percentComplete: 0.8
      }]);
    });

    it("sends the request with authorization headers", () => {
      ProjectApi.saveScheduledProjectMasterformatProgress(
        { projectId: "some-project-id" },
        progress,
        user);

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    it("resolves the promise", () => {
      return ProjectApi.saveScheduledProjectMasterformatProgress(
        { projectId: "some-project-id" },
        progress,
        { firebaseUser: { idToken: "some-firebase.id.token" } });
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.post(`${WebGatewayApi.baseUrl}/projects/some-project-id/scheduled-masterformat-progress`,
          { status: 500, body: { some: "body" }, sendAsJson: true },
          { overwriteRoutes: true });
      });

      it("rejects the promise", () => {
        let rejected = false;
        return ProjectApi.saveScheduledProjectMasterformatProgress(
          { projectId: "some-project-id" },
          progress,
          { firebaseUser: { idToken: "some-firebase.id.token" } })
          .catch(() => {rejected = true;})
          .finally(() => {
            expect(rejected).to.eq(true);
          });
      });
    });
  });

  describe("#getProjectCostAnalysisProgress", () => {
    beforeEach(() => {
      fetchMock.get(`${WebGatewayApi.baseUrl}/projects/some-project-id/cost-analysis-progress`, {
        status: 200,
        body: {
          "data": "hello world"
        }
      });
    });

    it("makes a call to retrieve the cost analysis progress endpoint", () => {
      ProjectApi.getProjectCostAnalysisProgress(
        { projectId: "some-project-id" },
        { firebaseUser: { idToken: "some-firebase.id.token" } }
      );
      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/cost-analysis-progress`);
    });

    it("sends the request with authorization headers", () => {
      ProjectApi.getProjectCostAnalysisProgress(
        { projectId: "some-project-id" },
        user);

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

  });

  describe("#getScannedProjectMasterformatProgress", () => {
    beforeEach(() => {
      fetchMock.get(`${WebGatewayApi.baseUrl}/projects/some-project-id/masterformat-progress`, 200);
    });

    it("makes a request to the gateway api", () => {
      ProjectApi.getScannedProjectMasterformatProgress({ projectId: "some-project-id" }, {
        authType: "GATEWAY_JWT",
        gatewayUser: { idToken: "some-firebase.id.token" }
      });
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/masterformat-progress`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      ProjectApi.getScannedProjectMasterformatProgress({ projectId: "some-project-id" }, {
        authType: "GATEWAY_JWT",
        gatewayUser: { idToken: "some-firebase.id.token" }
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("#getScheduledProjectMasterformatProgress", () => {
    beforeEach(() => {
      fetchMock.get(`${WebGatewayApi.baseUrl}/projects/some-project-id/scheduled-masterformat-progress`, 200);
    });

    it("makes a request to the gateway api", () => {
      ProjectApi.getScheduledProjectMasterformatProgress({ projectId: "some-project-id" }, {
        authType: "GATEWAY_JWT",
        gatewayUser: { idToken: "some-firebase.id.token" }
      });
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/scheduled-masterformat-progress`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      ProjectApi.getScheduledProjectMasterformatProgress({ projectId: "some-project-id" }, {
        authType: "GATEWAY_JWT",
        gatewayUser: { idToken: "some-firebase.id.token" }
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("#listProjectFloorFiles", () => {
    beforeEach(() => {
      fetchMock.get(`${WebGatewayApi.baseUrl}/projects/some-project-id/floor-files`,
        {
          status: 200,
          body: [{
            floorId: "some-floor-id",
            files: [{
              url: "some-file-url.com",
              purposeType: "OTHER"
            }],
          }]
        });
    });

    it("includes auth headers and makes a request to the gateway", () => {
      ProjectApi.listProjectFloorFiles({ projectId: "some-project-id" },
        {
          authType: "GATEWAY_JWT",
          gatewayUser: { idToken: "some-firebase.id.token" }
        });
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/floor-files`);
      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });
  });
});
