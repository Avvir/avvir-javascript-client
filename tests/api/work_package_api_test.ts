import { expect } from "chai";
import { describe } from "mocha";
// @ts-ignore
import fetchMock from "fetch-mock";

import ApiWorkPackage from "../../source/models/api/api_work_package";
import Http from "../../source/utilities/http";
import WorkPackageApi from "../../source/api/work_package_api";
import { ProjectWorkPackageType } from "../../source";
import { User } from "../../source/models/domain/user";
import { UserAuthType } from "../../source/models/enums/user_auth_type";

describe("WorkPackageApi", () => {
  beforeEach(() => {
    fetchMock.resetBehavior();
  });

  describe("::listWorkPackages", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/work-packages/list`, 200);
    });

    it("makes a request to the gateway api", () => {
      WorkPackageApi.listWorkPackages({ projectId: "some-project-id" }, {
        authType: UserAuthType.GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/work-packages/list`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      WorkPackageApi.listWorkPackages({ projectId: "some-project-id" }, {
        authType: UserAuthType.GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::createWorkPackage", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/work-packages`, 200);
    });

    it("makes a request to the gateway api", () => {
      WorkPackageApi.createWorkPackage({ projectId: "some-project-id" },
        new ApiWorkPackage({
          name: "some recipe name",
          type: ProjectWorkPackageType.SUMMARY
        }), {
          authType: "GATEWAY_JWT",
          gatewayUser: { idToken: "some-firebase.id.token" }
        } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/work-packages`);
      expect(JSON.parse(fetchCall[1].body as string)).to.deep.eq({
        name: "some recipe name",
        type: ProjectWorkPackageType.SUMMARY
      });
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      WorkPackageApi.createWorkPackage({ projectId: "some-project-id" },
        new ApiWorkPackage({
          name: "some recipe name",
          type: ProjectWorkPackageType.SUMMARY
        }), {
          authType: "GATEWAY_JWT",
          gatewayUser: { idToken: "some-firebase.id.token" }
        } as User);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::deleteWorkPackage", () => {
    beforeEach(() => {
      fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/work-packages/7`, 200);
    });

    it("makes a request to the gateway api", () => {
      WorkPackageApi.deleteWorkPackage({ projectId: "some-project-id" }, 7, {
        authType: "GATEWAY_JWT",
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/work-packages/7`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      WorkPackageApi.deleteWorkPackage({ projectId: "some-project-id" }, 7, {
        authType: "GATEWAY_JWT",
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::updateWorkPackage", () => {
    beforeEach(() => {
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/work-packages/7`, 200);
    });

    it("makes a request to the gateway api", () => {
      WorkPackageApi.updateWorkPackage({ projectId: "some-project-id" }, 7, {
        ...new ApiWorkPackage({
          id: 7,
          name: "Some Work Package",
          type: ProjectWorkPackageType.SUMMARY
        }),
        trades: []
      }, {
        authType: UserAuthType.GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/work-packages/7`);
      expect(JSON.parse(fetchCall[1].body as string)).to.deep.eq({
        id: 7,
        name: "Some Work Package",
        type: ProjectWorkPackageType.SUMMARY,
        trades: []
      });
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      WorkPackageApi.updateWorkPackage({ projectId: "some-project-id" }, 7, {
        ...new ApiWorkPackage({
          id: 7,
          name: "Some Work Package",
          type: ProjectWorkPackageType.SUMMARY
        }),
        trades: []
      }, {
        authType: UserAuthType.GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });
});
