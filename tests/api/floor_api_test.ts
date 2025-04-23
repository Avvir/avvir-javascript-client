import { sandbox } from "../test_utils/setup_tests";
import { expect } from "chai";
import fetchMock from "fetch-mock";
import _ from "underscore";

import ApiFloorFileDeletionMode from "../../source/models/enums/api_floor_file_deletion_mode";
import Config from "../../source/config";
import FloorApi from "../../source/api/floor_api";
import Http from "../../source/utilities/http";
import { ApiFloor, ApiMasterformat, ApiMasterformatProgress, ApiPlannedElement, FIREBASE, ProgressType, User } from "../../source";

describe("FloorApi", () => {
  let user;
  beforeEach(() => {
    user = {
      authType: FIREBASE,
      firebaseUser: { idToken: "some-firebase.id.token" }
    };
  });

  describe("#listFloorsForProject", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors`, 200);
    });

    it("makes a request to the gateway", () => {
      FloorApi.listFloorsForProject("some-project-id", {
        firebaseUser: {
          idToken: "some-firebase.id.token"
        }
      } as User);

      expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors`);
      expect(fetchMock.lastOptions().headers["Accept"]).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      FloorApi.listFloorsForProject("some-project-id", user);

      expect(fetchMock.lastOptions().headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#getFloor", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id`, {
        status: 200,
        body: {
          id: "some-floor-id",
          floorNumber: "2",
          defaultFirebaseScanDatasetId: "some-scan-id",
          scanDatasets: [{
            scanDatasetId: "some-scan-id",
            scanNumber: 1,
            scanDate: 12345,
          }]
        }
      });
    });

    it("makes an authenticated call to the endpoint", () => {
      FloorApi.getFloor({
        projectId: "some-project-id",
        floorId: "some-floor-id",
      }, user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id`);
      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#createFloor", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors`, { status: 200, body: {} });
    });

    it("makes a call to the floor creation endpoint", () => {
      FloorApi.createFloor("some-project-id", "14", { firebaseUser: { idToken: "some-firebase.id.token" } } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors`);
      expect(JSON.parse(fetchCall[1].body as string)).to.deep.eq({ text: "14" });
    });

    it("sends the request with authorization headers", () => {
      FloorApi.createFloor("some-project-id", "14", user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors`);
      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors`,
          {
            status: 500, body: { some: "body", message: "some error message" },
            headers: { "ContentType": "application/json" }
          },
          { overwriteRoutes: true });
      });

      it("calls the shared error handler", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return FloorApi.createFloor("some-project-id",
            "14",
            { authType: FIREBASE, firebaseUser: { idToken: "some-firebase.id.token" } })
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({
              action: "createFloor",
              error: {
                verboseMessage: "500 Internal Server Error: 'some error message' at `.../projects/some-project-id/floors`"
              }
            });
          });
      });
    });
  });

  describe("#updateFloor", () => {
    beforeEach(() => {
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id`, 200);
    });

    it("makes a call to the correct endpoint", () => {
      FloorApi.updateFloor({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, new ApiFloor({
        defaultFirebaseScanDatasetId: "some-scan-id",
        floorElevation: 10.0
      }), { firebaseUser: { idToken: "some-firebase.id.token" } } as User);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("Content-Type");
      expect(lastFetchOpts.headers["Content-Type"]).to.eq("application/json");
      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id`);
      expect(fetchCall[1].body).to.deep.eq(JSON.stringify(new ApiFloor({
        defaultFirebaseScanDatasetId: "some-scan-id",
        floorElevation: 10.0
      })));
    });

    it("sends the request with authorization headers", () => {
      FloorApi.updateFloor({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, new ApiFloor({
        defaultFirebaseScanDatasetId: "some-scan-id"
      }), user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id`);
      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id`,
          {
            status: 500, body: { some: "body" },
            headers: { "ContentType": "application/json" }
          },
          { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return FloorApi.updateFloor({
              projectId: "some-project-id",
              floorId: "some-floor-id"
            },
            new ApiFloor({
              defaultFirebaseScanDatasetId: "some-scan-id"
            }),
            { firebaseUser: { idToken: "some-firebase.id.token" } } as User)
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({});
          });
      });
    });
  });

  describe("#reorderFloors", () => {
    const requestBody = [];
    const associationIds = { projectId: "some-project-id" };
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/reorder-floors`, {
        status: 200,
        body: requestBody
      });
    });

    it("makes a call to the correct endpoint", () => {
      FloorApi.reorderFloors(associationIds, requestBody, user);
      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/reorder-floors`);
    });

    it("sends the request with authorization headers", () => {
      FloorApi.reorderFloors(associationIds, requestBody, user);
      const lastFetchOpts = fetchMock.lastOptions();
      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#deleteFloor", () => {
    beforeEach(() => {
      fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id`, 200);
    });

    it("makes a call to the correct endpoint", () => {
      FloorApi.deleteFloor({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        deletionModeSelection: ""
      }, { firebaseUser: { idToken: "some-firebase.id.token" } } as User);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("Content-Type");
      expect(lastFetchOpts.headers["Content-Type"]).to.eq("application/json");
      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id`);
    });

    it("sends the request with authorization headers", () => {
      FloorApi.deleteFloor({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        deletionModeSelection: ""
      }, user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id`,
          {
            status: 500, body: { some: "body" },
            headers: { "ContentType": "application/json" }
          },
          { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return FloorApi.deleteFloor({
              projectId: "some-project-id",
              floorId: "some-floor-id",
              deletionModeSelection: ""
            },
            { firebaseUser: { idToken: "some-firebase.id.token" } } as User)
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({});
          });
      });
    });

    describe("delete floors with deletion mode selection", () => {
      beforeEach(() => {
        fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id?deletionModeSelection=${ApiFloorFileDeletionMode.ALL_FILES}`,
          200);
      });

      it("delete floor with deletion mode ALL_FILES", () => {
        FloorApi.deleteFloor({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          deletionModeSelection: "ALL_FILES"
        }, user);

        const fetchCall = fetchMock.lastCall();
        const lastFetchOpts = fetchMock.lastOptions();

        expect(fetchCall[0])
          .to
          .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id?deletionModeSelection=${ApiFloorFileDeletionMode.ALL_FILES}`);
        expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
        expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
      });
    });
  });

  describe("#updatePlannedBuildingElements", () => {
    beforeEach(() => {
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements?validate=false`,
        200);
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements?validate=true`,
        200);
    });

    it("makes a call to the endpoint", () => {
      FloorApi.updatePlannedBuildingElements({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, [new ApiPlannedElement({
        globalId: "some-global-id",
        name: "some-name"
      })], user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.key("Content-Type");
      expect(lastFetchOpts.headers["Content-Type"]).to.eq("application/json");
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements?validate=false`);
      expect(fetchCall[1].body).to.deep.eq(JSON.stringify([new ApiPlannedElement({
          globalId: "some-global-id",
          name: "some-name"
        })]
      ));
    });

    it("sends the request with authorization headers", () => {
      FloorApi.updatePlannedBuildingElements({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, [new ApiPlannedElement({
        globalId: "some-global-id",
        name: "some-name"
      })], user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements?validate=false`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    it("takes a validation flag", () => {
      FloorApi.updatePlannedBuildingElements({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, [new ApiPlannedElement({
        globalId: "some-global-id",
        name: "some-name"
      })], user, true);
      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements?validate=true`);
    });
  });

  describe("#getMasterformatProgresses", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/masterformat-progresses/BASELINE`,
        200);
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/masterformat-progresses/CURRENT`,
        200);
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/masterformat-progresses/SCANNED`,
        200);
    });

    it("makes a call to the endpoint with the BASELINE progress type", () => {
      FloorApi.getMasterformatProgress({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, ProgressType.BASELINE, user);
      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/masterformat-progresses/BASELINE`);
    });

    it("makes a call to the endpoint with the CURRENT progress type", () => {
      FloorApi.getMasterformatProgress({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, ProgressType.CURRENT, user);
      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/masterformat-progresses/CURRENT`);
    });

    it("makes a call to the endpoint with the SCANNED progress type", () => {
      FloorApi.getMasterformatProgress({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, ProgressType.SCANNED, user);
      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/masterformat-progresses/SCANNED`);
    });

    it("sends the request with authorization headers", () => {
      FloorApi.getMasterformatProgress({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, ProgressType.SCANNED, user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/masterformat-progresses/SCANNED`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });


  describe("#setMasterformatProgress", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/masterformat-progresses/BASELINE`,
        200);
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/masterformat-progresses/CURRENT`,
        200);
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/masterformat-progresses/SCANNED`,
        200);
    });

    it("makes a call to the endpoint", () => {
      FloorApi.setMasterformatProgress({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, ProgressType.CURRENT, [new ApiMasterformatProgress({
        masterformat: new ApiMasterformat(2016, "10 00 00", "Some Masterformat"),
        percentComplete: 0.1,
        scanDate: new Date("2023-05-01T12:00:00Z")
      })], user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.key("Content-Type");
      expect(lastFetchOpts.headers["Content-Type"]).to.eq("application/json");
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/masterformat-progresses/CURRENT`);
      expect(fetchCall[1].body).to.deep.eq(JSON.stringify([new ApiMasterformatProgress({
          masterformat: new ApiMasterformat(2016, "10 00 00", "Some Masterformat"),
          percentComplete: 0.1,
          scanDate: new Date("2023-05-01T12:00:00Z")
        })]
      ));
    });

    it("sends the request with authorization headers", () => {
      FloorApi.setMasterformatProgress({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, ProgressType.CURRENT, [new ApiMasterformatProgress({
        masterformat: new ApiMasterformat(2016, "10 00 00", "Some Masterformat"),
        percentComplete: 0.1,
        scanDate: new Date("2023-05-01T12:00:00Z")
      })], user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/masterformat-progresses/CURRENT`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#generateMasterformatProgresses", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/generate-masterformat-progress?masterformatVersion=2016&reportDate=2023-05-01T12:00:00.000Z`,
        200);
    });

    it("makes a call to the endpoint with the right parameters in the url", () => {
      FloorApi.generateMasterformatProgress(
        {
          projectId: "some-project-id",
          floorId: "some-floor-id"
        },
        new Date("2023-05-01T12:00:00Z"),
        2016, user);
      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/generate-masterformat-progress?masterformatVersion=2016&reportDate=2023-05-01T12:00:00.000Z`);
    });

    it("sends the request with authorization headers", () => {
      FloorApi.generateMasterformatProgress({
          projectId: "some-project-id",
          floorId: "some-floor-id"
        },
        new Date("2023-05-01T12:00:00Z"),
        2016,
        user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/generate-masterformat-progress?masterformatVersion=2016&reportDate=2023-05-01T12:00:00.000Z`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#backupFloor", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/backup?backupPurpose=some-purpose`,
        200);
    });

    it("makes a call to the endpoint with the right parameters in the url", () => {
      FloorApi.backupFloor(
        {
          projectId: "some-project-id",
          floorId: "some-floor-id"
        },
        "some-purpose",
        user);
      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/backup?backupPurpose=some-purpose`);
    });

    it("sends the request with authorization headers", () => {
      FloorApi.backupFloor({
          projectId: "some-project-id",
          floorId: "some-floor-id"
        },
        "some-purpose",
        user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/backup?backupPurpose=some-purpose`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#getFloorBackups", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/backups`,
        200);
    });

    it("makes a call to the endpoint with the right parameters in the url", () => {
      FloorApi.getFloorBackups(
        {
          projectId: "some-project-id",
          floorId: "some-floor-id"
        }, user);
      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/backups`);
    });

    it("sends the request with authorization headers", () => {
      FloorApi.getFloorBackups({
          projectId: "some-project-id",
          floorId: "some-floor-id"
        },
        user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/backups`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#revertFloorToBackup", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/backups/42/revert`,
        200);
    });

    it("makes a call to the endpoint with the right parameters in the url", () => {
      FloorApi.revertFloorToBackup(
        {
          projectId: "some-project-id",
          floorId: "some-floor-id"
        },
        42,
        user);
      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/backups/42/revert`);
    });

    it("sends the request with authorization headers", () => {
      FloorApi.revertFloorToBackup({
          projectId: "some-project-id",
          floorId: "some-floor-id"
        },
        42,
        user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/backups/42/revert`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });
});
