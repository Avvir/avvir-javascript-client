import fetchMock from "fetch-mock";
import { expect } from "chai";
import "../test_utils/setup_tests";

import ElementApi from "../../source/api/element_api";
import Http from "../../source/utilities/http";
import { DETECTED, DeviationStatus, INCLUDED } from "../../source/models/enums/deviation_status";
import { ApiBuiltStatus, DEVIATED, NOT_BUILT } from "../../source/models/enums/api_built_status";
import { FIREBASE, GATEWAY_JWT } from "../../source/models/enums/user_auth_type";
import { USER } from "../../source/models/enums/user_role";
import { ApiDetailedElement, ApiPlannedElement, ApiScannedElement, DateConverter } from "../../source";

describe("ElementApi", () => {
  describe("::getPlannedBuildingElements", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements`,
        [new ApiDetailedElement({
          name: "Some Element Name",
          globalId: "some-element-id",
          ifcType: "IfcSomeType",
          discipline: "Some Discipline",
          uniformat: "A1010.10",
          scanResult: {
            scanLabel: ApiBuiltStatus.DEVIATED,
            deviation: {
              clashing: false,
              deviationMeters: 1.4142135623730951,
              status: DeviationStatus.DETECTED,
              deviationVectorMeters: {
                x: 1,
                y: 1,
                z: 0
              }
            }
          },
        })]);
    });

    it("makes a request to the planned building elements endpoint", () => {
      ElementApi.getPlannedBuildingElements({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("returns the element details", () => {
      return ElementApi.getPlannedBuildingElements({
          projectId: "some-project-id",
          floorId: "some-floor-id"
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
              scanLabel: DEVIATED,
              deviation: {
                clashing: false,
                deviationMeters: Math.sqrt(2),
                status: DETECTED,
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

    describe("when the user is signed in", () => {
      let user;
      beforeEach(() => {
        user = {
          authType: GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: USER }
        };
      });

      it("authenticates the request", () => {
        ElementApi.getPlannedBuildingElements({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, user);

        const lastFetchOpts = fetchMock.lastOptions();
        expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

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

  describe("::updateManyElements", () => {
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

  describe("::createDetailedElementsQuery", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/detailed-elements/query`,
        {
          id: 23,
          queriedIds: ["some-global-id"]
        });
    });

    it("makes a request to the create detailed elements query endpoint", () => {
      ElementApi.createDetailedElementsQuery({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, ["some-global-id"], null);

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/detailed-elements/query`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(JSON.stringify(["some-global-id"]));
    });

    it("returns the created query", () => {
      return ElementApi.createDetailedElementsQuery({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, ["some-global-id"], null)
        .then((detailedElementsQuery) => {
          expect(detailedElementsQuery).to.deep.eq({
            id: 23,
            queriedIds: ["some-global-id"]
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
        ElementApi.createDetailedElementsQuery({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, ["some-global-id"], user);

        const lastFetchOpts = fetchMock.lastOptions();
        expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

  describe("::getDetailedElementsQueryResult", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/detailed-elements/query/23`,
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

    it("makes a request to get detailed elements query results", () => {
      ElementApi.getDetailedElementsQueryResult({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, 23, null);

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/detailed-elements/query/23`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("returns the results for the query", () => {
      return ElementApi.getDetailedElementsQueryResult({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, 23, null)
        .then((detailedElementsQueryResult) => {
          expect(detailedElementsQueryResult).to.deep.eq([{
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

    describe("when the user is signed in", () => {
      let user;
      beforeEach(() => {
        user = {
          authType: GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: USER }
        };
      });

      it("authenticates the request", () => {
        ElementApi.getDetailedElementsQueryResult({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, 23, user);

        const lastFetchOpts = fetchMock.lastOptions();
        expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

  describe("::createPlannedBuildingElementsQuery", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/query`,
        {
          id: 23,
          queriedIds: ["some-global-id"]
        });
    });

    it("makes a request to the create detailed elements query endpoint", () => {
      ElementApi.createPlannedBuildingElementsQuery({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, ["some-global-id"], null);

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/query`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(JSON.stringify(["some-global-id"]));
    });

    it("returns the created query", () => {
      return ElementApi.createPlannedBuildingElementsQuery({
          projectId: "some-project-id",
          floorId: "some-floor-id",
        }, ["some-global-id"], null)
        .then((plannedElementsQuery) => {
          expect(plannedElementsQuery).to.deep.eq({
            id: 23,
            queriedIds: ["some-global-id"]
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
        ElementApi.createPlannedBuildingElementsQuery({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, ["some-global-id"], user);

        const lastFetchOpts = fetchMock.lastOptions();
        expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

  describe("::getPlannedBuildingElementsQueryResult", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/query/23`,
        [{
          name: "Some Element Name",
          globalId: "some-element-id",
          ifcType: "IfcSomeType",
          discipline: "Some Discipline",
          uniformat: "A1010.10",
          builtAt: DateConverter.dateToInstant(new Date("2022-04-01")),
          deviation: {
            status: "DETECTED",
            deviationVectorMeters: {
              x: 1,
              y: 1,
              z: 0
            }
          }
        }]);
    });

    it("makes a request to get the planned building elements query results", () => {
      ElementApi.getPlannedBuildingElementsQueryResult({
        projectId: "some-project-id",
        floorId: "some-floor-id",
      }, 23, null);

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/query/23`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("returns the results for the query", () => {
      return ElementApi.getPlannedBuildingElementsQueryResult({
          projectId: "some-project-id",
          floorId: "some-floor-id",
        }, 23, null)
        .then((plannedElementsQueryResult) => {
          expect(plannedElementsQueryResult).to.deep.eq([{
            name: "Some Element Name",
            globalId: "some-element-id",
            ifcType: "IfcSomeType",
            discipline: "Some Discipline",
            uniformat: "A1010.10",
            builtAt: DateConverter.dateToInstant(new Date("2022-04-01")),
            deviation: {
              status: "DETECTED",
              deviationVectorMeters: {
                x: 1,
                y: 1,
                z: 0
              }
            }
          }]);
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
        ElementApi.getPlannedBuildingElementsQueryResult({
          projectId: "some-project-id",
          floorId: "some-floor-id",
        }, 23, user);

        const lastFetchOpts = fetchMock.lastOptions();
        expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

  describe("::createObstructedElementsQuery", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/obstructions/query`,
        {
          id: 23,
          queriedIds: ["some-global-id"]
        });
    });

    it("makes a request to the create obstructed elements query endpoint", () => {
      ElementApi.createObstructedElementsQuery({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, ["some-global-id"], null);

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/obstructions/query`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(JSON.stringify(["some-global-id"]));
    });

    it("returns the created query", () => {
      return ElementApi.createObstructedElementsQuery({
          projectId: "some-project-id",
          floorId: "some-floor-id",
        }, ["some-global-id"], null)
        .then((obstructedElementsQuery) => {
          expect(obstructedElementsQuery).to.deep.eq({
            id: 23,
            queriedIds: ["some-global-id"]
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
        ElementApi.createObstructedElementsQuery({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, ["some-global-id"], user);

        const lastFetchOpts = fetchMock.lastOptions();
        expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

  describe("::getObstructedElementsQueryResult", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/obstructions/query/23`,
        {
          "some-global-id": ["some-obstructed-global-id-1", "some-obstructed-global-id-2"]
        });
    });

    it("makes a request to get the obstructed elements query results", () => {
      ElementApi.getObstructedElementsQueryResult({
        projectId: "some-project-id",
        floorId: "some-floor-id",
      }, 23, null);

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/obstructions/query/23`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("returns the results for the query", () => {
      return ElementApi.getObstructedElementsQueryResult({
          projectId: "some-project-id",
          floorId: "some-floor-id",
        }, 23, null)
        .then((obstructedQueryResult) => {
          expect(obstructedQueryResult).to.deep.eq({
            "some-global-id": ["some-obstructed-global-id-1", "some-obstructed-global-id-2"]
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
        ElementApi.getObstructedElementsQueryResult({
          projectId: "some-project-id",
          floorId: "some-floor-id",
        }, 23, user);

        const lastFetchOpts = fetchMock.lastOptions();
        expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

  describe("::createManualObstructedElements", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/some-global-id/manual-obstructions`,
        {
          "some-global-id": ["some-obstructed-global-id"]
        });
    });

    it("makes a request to the create obstructed elements endpoint", () => {
      ElementApi.createManualObstructedElements({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, "some-global-id", ["some-obstructed-global-id"], null);

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/some-global-id/manual-obstructions`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(JSON.stringify(["some-obstructed-global-id"]));
    });

    it("returns the modified obstructions", () => {
      return ElementApi.createManualObstructedElements({
          projectId: "some-project-id",
          floorId: "some-floor-id",
        }, "some-global-id", ["some-obstructed-global-id"], null)
        .then((obstructedElementsQuery) => {
          expect(obstructedElementsQuery).to.deep.eq({
            "some-global-id": ["some-obstructed-global-id"]
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
        ElementApi.createManualObstructedElements({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, "some-global-id", ["some-obstructed-global-id"], user);

        const lastFetchOpts = fetchMock.lastOptions();
        expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

  describe("::deleteObstructedElements", () => {
    beforeEach(() => {
      fetchMock.put(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/some-global-id/manual-obstructions/delete`,
        {
          "some-global-id": []
        });
    });

    it("makes a request to the create obstructed elements endpoint", () => {
      ElementApi.deleteObstructedElements({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, "some-global-id", ["some-obstructed-global-id"], null);

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/some-global-id/manual-obstructions/delete`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(JSON.stringify(["some-obstructed-global-id"]));
    });

    it("returns the modified obstructions", () => {
      return ElementApi.deleteObstructedElements({
          projectId: "some-project-id",
          floorId: "some-floor-id",
        }, "some-global-id", ["some-obstructed-global-id"], null)
        .then((obstructedElementsQuery) => {
          expect(obstructedElementsQuery).to.deep.eq({
            "some-global-id": []
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
        ElementApi.deleteObstructedElements({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, "some-global-id", ["some-obstructed-global-id"], user);

        const lastFetchOpts = fetchMock.lastOptions();
        expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

  describe("::getElementDetails", () => {
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
      ElementApi.getElementDetails({
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
      return ElementApi.getElementDetails({
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
        ElementApi.getElementDetails({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, "some-element-id", user);

        const lastFetchOpts = fetchMock.lastOptions();
        expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

  describe("::getManyElementsDetails", () => {
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
      ElementApi.getManyElementsDetails({
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
      return ElementApi.getManyElementsDetails({
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
        fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/building-elements?viewerIds=some-element-id,some-other-element-id`,
          200);
      });

      it("adds them as query params", () => {
        ElementApi.getManyElementsDetails({
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
        ElementApi.getManyElementsDetails({
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
      // noinspection JSDeprecatedSymbols
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
        firebaseUser: { idToken: "some-firebase.id.token" }
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

      expect(lastFetchOpts.headers["Content-Type"]).to.eq("application/json");
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements`);
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

      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements`);
      expect(lastFetchOpts.headers["firebaseIdToken"]).to.eq("some-firebase.id.token");
    });
  });

  describe("::updatePlannedBuildingElementsForViewer", () => {
    let user;
    beforeEach(() => {
      user = {
        authType: FIREBASE,
        firebaseUser: { idToken: "some-firebase.id.token" }
      };
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/some-scan-dataset-id/viewer`,
        200);
    });

    it("makes a call to the endpoint", () => {
      ElementApi.updatePlannedBuildingElementsForViewer({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-dataset-id"
      }, [new ApiScannedElement({
        globalId: "some-global-id",
        scanLabel: NOT_BUILT,
      })], false, user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers["Content-Type"]).to.eq("application/json");
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/some-scan-dataset-id/viewer`);
      expect(fetchCall[1].body).to.deep.eq(JSON.stringify([new ApiScannedElement({
          globalId: "some-global-id",
          scanLabel: NOT_BUILT,
        })]
      ));
    });

    it("sends the request with authorization headers", () => {
      ElementApi.updatePlannedBuildingElementsForViewer({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-dataset-id"
      }, [new ApiScannedElement({
        globalId: "some-global-id",
        scanLabel: NOT_BUILT,
      })], false, user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/some-scan-dataset-id/viewer`);
      expect(lastFetchOpts.headers["firebaseIdToken"]).to.eq("some-firebase.id.token");
    });

    describe("when progress mode is passed in as true", () => {
      beforeEach(() => {
        fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/some-scan-dataset-id/viewer?progressMode=true`,
          200);
      });

      it("adds the query string to the url", () => {
        ElementApi.updatePlannedBuildingElementsForViewer({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-dataset-id"
        }, [new ApiScannedElement({
          globalId: "some-global-id",
          scanLabel: NOT_BUILT,
        })], true, user);
        const fetchCall = fetchMock.lastCall();

        expect(fetchCall[0])
          .to
          .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/some-scan-dataset-id/viewer?progressMode=true`);
      });
    });
  });

  describe("::updatePlannedBuildingElementsForViewerUndo", () => {
    let user;
    beforeEach(() => {
      user = {
        authType: FIREBASE,
        firebaseUser: { idToken: "some-firebase.id.token" }
      };
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/viewer`,
        200);
    });

    it("makes a call to the endpoint", () => {
      ElementApi.updatePlannedBuildingElementsForViewerUndo({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, [new ApiPlannedElement({
        globalId: "some-global-id",
        builtAt: null,
      })], user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers["Content-Type"]).to.eq("application/json");
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/viewer`);
      expect(fetchCall[1].body).to.deep.eq(JSON.stringify([new ApiPlannedElement({
        globalId: "some-global-id",
        builtAt: null,
      })]));
    });

    it("sends the request with authorization headers", () => {
      ElementApi.updatePlannedBuildingElementsForViewerUndo({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, [new ApiPlannedElement({
        globalId: "some-global-id",
        builtAt: null,
      })], user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/planned-building-elements/viewer`);
      expect(lastFetchOpts.headers["firebaseIdToken"]).to.eq("some-firebase.id.token");
    });
  });

  describe("::getUserActionsForElement", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/user-actions/projects/some-project-id/floors/some-floor-id/element-history/some-element-id`,
        {
          globalId: "some-element-id",
          firebaseClientAcountId: "some-org-id",
          firebaseProjectId: "some-project-id",
          firebaseFloorId: "some-floor-id",
          firebaseScanDatasetId: "some-scan-dataset-id",
          photoAreaId: 345,
          photoSessionId: 678,
          photoLocationId: 980,
          plannedBuildingElementId: 123,
          behavioralData: { deviation: { x: 1, y: 1, z: 1 }, cameraOrientation: null }
        });
    });

    it("makes a request to the user actions for element endpoint", () => {
      ElementApi.getUserActionsForElement({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        globalId: "some-element-id"
      }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      const fetchCall = fetchMock.lastCall();
      expect(fetchCall[0])
        .to
        .eq(`${Http.baseUrl()}/user-actions/projects/some-project-id/floors/some-floor-id/element-history/some-element-id`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("returns the user actions for the element", () => {
      return ElementApi.getUserActionsForElement({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          globalId: "some-element-id"
        }, {
          authType: GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: USER }
        })
        .then((elementDetails) => {
          expect(elementDetails).to.deep.eq({
            globalId: "some-element-id",
            firebaseClientAcountId: "some-org-id",
            firebaseProjectId: "some-project-id",
            firebaseFloorId: "some-floor-id",
            firebaseScanDatasetId: "some-scan-dataset-id",
            photoAreaId: 345,
            photoSessionId: 678,
            photoLocationId: 980,
            plannedBuildingElementId: 123,
            behavioralData: { deviation: { x: 1, y: 1, z: 1 }, cameraOrientation: null }
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
        ElementApi.getUserActionsForElement({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          globalId: "some-element-id"
        }, user);

        const lastFetchOpts = fetchMock.lastOptions();
        expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

  describe("::exportBcfBuildingElements", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/bcf-building-elements`,
        [{
          detailedElement: {
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
          },
          bcfIssue: {
            plannedBuildingElementId: 2,
            topicGuid: "123e4567-e89b-12d3-a456-426614174000",
            commentGuid: "123e4567-e89b-12d3-a456-426614174001",
            viewpointGuid: "123e4567-e89b-12d3-a456-426614174002"
          }
        }]);
    });

    it("makes a request to the export bcf building elements endpoint", () => {
      ElementApi.exportBcfBuildingElements({
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
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/bcf-building-elements`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("returns the exported bcf building elements", () => {
      return ElementApi.exportBcfBuildingElements({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, {
          authType: GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: USER }
        })
        .then((elementDetails) => {
          expect(elementDetails).to.deep.eq([{
            detailedElement: {
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
            },
            bcfIssue: {
              plannedBuildingElementId: 2,
              topicGuid: "123e4567-e89b-12d3-a456-426614174000",
              commentGuid: "123e4567-e89b-12d3-a456-426614174001",
              viewpointGuid: "123e4567-e89b-12d3-a456-426614174002"
            }
          }]);
        });
    });

    describe("when requesting a specific deviation threshold", () => {
      beforeEach(() => {
        fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/bcf-building-elements?deviationThreshold=0.2`,
          200);
      });

      it("adds it as a query param", () => {
        ElementApi.exportBcfBuildingElements({
            projectId: "some-project-id",
            floorId: "some-floor-id",
            scanDatasetId: "some-scan-id"
          },
          0.2,
          {
            authType: GATEWAY_JWT,
            gatewayUser: { idToken: "some-firebase.id.token", role: USER }
          });

        const fetchCall = fetchMock.lastCall();
        expect(fetchCall[0])
          .to
          .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/bcf-building-elements?deviationThreshold=0.2`);
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
        ElementApi.exportBcfBuildingElements({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        }, user);

        const lastFetchOpts = fetchMock.lastOptions();
        expect(lastFetchOpts.headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });

});
