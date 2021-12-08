import {sandbox} from "../test_utils/setup_tests";
import {expect} from "chai";
import fetchMock from "fetch-mock";

import WebGatewayApi from "../../source/api/web_gateway_api";
import {FIREBASE, GATEWAY_JWT} from "../../source/models/enums/user_auth_type";
import {SUPERADMIN, USER} from "../../source/models/enums/user_role";
import {ELEMENTS_STATUSES_UPDATED} from "../../source";
import Config from "../../source/config";
import Http from "../../source/utilities/http";
import {describe} from "mocha";

describe("WebGatewayApi", () => {
  describe("::login", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/login`, {
        status: 200,
        body: {storageToken: "some-auth-token", redirectUrl: "/projects/some-project-id"}
      });
    });

    it("makes a call to the login endpoint", () => {
      WebGatewayApi.login("some-username", "some-password");
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/login`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      WebGatewayApi.login("some-username", "some-password");
      const lastFetchOpts = fetchMock.lastOptions();
      const base64Data = Buffer.from("some-username:some-password").toString("base64");
      const authHeader = `Basic ${base64Data}`;

      expect(lastFetchOpts.headers.Authorization).to.eq(authHeader);
    });

    it("resolves with the authorization token and redirect url", () => {
      return WebGatewayApi.login("some-username", "some-password")
          .then((result) => {
            expect(result.body.storageToken).to.eq("some-auth-token");
            expect(result.body.redirectUrl).to.eq("/projects/some-project-id");
          });
    });
  });

  describe("::getCustomFirebaseToken", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/login`, {
        status: 200,
        body: {storageToken: "some-auth-token", redirectUrl: "/projects/some-project-id"}
      });
    });

    it("makes a call to the login endpoint", () => {
      WebGatewayApi.getCustomFirebaseToken({
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/login`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      WebGatewayApi.getCustomFirebaseToken({
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });

    it("resolves with the authorization token and redirect url", () => {
      return WebGatewayApi.getCustomFirebaseToken({
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      })
          .then((result) => {
            expect(result.body.storageToken).to.eq("some-auth-token");
          });
    });
  });

  describe("::connectProjectToStructionSite", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/connect-to-structionsite?structionsite-access-token=some-structionsite-access-token&structionsite-project-url=structionsite-url/projects/10`,
          200);
    });

    it("makes a request to the gateway", () => {
      WebGatewayApi.connectProjectToStructionSite({projectId: "some-project-id"}, "structionsite-url/projects/10", "some-structionsite-access-token", {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastCall()[0])
          .to
          .eq(`${Http.baseUrl()}/projects/some-project-id/connect-to-structionsite?structionsite-access-token=some-structionsite-access-token&structionsite-project-url=structionsite-url/projects/10`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      WebGatewayApi.connectProjectToStructionSite({projectId: "some-project-id"}, "structionsite-url/projects/10", "some-structionsite-access-token", {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::createInvitation", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/users/invitations`, {
        userEmail: "someone@example.com",
        token: "some-token",
        expiry: {
          epochSecond: 1535700000,
          nano: 0
        }
      });
    });

    it("makes a call to the invitation generation endpoint", () => {
      WebGatewayApi.createInvitation("someone@example.com", "USER", "some-organization-id", "some-project", {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/invitations`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().headers["Content-Type"]).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(JSON.stringify(
          {
            userEmail: "someone@example.com",
            role: "USER",
            clientAccountId: "some-organization-id",
            projectId: "some-project"
          }
      ));
    });

    it("sends the request with an Authorization header", () => {
      WebGatewayApi.createInvitation("someone@example.com", "USER", "some-organization-id", "some-project", {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::getInvitation", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/users/invitations/some-token`, {
        status: 200,
        body: {
          userEmail: "someone@example.com",
          token: "some-token",
          expiry: {
            epochSecond: 1535700000,
            nano: 0
          },
          role: "USER",
          resourceName: "Some Company Name"
        }
      });
    });

    it("makes a call to the invitation details endpoint", () => {
      WebGatewayApi.getInvitation("some-token", null);

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/invitations/some-token`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("resolves with the invitation details", () => {
      return WebGatewayApi.getInvitation("some-token", null)
          .then((invitation) => {
            expect(invitation.resourceName).to.eq("Some Company Name");
          });
    });
  });

  describe("::acceptInvitation", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/users/accept-invitation`, 200);
    });

    it("makes a call to the accept invitation endpoint", () => {
      WebGatewayApi.acceptInvitation("some-invitation-token", "some-password-123");

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/accept-invitation`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().headers["Content-Type"]).to.eq("application/json");
      expect(fetchMock.lastOptions().body)
          .to.eq(`{"invitationToken":"some-invitation-token","password":"some-password-123"}`);
    });
  });

  describe("::exportPushedToBimIfc", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/export-ifc?type=as_built`, 200);
    });

    it("makes a request to the export ifc endpoint", () => {
      WebGatewayApi.exportIfc({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, "as_built", {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      },);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/export-ifc?type=as_built`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      WebGatewayApi.exportIfc({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, "as_built", {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      },);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });

    describe("when there is an error with the request", () => {
      beforeEach(() => {
        fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/export-ifc?type=as_built`,
            {
              status: 404,
              headers: {'Content-Type': 'application/json'},
              body: {
                error: "Not Found",
                exception: "io.avvir.avvirwebgateway.exceptions.ProjectNotFound",
                message: "No such Project",
                path: "/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/export-ifc?type=as_built",
              },
            }, {overwriteRoutes: true});
      });

      it("shows that there was an error", () => {
        sandbox.stub(Config, "sharedErrorHandler");

        return WebGatewayApi.exportIfc({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, "as_built", {
          authType: GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: USER}
        },).then(() => {
          expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({
            action: "exportIfc",
            error: {
              verboseMessage: "404 Not Found: 'No such Project' at `.../projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/export-ifc?type=as_built`",
              message: "No such Project",
            }
          });
        });
      });
    });
  });

  describe("::checkExportedIfc", () => {
    let dispatchSpy;
    beforeEach(() => {
      dispatchSpy = sandbox.spy();
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/export-ifc/3?type=as_built`, 200);
    });

    it("makes a request to check if the export has finished", () => {
      WebGatewayApi.checkExportedIfc({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, "3", "as_built", {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      },);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/export-ifc/3?type=as_built`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      WebGatewayApi.checkExportedIfc({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, "3", "as_built", {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      },);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });

    describe("when there was an error", () => {
      beforeEach(() => {
        fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/export-ifc/3?type=as_built`, {
          status: 404,
          headers: {'Content-Type': 'application/json'},
          body: {
            error: "Not Found",
            exception: "io.avvir.avvirwebgateway.exceptions.ProjectNotFound",
            message: "No such Project",
            path: "/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/export-ifc/3?type=as_built",
          },
        }, {
          overwriteRoutes: true
        });
      });

      it("shows that there was an error", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return WebGatewayApi.checkExportedIfc({
              projectId: "some-project-id",
              floorId: "some-floor-id",
              scanDatasetId: "some-scan-id"
            }, "3",
            "as_built", {
              authType: GATEWAY_JWT,
              gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            },).then(() => {
          expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({
            action: "checkExportedIfc",
            error: {
              verboseMessage: "404 Not Found: 'No such Project' at `.../projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/export-ifc/3?type=as_built`",
              message: "No such Project",
            }
          });
        });
      });
    });
  });

  describe("::downsampleScan", () => {
    let dispatchSpy;
    beforeEach(() => {
      dispatchSpy = sandbox.spy();
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/downsample-scan`, 200);
    });

    it("makes a request to the gateway", () => {
      WebGatewayApi.downsampleScan({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, null,);
      const lastCall = fetchMock.lastCall();

      expect(lastCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/downsample-scan`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      WebGatewayApi.downsampleScan({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, {
        firebaseUser: {
          uid: "some-email@example.com",
          idToken: "some-firebase.id.token",
          role: USER
        },
        authType: FIREBASE
      },);

      expect(fetchMock.lastOptions().headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("::getMasterformat", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/masterformats/2016`, 200);
    });

    it("makes a request to the gateway api", () => {
      WebGatewayApi.getMasterformat(2016);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/masterformats/2016`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });
  });

  describe("::pushPdfToProcore", () => {
    let dispatchSpy;
    beforeEach(() => {
      dispatchSpy = sandbox.spy();
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/push-report-to-procore/progress?procore-project-id=some-procore-project-id&procore-company-id=some-company-id&procore-access-token=some-procore-access-token`,
          200);
    });

    it("includes the authorization headers", () => {
      WebGatewayApi.pushPdfToProcore({
            projectId: "some-project-id",
            floorId: "some-floor-id",
            scanDatasetId: "some-scan-dataset-id"
          },
          "some-procore-project-id",
          "some-company-id",
          "some-procore-access-token",
          "progress",
          {
            authType: GATEWAY_JWT,
            gatewayUser: {idToken: "some-firebase.id.token", role: USER},
          },
      );

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });

    it("makes a request to the gateway api", () => {
      WebGatewayApi.pushPdfToProcore({
            projectId: "some-project-id",
            floorId: "some-floor-id",
            scanDatasetId: "some-scan-dataset-id"
          },
          "some-procore-project-id",
          "some-company-id",
          "some-procore-access-token",
          "progress",
          {
            authType: GATEWAY_JWT,
            gatewayUser: {idToken: "some-firebase.id.token", role: USER}
          },
      );
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0])
          .to
          .eq(`${Http.baseUrl()}/projects/some-project-id/push-report-to-procore/progress?procore-project-id=some-procore-project-id&procore-company-id=some-company-id&procore-access-token=some-procore-access-token`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });
  });

  describe("::getProcoreProjects", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/procore-projects?procore-access-token=some-procore-access-token`,
          {status: 200, body: ["some-procore-project"]});
    });

    it("includes auth headers and makes a request to the gateway", () => {
      WebGatewayApi.getProcoreProjects("some-project-id", "some-procore-access-token", {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/procore-projects?procore-access-token=some-procore-access-token`);
      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });
  });

  describe("::getGcpBearerToken", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/gcpAccessToken`,
          {accessToken: "some-token"});
    });

    it("makes a request to the gateway", () => {
      WebGatewayApi.getGcpBearerToken({projectId: "some-project-id"}, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/gcpAccessToken`);
    });
  });

  describe("::triggerArgoRunProgress", () => {
    let dispatchSpy;
    beforeEach(() => {
      dispatchSpy = sandbox.spy();
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/run-progress-and-deviations?deviationsFlag=&bimSourceFileExtension=ifc`,
          {
            status: 200,
          });
    });

    it("includes auth headers and makes a request to the gateway", () => {
      WebGatewayApi.triggerArgoRunProgressAndDeviations({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, "", "ifc", {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      },);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/run-progress-and-deviations?deviationsFlag=&bimSourceFileExtension=ifc`);
      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });
  });

  describe("::recordUserAction", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/user-actions`, 200);
    });

    it("makes a request to the gateway", () => {
      WebGatewayApi.recordUserActions(ELEMENTS_STATUSES_UPDATED, [{projectId: "some-project"}, {projectId: "some-other-project"}], {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/user-actions`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      WebGatewayApi.recordUserActions({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, {userAction: "Some user action info"}, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::checkRunningProcess", () => {
    let date = Date.now()
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/running-processes/12345`, {
        status: 200,
        body: {
          name: "SOME-RUNNING-PROCESS",
          id: 12345,
          startDate: date,
          endDate: date
        }
      })
    });
    it("returns a running process", () => {
      WebGatewayApi.checkRunningProcess(12345,{
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: SUPERADMIN}
      } ).then((result) => {
        expect(result.id).to.eq(12345);
        expect(result.name).to.eq("SOME-RUNNING-PROCESS");
        expect(result.startDate).to.eq(date);
        expect(result.endDate).to.eq(date);
        const fetchCall = fetchMock.lastCall();
        expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/running-processes/12345`);
        expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      });
    });
  });
});
