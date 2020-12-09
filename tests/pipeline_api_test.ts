import { sandbox } from "./test_utils/setup_tests";
import { expect } from "chai";
import fetchMock from "fetch-mock";
import _ from "underscore";

import PipelineApi from "../source/pipeline_api";
import WebGatewayApi from "../source/web_gateway_api";
import { API_FAILURE } from "../source/models/enums/event_types";
import { FIREBASE } from "../source/models/enums/user_auth_type";
import { makeFakeDispatch, makeStoreContents } from "./test_utils/test_factories";

describe("PipelineApi", () => {
  let fakeDispatch, dispatchSpy, fakeGetState, user;
  beforeEach(() => {
    user = { authType: FIREBASE,firebaseUser: { idToken: "some-firebase.id.token" } };
    fakeGetState = () => makeStoreContents({
      user,
      locationMetadata: { projectId: "some-project-id", floorId: "some-floor-id" },
      selection: { projectId: "some-project-id", floorId: "some-floor-id", scanDatasetId: "some-scan-id" },
    });

    dispatchSpy = sandbox.spy();
    fakeDispatch = makeFakeDispatch(dispatchSpy, fakeGetState);
  });

  describe("#triggerPipeline", () => {
    beforeEach(() => {
      fetchMock.post(`${WebGatewayApi.baseUrl}/pipeline/some-organization-id/some-project-id/some-floor-id/some-scan-dataset-id/trigger`, 200);
    });

    it("Calls the correct URL", () => {
      PipelineApi.triggerPipeline({
          accountId: "some-organization-id",
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-dataset-id"
        },
        {},
        { firebaseUser: { idToken: "some-firebase.id.token" } },
        fakeDispatch);

      expect(fetchMock.lastUrl()).to.eq(
        `${WebGatewayApi.baseUrl}/pipeline/some-organization-id/some-project-id/some-floor-id/some-scan-dataset-id/trigger`
      );
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
          sendAsJson: true,
        };

        const filesMissingResponse = {
          body: {
            "error": "Cannot trigger pipeline job for this scanDataset",
            "errorDetails": "IFC file or processed scan file URLs missing"
          },
          status: 401,
          sendAsJson: true,
        };

        fetchMock.mock(`begin:${WebGatewayApi.baseUrl}/pipeline/`, (url) => {
          const startLength = `${WebGatewayApi.baseUrl}/pipeline/`.length;
          const argsString = url.slice(startLength).split("/");
          const floorId = argsString[2];
          const scanDatasetId = argsString[3];

          if (scanDatasetId === "some-scan-dataset-with-an-already-running-job") {
            return alreadyRunningResponse;
          } else if (floorId === "some-non-existent-floor-id") {
            return filesMissingResponse;
          } else {
            return { status: 500, body: {error: "some unfortunate error"}, sendAsJson: true };
          }
        }, { overwriteRoutes: true });
      });

      it("throws an exception and triggers AND dispatches a superadmin pipeline failed event", () => {
        return PipelineApi.triggerPipeline({
            accountId: "some-organization-id",
            projectId: "some-project-id",
            floorId: "some-floor-id",
            scanDatasetId: "some-scan-id"
          },
          {},
          { firebaseUser: { idToken: "some-firebase.id.token" } },
          fakeDispatch
        ).catch((err) => {
          expect(err.status).to.eql(500)
        }).then(() => {
          expect(dispatchSpy).to.have.been.calledWith({
            type: "pipeline_trigger_failed",
            payload: {
              floorId: "some-floor-id",
              scanDatasetId: "some-scan-id"
            }
          });
        });
      });

      it("handles missing file errors", () => {
        return PipelineApi.triggerPipeline({
            accountId: "some-organization-id",
            projectId: "some-project-id",
            floorId: "some-non-existent-floor-id",
            scanDatasetId: "some-scan-dataset-id"
          },
          {},
          { firebaseUser: { idToken: "some-firebase.id.token" } },
          fakeDispatch)
          .catch(_.noop)
          .finally(() => {
            expect(dispatchSpy).to.have.been.calledWithMatch({
              type: API_FAILURE,
            });
          });
      });

      it("handles pipeline already running errors", () => {
        return PipelineApi.triggerPipeline({
            accountId: "some-organization-id",
            projectId: "some-project-id",
            floorId: "some-floor-id",
            scanDatasetId: "some-scan-dataset-with-an-already-running-job"
          },
          {},
          { firebaseUser: { idToken: "some-firebase.id.token" } },
          fakeDispatch)
          .catch(_.noop)
          .finally(() => {
            expect(dispatchSpy).to.have.been.calledWithMatch({
              type: API_FAILURE,
            });
          });
      });
    });
  });
});
