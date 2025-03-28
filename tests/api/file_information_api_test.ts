import { sandbox } from "../test_utils/setup_tests";
import { expect } from "chai";
import fetchMock from "fetch-mock";
import moment from "moment";

import ApiCloudFile from "../../source/models/api/api_cloud_file";
import DateConverter from "../../source/converters/date_converter";
import FileInformationApi from "../../source/api/file_information_api";
import { ApiPhotoAreaPurposeType, ApiProjectPurposeType, FIREBASE, SUPERADMIN } from "../../source";
import Config from "../../source/config";
import Http from "../../source/utilities/http";

describe("FileInformationApi", () => {
  let user;
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
          purposeType: ApiProjectPurposeType.OTHER,
          url: "some-download-url.com",
          lastModified: new Date("2018-04-01"),
          fileSize: 65536,
          originalFileName: "some-file.las",
        }),
        user,
      );
      const request = fetchMock.lastCall();

      expect(request["0"]).to.eq(`${Http.baseUrl()}/projects/some-project-id/files`);
      expect(JSON.parse(request["1"].body as string)).to.deep.eq({
        purposeType: ApiProjectPurposeType.OTHER,
        url: "some-download-url.com",
        lastModified: DateConverter.dateToInstant(new Date("2018-04-01")),
        fileSize: 65536,
        originalFileName: "some-file.las",
      });
    });

    it("sends the request with authorization headers", () => {
      FileInformationApi.createProjectFile({
          projectId: "some-project-id",
          floorId: "some-floor-id",
        },
        new ApiCloudFile({
          purposeType: ApiProjectPurposeType.OTHER,
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
            purposeType: ApiProjectPurposeType.OTHER,
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

  describe("#associateProjectFiles", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/associate-files`, 200);
    });

    it("makes a call to the project files endpoint", () => {
      FileInformationApi.associateProjectFiles({
          projectId: "some-project-id"
        },
        [new ApiCloudFile({
          purposeType: ApiProjectPurposeType.OTHER,
          url: "some-download-url.com",
          lastModified: new Date("2018-04-01"),
          fileSize: 65536,
          originalFileName: "some-file.las",
        })],
        user,
      );
      const request = fetchMock.lastCall();

      expect(request["0"]).to.eq(`${Http.baseUrl()}/projects/some-project-id/associate-files`);
      expect(JSON.parse(request["1"].body as string)).to.deep.eq([{
        purposeType: ApiProjectPurposeType.OTHER,
        url: "some-download-url.com",
        lastModified: DateConverter.dateToInstant(new Date("2018-04-01")),
        fileSize: 65536,
        originalFileName: "some-file.las",
      }]);
    });

    it("sends the request with authorization headers", () => {
      FileInformationApi.associateProjectFiles({
          projectId: "some-project-id",
          floorId: "some-floor-id",
        },
        [new ApiCloudFile({
          purposeType: ApiProjectPurposeType.OTHER,
          url: "some-download-url.com",
          lastModified: moment("2018-04-01")
        })],
        user,
      );

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/associate-files`, 500, { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return FileInformationApi.associateProjectFiles({
            projectId: "some-project-id",
            floorId: "some-floor-id",
          },
          [new ApiCloudFile({
            purposeType: ApiProjectPurposeType.OTHER,
            url: "some-download-url.com",
            lastModified: moment("2018-04-01")
          })],
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
        purposeType: ApiProjectPurposeType.OTHER
      }]);

      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/files?purpose-type=PROJECT_EXPORT_REPORT`, [{
        url: "some-file-url.com",
        purposeType: ApiProjectPurposeType.PROJECT_EXPORT_REPORT
      }]);
    });

    it("makes a call to the project files endpoint", () => {
      FileInformationApi.listProjectFiles({ projectId: "some-project-id" }, user);
      const request = fetchMock.lastCall();
      expect(request[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/files`);
    });

    it("makes a call to the project files endpoint with purpose type", () => {
      FileInformationApi.listProjectFiles({ projectId: "some-project-id" },
        user,
        ApiProjectPurposeType.PROJECT_EXPORT_REPORT,);
      const request = fetchMock.lastCall();
      expect(request[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/files?purpose-type=PROJECT_EXPORT_REPORT`);
    });

    it("sends the request with authorization headers", () => {
      FileInformationApi.listProjectFiles({ projectId: "some-project-id" }, user);

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#listFloorFilesForProject", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floor-files`, [{
        floorId: "some-floor-id", files: [{
          url: "some-file-url.com",
          purposeType: ApiProjectPurposeType.OTHER
        }]
      }]);
    });

    it("makes a call to the project files endpoint", () => {
      FileInformationApi.listFloorFilesForProject({ projectId: "some-project-id" }, user);
      const request = fetchMock.lastCall();
      expect(request[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floor-files`);
    });

    it("sends the request with authorization headers", () => {
      FileInformationApi.listFloorFilesForProject({ projectId: "some-project-id" }, user);

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#listScanDatasetFilesForProject", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/scan-dataset-files`, {
        "some-scan-dataset-id": [{
          url: "some-file-url.com",
          purposeType: ApiProjectPurposeType.OTHER
        }]
      });
    });

    it("makes a call to the endpoint", () => {
      FileInformationApi.listScanDatasetFilesForProject({ projectId: "some-project-id" }, user);
      const request = fetchMock.lastCall();
      expect(request[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/scan-dataset-files`);
    });

    it("sends the request with authorization headers", () => {
      FileInformationApi.listScanDatasetFilesForProject({ projectId: "some-project-id" }, user);

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#listPhotoAreaFiles", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/photo-areas/4/files`, [{
        url: "some-file-url.com",
        purposeType: ApiProjectPurposeType.OTHER
      }]);

      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/photo-areas/4/files?purposeType=MINIMAP`, [{
        url: "some-file-url.com",
        purposeType: "MINIMAP"
      }]);
    });

    it("makes a call to the project files endpoint", () => {
      FileInformationApi.listPhotoAreaFiles({ projectId: "some-project-id", photoAreaId: 4 }, user);
      const request = fetchMock.lastCall();
      expect(request[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/photo-areas/4/files`);
    });

    it("makes a call to the project files endpoint with the specified purpose types", () => {
      FileInformationApi.listPhotoAreaFiles({ projectId: "some-project-id", photoAreaId: 4 },
        [ApiPhotoAreaPurposeType.MINIMAP],
        user);
      const request = fetchMock.lastCall();
      expect(request[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/photo-areas/4/files?purposeType=MINIMAP`);
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
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/zip-project-folder?folder-prefix=some-folder-name`,
        200);
    });

    it("makes a call to the zip project folder endpoint", () => {
      FileInformationApi.zipProjectFolder("some-folder-name", { projectId: "some-project-id" }, user);

      const request = fetchMock.lastCall();
      expect(request["0"])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/zip-project-folder?folder-prefix=some-folder-name`);
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
          purposeType: ApiProjectPurposeType.OTHER,
          url: "some-download-url.com",
          lastModified: new Date("2018-04-01"),
          fileSize: 65536,
          originalFileName: "some-file.las",
        }),
        user,
      );
      const request = fetchMock.lastCall();

      expect(request["0"]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/file`);
      expect(JSON.parse(request["1"].body as string)).to.deep.eq({
        purposeType: ApiProjectPurposeType.OTHER,
        url: "some-download-url.com",
        lastModified: DateConverter.dateToInstant(new Date("2018-04-01")),
        fileSize: 65536,
        originalFileName: "some-file.las",
      });
    });

    it("sends the request with authorization headers", () => {
      FileInformationApi.saveFloorFile({
          projectId: "some-project-id",
          floorId: "some-floor-id",
        },
        new ApiCloudFile({
          purposeType: ApiProjectPurposeType.OTHER,
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
        fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/file`,
          500,
          { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return FileInformationApi.saveFloorFile({
            projectId: "some-project-id",
            floorId: "some-floor-id",
          },
          new ApiCloudFile({
            purposeType: ApiProjectPurposeType.OTHER,
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

  describe("#savePhotoAreaFile", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/photo-areas/1/files`, 200);
    });

    it("makes a call to the scan dataset files endpoint", () => {
      FileInformationApi.savePhotoAreaFile({
          projectId: "some-project-id",
          photoAreaId: 1
        },
        new ApiCloudFile({
          purposeType: ApiPhotoAreaPurposeType.THREE_SIXTY_PHOTO,
          url: "some-download-url.com",
          lastModified: new Date("2018-04-01")
        }),
        user,
      );
      const request = fetchMock.lastCall();

      expect(request["0"]).to.eq(`${Http.baseUrl()}/projects/some-project-id/photo-areas/1/files`);
      expect(JSON.parse(request["1"].body as string)).to.deep.eq({
        purposeType: "THREE_SIXTY_PHOTO",
        url: "some-download-url.com",
        lastModified: DateConverter.dateToInstant(new Date("2018-04-01"))
      });
    });
  });

  describe("#saveScanDatasetFile", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/file`,
        200);
    });

    it("makes a call to the scan dataset files endpoint", () => {
      FileInformationApi.saveScanDatasetFile({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        },
        new ApiCloudFile({
          createdBy: "some-email@example.com",
          fileSize: 65536,
          originalFileName: "some-file.las",
          purposeType: ApiProjectPurposeType.OTHER,
          url: "some-download-url.com",
          lastModified: new Date("2018-04-01")
        }),
        user,
      );
      const request = fetchMock.lastCall();

      expect(request["0"])
        .to
        .eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/file`);
      expect(JSON.parse(request["1"].body as string)).to.deep.eq({
        createdBy: "some-email@example.com",
        fileSize: 65536,
        originalFileName: "some-file.las",
        purposeType: ApiProjectPurposeType.OTHER,
        url: "some-download-url.com",
        lastModified: DateConverter.dateToInstant(new Date("2018-04-01"))
      });
    });

    it("sends the request with authorization headers", () => {
      FileInformationApi.saveScanDatasetFile({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        },
        new ApiCloudFile({
          purposeType: ApiProjectPurposeType.OTHER,
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
        fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/file`,
          500,
          { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return FileInformationApi.saveScanDatasetFile({
            projectId: "some-project-id",
            floorId: "some-floor-id",
            scanDatasetId: "some-scan-id"
          },
          new ApiCloudFile({
            purposeType: ApiProjectPurposeType.OTHER,
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

  describe("#deleteFile", () => {
    beforeEach(() => {
      fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/files/3`,
        200);
    });

    it("makes a call to the delete file endpoint", () => {
      FileInformationApi.deleteFile({ projectId: "some-project-id" }, 3, user);
      const request = fetchMock.lastCall();

      expect(request["0"]).to.eq(`${Http.baseUrl()}/projects/some-project-id/files/3`);
    });

    it("sends the request with authorization headers", () => {
      FileInformationApi.deleteFile({ projectId: "some-project-id" }, 3, user);

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/files/3`,
          500,
          { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return FileInformationApi.deleteFile({ projectId: "some-project-id" }, 3, user)
          .catch(() => {}).then(() => {
          expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({});
        });
      });
    });
  });
});
