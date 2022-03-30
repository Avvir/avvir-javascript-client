import fetchMock from "fetch-mock";
import {expect} from "chai";
import "../test_utils/setup_tests";

import ElementApi from "../../source/api/element_api";
import Http from "../../source/utilities/http";
import {DETECTED, DeviationStatus, INCLUDED} from "../../source/models/enums/deviation_status";
import {DEVIATED, ApiBuiltStatus} from "../../source/models/enums/api_built_status";
import {FIREBASE, GATEWAY_JWT} from "../../source/models/enums/user_auth_type";
import {USER} from "../../source/models/enums/user_role";
import {ApiDetailedElement, ApiPlannedElement} from "../../source";

describe("ElementApi", () => {
  describe("::updateDeviationStatus", () => {
    beforeEach(() => {
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/deviation-status`,
        200);
    });

    it("makes a call to the deviation status endpoint", () => {
      ElementApi.updateDeviationStatus({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, "some-deviation-id", INCLUDED, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/deviation-status`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().headers["Content-Type"]).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(`{"globalId":"some-deviation-id","status":"INCLUDED"}`);
    });

    it("includes the authorization headers", () => {
      ElementApi.updateDeviationStatus({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, "some-deviation-id", INCLUDED, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::updateElement", () => {
    beforeEach(() => {
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/elements/some-element-id`,
        200);
    });

    it("makes a call to the update element endpoint", () => {
      ElementApi.updateElement({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id",
        globalId: "some-element-id"
      }, {
        globalId: "some-element-id",
        scanResult: {
          scanLabel: ApiBuiltStatus.DEVIATED,
          deviation: {
            clashing: false,
            deviationVectorMeters: {
              x: 10,
              y: 0,
              z: 0.1
            },
            deviationMeters: 10,
            status: DeviationStatus.DETECTED
          }
        }
      }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/elements/some-element-id`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().headers["Content-Type"]).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(JSON.stringify({
        globalId: "some-element-id",
        scanResult: {
          scanLabel: DEVIATED,
          deviation: {
            clashing: false,
            deviationVectorMeters: {
              x: 10,
              y: 0,
              z: 0.1
            },
            deviationMeters: 10,
            status: DETECTED
          }
        }
      }));
    });

    it("includes the authorization headers", () => {
      return ElementApi.updateElement({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id",
        globalId: "some-element-id"
      }, {} as ApiDetailedElement, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      }).then(() => {
        expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

  describe("::updateElements", () => {
    beforeEach(() => {
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/detailed-elements`,
        200);
    });

    it("makes a call to the update element endpoint", () => {
      ElementApi.updateManyElements({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, [{
        globalId: "some-element-id",
        scanResult: {
          scanLabel: ApiBuiltStatus.DEVIATED,
          deviation: {
            clashing: false,
            deviationVectorMeters: {
              x: 10,
              y: 0,
              z: 0.1
            },
            deviationMeters: 10,
            status: DeviationStatus.DETECTED
          }
        }
      }], {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/detailed-elements`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().headers["Content-Type"]).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(JSON.stringify([{
        globalId: "some-element-id",
        scanResult: {
          scanLabel: DEVIATED,
          deviation: {
            clashing: false,
            deviationVectorMeters: {
              x: 10,
              y: 0,
              z: 0.1
            },
            deviationMeters: 10,
            status: DETECTED
          }
        }
      }]));
    });

    it("includes the authorization headers", () => {
      return ElementApi.updateManyElements({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, [{}] as ApiDetailedElement[], {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      }).then(() => {
        expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

  describe("::getDetailedElement", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/element/some-element-id`,
        {
          name: "Some Element Name",
          globalId: "some-element-id",
          ifcType: "IfcSomeType",
          discipline: "Some Discipline",
          uniformat: "A1010.10",
          scanResult: {
            scanLabel: "DEVIATED",
            deviation: {
              status: "DETECTED",
              deviationVectorMeters: {
                x: 1,
                y: 1,
                z: 0
              }
            }
          },
        });
    });

    it("makes a request to the element details endpoint", () => {
      ElementApi.getDetailedElement({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, "some-element-id", {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/element/some-element-id`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("returns the element details", () => {
      return ElementApi.getDetailedElement({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, "some-element-id", {
          authType: GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: USER }
        })
        .then((elementDetails) => {
          expect(elementDetails).to.deep.eq({
            name: "Some Element Name",
            globalId: "some-element-id",
            ifcType: "IfcSomeType",
            discipline: "Some Discipline",
            uniformat: "A1010.10",
            scanResult: {
              scanLabel: "DEVIATED",
              deviation: {
                status: "DETECTED",
                deviationVectorMeters: {
                  x: 1,
                  y: 1,
                  z: 0
                }
              }
            },
          });
        });
    });

    describe("when the user is signed in", () => {
      let user;
      beforeEach(() => {
        user = {
          authType: GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: USER }
        };
      });

      it("authenticates the request", () => {
        ElementApi.getDetailedElement({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, "some-element-id", user);

        const lastFetchOpts = fetchMock.lastOptions();
        expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

  describe("::getDetailedElements", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/building-elements`,
        [{
          name: "Some Element Name",
          globalId: "some-element-id",
          ifcType: "IfcSomeType",
          discipline: "Some Discipline",
          uniformat: "A1010.10",
          scanResult: {
            scanLabel: "DEVIATED",
            deviation: {
              status: "DETECTED",
              deviationVectorMeters: {
                x: 1,
                y: 1,
                z: 0
              }
            }
          },
        }]);
    });

    it("makes a request to the element details endpoint", () => {
      ElementApi.getDetailedElements({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/building-elements`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("returns the element details", () => {
      return ElementApi.getDetailedElements({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, {
          authType: GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: USER }
        })
        .then((elementDetails) => {
          expect(elementDetails).to.deep.eq([{
            name: "Some Element Name",
            globalId: "some-element-id",
            ifcType: "IfcSomeType",
            discipline: "Some Discipline",
            uniformat: "A1010.10",
            scanResult: {
              scanLabel: "DEVIATED",
              deviation: {
                status: "DETECTED",
                deviationVectorMeters: {
                  x: 1,
                  y: 1,
                  z: 0
                }
              }
            },
          }]);
        });
    });

    describe("when requesting specific viewer ids", () => {
      beforeEach(() => {
        fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/building-elements?viewerIds=some-element-id,some-other-element-id`, 200)
      });

      it("adds them as query params", () => {
        ElementApi.getDetailedElements({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, {
          authType: GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: USER }
        }, ["some-element-id", "some-other-element-id"]);

        const fetchCall = fetchMock.lastCall();
        expect(fetchCall[0])
          .to
          .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/building-elements?viewerIds=some-element-id,some-other-element-id`);
        expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      });
    });

    describe("when the user is signed in", () => {
      let user;
      beforeEach(() => {
        user = {
          authType: GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: USER }
        };
      });

      it("authenticates the request", () => {
        ElementApi.getDetailedElements({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, user);

        const lastFetchOpts = fetchMock.lastOptions();
        expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

  describe("::createElements", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements`, 200);
    });

    it("makes a call to create the elements", () => {
      ElementApi.createElements({
        projectId: "some-project-id",
        floorId: "some-floor-id",
      }, [{
        globalId: "some-element-id",
        scanResult: null
      }], {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().headers["Content-Type"]).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(JSON.stringify([{
        globalId: "some-element-id",
        scanResult: null
      }]));
    });
  });

  describe("::matchPlannedBuildingElements", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/match`,
        200);
    });

    it("makes a request to the gateway", () => {
      ElementApi.matchPlannedBuildingElements({
          projectId: "some-project-id",
          floorId: "some-floor-id",
        }, { "some-v1-id": "some-v2-id" },
        [{
          globalId: "some-new-v2-id",
          name: "some new element"
        }],
        {
          authType: GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: USER }
        });

      expect(fetchMock.lastCall()[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/match`);
      expect(fetchMock.lastOptions().body).to.eq(JSON.stringify({
        matches: {
          "some-v1-id": "some-v2-id"
        },
        newElements: [{
          globalId: "some-new-v2-id",
          name: "some new element"
        }]
      }));
    });

    it("includes the authorization headers", () => {
      ElementApi.matchPlannedBuildingElements({
        projectId: "some-project-id",
        floorId: "some-floor-id",

      }, {}, [], {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
    it("returns the running process", () => {
      ElementApi.matchPlannedBuildingElements({
        projectId: "some-project-id",
        floorId: "some-floor-id",
      }, {}, [], {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
    }).then(runningProcess => {
        expect(runningProcess.endDate).to.eq(null);
        expect(runningProcess.startDate).not.to.eq(null);
      });
    });
  });


  describe("#updatePlannedBuildingElements", () => {
    let user;
    beforeEach(() => {
      user = {
        authType: FIREBASE,
        firebaseUser:{ idToken: "some-firebase.id.token" }
      };
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements`, 200);
    });

    it("makes a call to the endpoint", () => {
      ElementApi.updatePlannedBuildingElements({
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
      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements`);
      expect(fetchCall[1].body).to.deep.eq(JSON.stringify([new ApiPlannedElement({
            globalId: "some-global-id",
            name: "some-name"
          })]
      ));
    });

    it("sends the request with authorization headers", () => {
      ElementApi.updatePlannedBuildingElements({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, [{
        globalId: "some-global-id",
        name: "some-name"
      }], user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

  });
});
