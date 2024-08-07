import { expect } from "chai";
import { describe } from "mocha";
// @ts-ignore
import fetchMock from "fetch-mock";

import Http from "../../source/utilities/http";
import { ApiProjectArea, ApiProjectAreaWorkPackage } from "../../source";
import { ProjectSummaryApi } from "../../source/api";
import { User } from "../../source/models/domain/user";
import { UserAuthType } from "../../source/models/enums/user_auth_type";
import { UserRole } from "../../source/models/enums/user_role";

describe("ProjectSummaryApi", () => {
  let user: User;
  beforeEach(() => {
    fetchMock.resetBehavior();
    user = {
      authType: UserAuthType.FIREBASE,
      firebaseUser: { uid: "some-uid", role: UserRole.SUPERADMIN, idToken: "some-firebase.id.token" }
    };
  });

  describe("::getProjectSummary", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/summary`, 200);
    });

    it("makes a request to the gateway api", () => {
      ProjectSummaryApi.getProjectSummary("some-project-id", {
        authType: "GATEWAY_JWT",
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/summary`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      ProjectSummaryApi.getProjectSummary("some-project-id", {
        authType: "GATEWAY_JWT",
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::createProjectArea", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/areas`, new ApiProjectArea({
        id: 12,
        modelElementId: 1,
        floorId: 7,
        firebaseFloorId: "some-floor-id"
      }));
    });

    it("makes a call to the endpoint", () => {
      ProjectSummaryApi.createProjectArea("some-project-id", {
        id: 12,
        modelElementId: 1,
        floorId: 7,
        firebaseFloorId: "some-floor-id",
        progress: [],
        workPackages: []
      }, user);

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/areas`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().headers["Content-Type"]).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      ProjectSummaryApi.createProjectArea(
        "some-project-id",
        {
          id: 12,
          modelElementId: 1,
          floorId: 7,
          firebaseFloorId: "some-floor-id",
          progress: [],
          workPackages: []
        },
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: UserRole.USER }
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    })
  });

  describe("::updateProjectArea", () => {
    beforeEach(() => {
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/areas/12`, new ApiProjectArea({
        id: 12,
        modelElementId: 1,
        floorId: 7,
        firebaseFloorId: "some-floor-id"
      }));
    });

    it("makes a call to the endpoint", () => {
      ProjectSummaryApi.updateProjectArea("some-project-id", 12, {
        id: 12,
        modelElementId: 1,
        floorId: 7,
        firebaseFloorId: "some-floor-id",
        progress: [],
        workPackages: []
      }, user);

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/areas/12`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().headers["Content-Type"]).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      ProjectSummaryApi.updateProjectArea(
        "some-project-id",
        12,
        {
          id: 12,
          modelElementId: 1,
          floorId: 7,
          firebaseFloorId: "some-floor-id",
          progress: [],
          workPackages: []
        },
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: UserRole.USER }
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    })
  });

  describe("::updateProjectAreaProgress", () => {
    let projectAreaId, response;
    beforeEach(() => {
      projectAreaId = 1;
      let projectAreaProgress = new ApiProjectAreaWorkPackage({
        id: 54,
        projectWorkPackageId: 5,
        workPackageId: 3,
        status: "started",
        expectedStart: null,
        expectedCompletion: null,
        start: null,
        completion: null
      });
      response = new ApiProjectArea({
        id: 12,
        modelElementId: projectAreaId,
        workPackages: [projectAreaProgress]
      });
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/areas/${projectAreaId}`, response);
    });

    it("makes a call to the endpoint", () => {
      ProjectSummaryApi.updateProjectAreaProgress(
        "some-project-id",
        projectAreaId,
        {
          id: 12,
          modelElementId: 1,
          progress: [],
          workPackages: [{
            id: 54,
            projectAreaId,
            projectWorkPackageId: 5,
            workPackageId: 3,
            status: "started",
            expectedStart: null,
            expectedCompletion: null,
            start: null,
            completion: null
          }]
        },
        user);

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/areas/1`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      ProjectSummaryApi.updateProjectAreaProgress(
        "some-project-id",
        projectAreaId,
        {
          id: 12,
          modelElementId: 1,
          progress: [],
          workPackages: [{
            id: 54,
            projectAreaId,
            projectWorkPackageId: 5,
            workPackageId: 3,
            status: "started",
            expectedStart: null,
            expectedCompletion: null,
            start: null,
            completion: null
          }]
        },
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: UserRole.USER }
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::createProjectAreaWorkPackage", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/areas/12/work-packages`, new ApiProjectAreaWorkPackage({
        id: 54,
        projectWorkPackageId: 5,
        workPackageId: 3,
        status: "started",
        expectedStart: null,
        expectedCompletion: null,
        start: null,
        completion: null
      }));
    });

    it("makes a call to the endpoint", () => {
      ProjectSummaryApi.createProjectAreaWorkPackage(
        "some-project-id",
        12,
        {
            id: 54,
            projectAreaId: 12,
            projectWorkPackageId: 5,
            workPackageId: 3,
            status: "started",
            expectedStart: null,
            expectedCompletion: null,
            start: null,
            completion: null
          },
        user);

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/areas/12/work-packages`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().headers["Content-Type"]).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      ProjectSummaryApi.createProjectAreaWorkPackage(
        "some-project-id",
        12,
        {
            id: 54,
            projectAreaId: 12,
            projectWorkPackageId: 5,
            workPackageId: 3,
            status: "started",
            expectedStart: null,
            expectedCompletion: null,
            start: null,
            completion: null
          },
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: UserRole.USER }
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::updateProjectAreaWorkPackages", () => {
    beforeEach(() => {
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/areas/12/work-packages`, [new ApiProjectAreaWorkPackage({
        id: 54,
        projectWorkPackageId: 5,
        workPackageId: 3,
        status: "started",
        expectedStart: null,
        expectedCompletion: null,
        start: null,
        completion: null
      })]);
    });

    it("makes a call to the endpoint", () => {
      ProjectSummaryApi.updateProjectAreaWorkPackages(
        "some-project-id",
        12,
        [{
            id: 54,
            projectAreaId: 12,
            projectWorkPackageId: 5,
            workPackageId: 3,
            status: "started",
            expectedStart: null,
            expectedCompletion: null,
            start: null,
            completion: null
          }],
        user);

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/areas/12/work-packages`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().headers["Content-Type"]).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      ProjectSummaryApi.updateProjectAreaWorkPackages(
        "some-project-id",
        12,
        [{
            id: 54,
            projectAreaId: 12,
            projectWorkPackageId: 5,
            workPackageId: 3,
            status: "started",
            expectedStart: null,
            expectedCompletion: null,
            start: null,
            completion: null
          }],
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: UserRole.USER }
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::getProjectArea", () => {
    let projectAreaId, response;
    beforeEach(() => {
      projectAreaId = 1;
      let projectAreaProgress = new ApiProjectAreaWorkPackage({
        id: 54,
        projectAreaId,
        projectWorkPackageId: 5,
        workPackageId: 3,
        status: "started",
        expectedStart: null,
        expectedCompletion: null,
        start: null,
        completion: null
      });
      response = new ApiProjectArea({
        id: 12,
        modelElementId: projectAreaId,
        workPackages: [projectAreaProgress]
      });
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/areas/${projectAreaId}`, response);
    });

    it("makes a call to the endpoint", () => {
      ProjectSummaryApi.getProjectArea(
        "some-project-id",
        projectAreaId,
        user);

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/areas/1`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      ProjectSummaryApi.getProjectArea(
        "some-project-id",
        projectAreaId,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: UserRole.USER }
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::listProjectAreas", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/areas`, [new ApiProjectArea({
        id: 12,
        modelElementId: 3,
        workPackages: [],
        progress: []
      })]);
    });

    it("makes a call to the endpoint", () => {
      ProjectSummaryApi.listProjectAreas(
        "some-project-id",
        user);

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/areas`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      ProjectSummaryApi.listProjectAreas(
        "some-project-id",
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: UserRole.USER }
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::listProjectAreaWorkPackages", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/areas/7/work-packages`, [new ApiProjectAreaWorkPackage({
        id: 12,
        projectAreaId: 7
      })]);
    });

    it("makes a call to the endpoint", () => {
      ProjectSummaryApi.listProjectAreaWorkPackages(
        "some-project-id",
        7,
        user);

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/areas/7/work-packages`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      ProjectSummaryApi.listProjectAreaWorkPackages(
        "some-project-id",
        7,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: UserRole.USER }
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::listProjectAreaWorkPackagesForProject", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/areas/work-packages`, [new ApiProjectAreaWorkPackage({
        id: 12,
        projectAreaId: 3
      }), new ApiProjectAreaWorkPackage({
        id: 13,
        projectAreaId: 4
      })]);
    });

    it("makes a call to the endpoint", () => {
      ProjectSummaryApi.listProjectAreaWorkPackagesForProject(
        "some-project-id",
        user);

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/areas/work-packages`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      ProjectSummaryApi.listProjectAreaWorkPackagesForProject(
        "some-project-id",
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: UserRole.USER }
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });
});
