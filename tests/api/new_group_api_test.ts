import { sandbox } from "../test_utils/setup_tests";
import { expect } from "chai";
import fetchMock from "fetch-mock";
import _ from "underscore";
import Config from "../../source/config";
import Http from "../../source/utilities/http";
import { ApiGroup, FIREBASE, User } from "../../source";
import NewGroupApi from "../../source/api/new_group_api";

describe("NewGroupApi", () => {
  let user: User;
  beforeEach(() => {
    user = {
      authType: FIREBASE,
      firebaseUser: { idToken: "some-firebase.id.token" }
    };
  });

  describe("#getGroup", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/3`, 200);
    });

    it("makes a request to the gateway", () => {
      NewGroupApi.getGroup({ projectId: "some-project-id", floorId: "some-floor-id", groupId: 3 }, user);

      expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/3`);
      expect(fetchMock.lastOptions().headers["Accept"]).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      NewGroupApi.getGroup({ projectId: "some-project-id", floorId: "some-floor-id", groupId: 3 }, user);

      expect(fetchMock.lastOptions().headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#listGroupsForFloor", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups`, 200);
    });

    it("makes an authenticated call to the endpoint", () => {
      NewGroupApi.listGroupsForFloor({ projectId: "some-project-id", floorId: "some-floor-id", }, user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups`);
      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#createElementGroup", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/planned-building-elements`,
        200);
    });

    it("makes a call to the endpoint", () => {
      NewGroupApi.createElementGroup({ projectId: "some-project-id", floorId: "some-floor-id" },
        ["some-global-id"],
        user);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/planned-building-elements`);
      expect(JSON.parse(fetchCall[1].body as string)).to.deep.eq(["some-global-id"]);
    });

    it("sends the request with authorization headers", () => {
      NewGroupApi.createElementGroup({ projectId: "some-project-id", floorId: "some-floor-id" },
        ["some-global-id"],
        user);

      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/planned-building-elements`,
          {
            status: 500, body: { some: "body", message: "some error message" },
            headers: { "ContentType": "application/json" }
          },
          { overwriteRoutes: true });
      });

      it("calls the shared error handler", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return NewGroupApi.createElementGroup({ projectId: "some-project-id", floorId: "some-floor-id" },
            ["some-global-id"],
            user)
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({
              action: "createElementGroup",
              error: {
                verboseMessage: "500 Internal Server Error: 'some error message' at `.../projects/some-project-id/floors/some-floor-id/groups/planned-building-elements`"
              }
            });
          });
      });
    });
  });

  describe("#createElementGroupMembers", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/3/planned-building-elements`,
        200);
    });

    it("makes a call to the endpoint", () => {
      NewGroupApi.createElementGroupMembers({ projectId: "some-project-id", floorId: "some-floor-id", groupId: 3 },
        ["some-global-id"],
        user);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/3/planned-building-elements`);
      expect(JSON.parse(fetchCall[1].body as string)).to.deep.eq(["some-global-id"]);
    });

    it("sends the request with authorization headers", () => {
      NewGroupApi.createElementGroupMembers({ projectId: "some-project-id", floorId: "some-floor-id", groupId: 3 },
        ["some-global-id"],
        user);

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/3/planned-building-elements`,
          {
            status: 500, body: { some: "body", message: "some error message" },
            headers: { "ContentType": "application/json" }
          },
          { overwriteRoutes: true });
      });

      it("calls the shared error handler", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return NewGroupApi.createElementGroupMembers({
              projectId: "some-project-id",
              floorId: "some-floor-id",
              groupId: 3
            },
            ["some-global-id"],
            user)
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({
              action: "createElementGroupMembers",
              error: {
                verboseMessage: "500 Internal Server Error: 'some error message' at `.../projects/some-project-id/floors/some-floor-id/groups/3/planned-building-elements`"
              }
            });
          });
      });
    });
  });

  describe("#deleteGroup", () => {
    beforeEach(() => {
      fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/3`, 200);
    });

    it("makes a call to the correct endpoint", () => {
      NewGroupApi.deleteGroup({ projectId: "some-project-id", floorId: "some-floor-id", groupId: 3 }, user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("Content-Type");
      expect(lastFetchOpts.headers["Content-Type"]).to.eq("application/json");
      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/3`);
    });

    it("sends the request with authorization headers", () => {
      NewGroupApi.deleteGroup({ projectId: "some-project-id", floorId: "some-floor-id", groupId: 3 }, user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/3`,
          {
            status: 500, body: { some: "body" },
            headers: { "ContentType": "application/json" }
          },
          { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return NewGroupApi.deleteGroup({ projectId: "some-project-id", floorId: "some-floor-id", groupId: 3 }, user)
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({});
          });
      });
    });
  });

  describe("#deleteGroupMembers", () => {
    beforeEach(() => {
      fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/members`, 200);
    });

    it("makes a call to the correct endpoint", () => {
      NewGroupApi.deleteGroupMembers({ projectId: "some-project-id", floorId: "some-floor-id", groupId: 3 },
        [1, 3],
        user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("Content-Type");
      expect(lastFetchOpts.headers["Content-Type"]).to.eq("application/json");
      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/members`);
      expect(JSON.parse(fetchCall[1].body as string)).to.deep.eq([1, 3]);
    });

    it("sends the request with authorization headers", () => {
      NewGroupApi.deleteGroupMembers({ projectId: "some-project-id", floorId: "some-floor-id", groupId: 3 },
        [1, 3],
        user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/members`,
          {
            status: 500, body: { some: "body" },
            headers: { "ContentType": "application/json" }
          },
          { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return NewGroupApi.deleteGroupMembers({ projectId: "some-project-id", floorId: "some-floor-id", groupId: 3 },
            [1, 3],
            user)
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({});
          });
      });
    });
  });

  describe("#updateGroup", () => {
    beforeEach(() => {
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/3`, 200);
    });

    it("makes a call to the correct endpoint", () => {
      NewGroupApi.updateGroup({ projectId: "some-project-id", floorId: "some-floor-id", groupId: 3 },
        new ApiGroup({ id: 3, name: "Some New Group Name" }),
        user);

      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("Content-Type");
      expect(lastFetchOpts.headers["Content-Type"]).to.eq("application/json");
      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/3`);
      expect(fetchCall[1].body).to.deep.eq(JSON.stringify(new ApiGroup({ id: 3, name: "Some New Group Name" })));
    });

    it("sends the request with authorization headers", () => {
      NewGroupApi.updateGroup({ projectId: "some-project-id", floorId: "some-floor-id", groupId: 3 },
        new ApiGroup({ id: 3, name: "Some New Group Name" }),
        user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/groups/3`,
          {
            status: 500, body: { some: "body" },
            headers: { "ContentType": "application/json" }
          },
          { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return NewGroupApi.updateGroup({ projectId: "some-project-id", floorId: "some-floor-id", groupId: 3 },
            new ApiGroup({ id: 3, name: "Some New Group Name" }),
            user)
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({});
          });
      });
    });
  });
});
