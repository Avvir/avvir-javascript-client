import { sandbox } from "../test_utils/setup_tests";
import { expect } from "chai";
import fetchMock from "fetch-mock";
import moment from "moment";

import ApiCloudFile from "../../source/models/api/api_cloud_file";
import DateConverter from "../../source/converters/date_converter";
import FileInformationApi from "../../source/api/file_information_api";
import { FIREBASE } from "../../source/models/enums/user_auth_type";
import { makeFakeDispatch, makeStoreContents } from "../test_utils/test_factories";
import { OTHER } from "../../source/models/enums/purpose_type";
import { SUPERADMIN } from "../../source/models/enums/user_role";
import Config from "../../source/config";
import Http from "../../source/utilities/http";

describe("FileInformationApi", () => {
  let fakeDispatch, dispatchSpy, fakeGetState, user;
  beforeEach(() => {
    user = {
      authType: FIREBASE,
      firebaseUser: {
        email: "some.email@avvir.io",
        idToken: "some-firebase.id.token",
        role: SUPERADMIN,
        uid: "some.email@avvir.io"
      }
    };
    fakeGetState = () => makeStoreContents({
      user,
      locationMetadata: { projectId: "some-project-id", floorId: "some-floor-id" }
    });

    dispatchSpy = sandbox.spy();
    fakeDispatch = makeFakeDispatch(dispatchSpy, fakeGetState);
  });

  describe("#createProjectFile", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/files`, 200);
    });

    it("makes a call to the project files endpoint", () => {
      FileInformationApi.createProjectFile({
          projectId: "some-project-id"
        },
        new ApiCloudFile({
          purposeType: OTHER,
          url: "some-download-url.com",
          lastModified: moment("2018-04-01")
        }),
        user,
      );
      const request = fetchMock.lastCall();

      expect(request["0"]).to.eq(`${Http.baseUrl()}/projects/some-project-id/files`);
      expect(JSON.parse(request["1"].body as string)).to.deep.eq({
        createdAt: null,
        purposeType: "OTHER",
        url: "some-download-url.com",
        lastModified: DateConverter.dateToInstant(moment("2018-04-01"))
      });
    });

    it("sends the request with authorization headers", () => {
      FileInformationApi.createProjectFile({
          projectId: "some-project-id",
          floorId: "some-floor-id",
        },
        new ApiCloudFile({
          purposeType: OTHER,
          url: "some-download-url.com",
          lastModified: moment("2018-04-01")
        }),
        user,
      );

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/files`, 500, { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return FileInformationApi.createProjectFile({
            projectId: "some-project-id",
            floorId: "some-floor-id",
          },
          new ApiCloudFile({
            purposeType: OTHER,
            url: "some-download-url.com",
            lastModified: moment("2018-04-01")
          }),
          user,
        ).catch(() => {}).then(() => {
          expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({});
        });
      });
    });
  });

  describe("#listProjectFiles", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/files`, [{
        url: "some-file-url.com",
        purposeType: "OTHER"
      }]);
    });

    it("makes a call to the project files endpoint", () => {
      FileInformationApi.listProjectFiles({ projectId: "some-project-id" }, user);
      const request = fetchMock.lastCall();
      expect(request[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/files`);
    });

    it("sends the request with authorization headers", () => {
      FileInformationApi.listProjectFiles({ projectId: "some-project-id" }, user);

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#listPhotoAreaFiles", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/photo-areas/4/files`, [{
        url: "some-file-url.com",
        purposeType: "OTHER"
      }]);
    });

    it("makes a call to the project files endpoint", () => {
      FileInformationApi.listPhotoAreaFiles({ projectId: "some-project-id", photoAreaId: 4 }, user);
      const request = fetchMock.lastCall();
      expect(request[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/photo-areas/4/files`);
    });

    it("sends the request with authorization headers", () => {
      FileInformationApi.listPhotoAreaFiles({ projectId: "some-project-id", photoAreaId: 4 }, user);

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("zipProjectFolder", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/zip-project-folder?folder-prefix=some-folder-name`, 200);
    });

    it("makes a call to the zip project folder endpoint", () => {
      FileInformationApi.zipProjectFolder("some-folder-name", { projectId: "some-project-id" }, user);

      const request = fetchMock.lastCall();
      expect(request["0"]).to.eq(`${Http.baseUrl()}/projects/some-project-id/zip-project-folder?folder-prefix=some-folder-name`);
    });

    it("sends the request with authorization headers", () => {
      FileInformationApi.zipProjectFolder("some-folder-name", { projectId: "some-project-id" }, user);

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#saveFloorFile", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/file`, 200);
    });

    it("makes a call to the floor files endpoint", () => {
      FileInformationApi.saveFloorFile({
          projectId: "some-project-id",
          floorId: "some-floor-id"
        },
        new ApiCloudFile({
          purposeType: OTHER,
          url: "some-download-url.com",
          lastModified: moment("2018-04-01")
        }),
        user,
      );
      const request = fetchMock.lastCall();

      expect(request["0"]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/file`);
      expect(JSON.parse(request["1"].body as string)).to.deep.eq({
        createdAt: null,
        purposeType: "OTHER",
        url: "some-download-url.com",
        lastModified: DateConverter.dateToInstant(moment("2018-04-01"))
      });
    });

    it("sends the request with authorization headers", () => {
      FileInformationApi.saveFloorFile({
          projectId: "some-project-id",
          floorId: "some-floor-id",
        },
        new ApiCloudFile({
          purposeType: OTHER,
          url: "some-download-url.com",
          lastModified: moment("2018-04-01")
        }),
        user,
      );

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/file`, 500, { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return FileInformationApi.saveFloorFile({
            projectId: "some-project-id",
            floorId: "some-floor-id",
          },
          new ApiCloudFile({
            purposeType: OTHER,
            url: "some-download-url.com",
            lastModified: moment("2018-04-01")
          }),
          user,
        ).catch(() => {}).then(() => {
          expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({});
        });
      });
    });
  });

  describe("#saveScanDatasetFile", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/file`, 200);
    });

    it("makes a call to the scan dataset files endpoint", () => {
      FileInformationApi.saveScanDatasetFile({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        },
        new ApiCloudFile({
          purposeType: OTHER,
          url: "some-download-url.com",
          lastModified: moment("2018-04-01")
        }),
        user,
      );
      const request = fetchMock.lastCall();

      expect(request["0"]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/file`);
      expect(JSON.parse(request["1"].body as string)).to.deep.eq({
        createdAt: null,
        purposeType: "OTHER",
        url: "some-download-url.com",
        lastModified: DateConverter.dateToInstant(moment("2018-04-01"))
      });
    });

    it("sends the request with authorization headers", () => {
      FileInformationApi.saveScanDatasetFile({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        },
        new ApiCloudFile({
          purposeType: OTHER,
          url: "some-download-url.com",
          lastModified: moment("2018-04-01")
        }),
        user,
      );

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/file`, 500, { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return FileInformationApi.saveScanDatasetFile({
            projectId: "some-project-id",
            floorId: "some-floor-id",
            scanDatasetId: "some-scan-id"
          },
          new ApiCloudFile({
            purposeType: OTHER,
            url: "some-download-url.com",
            lastModified: moment("2018-04-01")
          }),
          user,
        ).catch(() => {}).then(() => {
          expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({});
        });
      });
    });
  });
});
