import {sandbox} from "../test_utils/setup_tests";
import {expect} from "chai";
import fetchMock from "fetch-mock";
import _ from "underscore";

import PipelineApi from "../../source/api/pipeline_api";
import {FIREBASE} from "../../source/models/enums/user_auth_type";
import Config from "../../source/config";
import Http from "../../source/utilities/http";
import ApiPipeline from "../../source/models/api/api_pipeline";
import RunningProcessStatus from "../../source/models/enums/running_process_status";

describe("PipelineApi", () => {
  let user;
  beforeEach(() => {
    fetchMock.resetBehavior();
    user = {authType: FIREBASE, firebaseUser: {idToken: "some-firebase.id.token"}};

  });

  describe("#triggerJobStepsPipeline", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/pipeline/some-organization-id/some-project-id/some-floor-id/some-scan-dataset-id/trigger`, 200);
    });

    it("Calls the correct URL", () => {
      PipelineApi.triggerJobStepsPipeline({
          accountId: "some-organization-id",
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-dataset-id"
        },
        {},
        { authType:FIREBASE, firebaseUser: {idToken: "some-firebase.id.token" }});

      expect(fetchMock.lastUrl()).to.eq(
        `${Http.baseUrl()}/pipeline/some-organization-id/some-project-id/some-floor-id/some-scan-dataset-id/trigger`
      );
    });
    describe("#triggerPipeline", () => {
      let request;
      beforeEach(() => {
        fetchMock.post(`${Http.baseUrl()}/pipeline`, (url, req, opts)=>{
          const { name, id } = req.body;
          const apiResponse = new ApiPipeline({
            status: RunningProcessStatus.RUNNING,
            name,
            id
          });
          return {
            status: 200,
            body: apiResponse,
            headers: {"ContentType": "application/json"}
          }
        });
      });
      it("Calls the correct URL", () => {
        // id: 1,
        // name: "some-name",
        // externalId: "some-external-id",
        // externalUrl: "someUrl.com",
        // firebaseFloorId: "some-floor-id",
        // firebaseProjectId: "some-project-id",
        // firebaseScanDatasetId: "some-dataset-id",
        // status: RunningProcessStatus.RUNNING
        PipelineApi.triggerPipeline(
            new ApiPipeline({}),
            { authType:FIREBASE, firebaseUser: {idToken: "some-firebase.id.token" }}
        );
        expect(fetchMock.lastUrl()).to.eq(`${Http.baseUrl()}/pipeline`);
      });

      it("Returns an ApiPipeline type",  () => {
        let request = new ApiPipeline({
          name: "some-name",
          id: 1
        });
        PipelineApi.triggerPipeline(
            request,
            { authType:FIREBASE, firebaseUser: {idToken: "some-firebase.id.token" }}
        )

        const lastCall = fetchMock.lastCall()[1];

        expect(lastCall.body).to.be.eq(JSON.stringify(request));
        expect(lastCall.headers.Accept).to.be.eq("application/json");

      })

    });
    describe("when the pipeline fails to trigger", () => {
      beforeEach(() => {
        const alreadyRunningResponse = {
          body: {
            "jobLogs": "Started by remote host 10.100.0.16" +
              "\r\n[Pipeline] readJSON" +
              "\r\n[Pipeline] podTemplate" +
              "\r\n[Pipeline] {" +
              "\r\n[Pipeline] node" +
              "\r\nStill waiting to schedule task" +
              "\r\nWaiting for next available executor",
            "error": "Pipeline job already running",
            "errorDetails": "Jenkins job number: 4"
          },
          status: 401,
          headers: {"ContentType": "application/json"}

        };

        const filesMissingResponse = {
          body: {
            "message": "Cannot trigger pipeline job for this scanDataset",
          },
          status: 401,
          headers: {"ContentType": "application/json"}
        };

        fetchMock.mock(`begin:${Http.baseUrl()}/pipeline/`, (url) => {
          const startLength = `${Http.baseUrl()}/pipeline/`.length;
          const argsString = url.slice(startLength).split("/");
          const floorId = argsString[2];
          const scanDatasetId = argsString[3];

          if (scanDatasetId === "some-scan-dataset-with-an-already-running-job") {
            return alreadyRunningResponse;
          } else if (floorId === "some-non-existent-floor-id") {
            return filesMissingResponse;
          } else {
            return {
                status: 500,
                body: {message: "some unfortunate error"},
                headers: {"ContentType": "application/json"}
            };
          }
        }, {overwriteRoutes: true});
      });

      it("rejects the promise and calls the shared error handler", () => {
        fetchMock.mock(`begin:${Http.baseUrl()}/pipeline/`, (url) => {
          return {
              status: 500,  body: {message: "some unfortunate error"},
              headers: {"ContentType": "application/json"}
          }
        }, {overwriteRoutes: true});

        sandbox.spy(Config, "sharedErrorHandler");

        return PipelineApi.triggerJobStepsPipeline({
            accountId: "some-organization-id",
            projectId: "some-project-id",
            floorId: "some-floor-id",
            scanDatasetId: "some-scan-id"
          },
          {},
          {authType: FIREBASE, firebaseUser: {idToken: "some-firebase.id.token"}}
        ).catch((err) => {
          return err;
        }).then((err) => {
          expect(err.status).to.eql(500);
          expect(err.message).to.eq("some unfortunate error");
          expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({
            error: err,
            action: "triggerPipeline",
            arguments: [{
              accountId: "some-organization-id",
              projectId: "some-project-id",
              floorId: "some-floor-id",
              scanDatasetId: "some-scan-id"
            },
              {},
              {authType: FIREBASE, firebaseUser: {idToken: "some-firebase.id.token"}}]
          });
        });
      });

      it("handles missing file errors", () => {
        sandbox.stub(Config, "sharedErrorHandler");

        return PipelineApi.triggerJobStepsPipeline({
            accountId: "some-organization-id",
            projectId: "some-project-id",
            floorId: "some-non-existent-floor-id",
            scanDatasetId: "some-scan-dataset-id"
          },
          {},
          {authType: FIREBASE, firebaseUser: {idToken: "some-firebase.id.token"}})
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({
              // type: API_FAILURE,
            });
          });
      });

      it("handles pipeline already running errors", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return PipelineApi.triggerJobStepsPipeline({
            accountId: "some-organization-id",
            projectId: "some-project-id",
            floorId: "some-floor-id",
            scanDatasetId: "some-scan-dataset-with-an-already-running-job"
          },
          {},
          {authType: FIREBASE, firebaseUser: {idToken: "some-firebase.id.token"}})
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({
             // TODO
            });
          });
      });
    });
  });
});
