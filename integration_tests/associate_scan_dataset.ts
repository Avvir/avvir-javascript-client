import AuthApi from "../source/api/auth_api";
import {describe} from "mocha";
import {ScanDatasetPurposeType} from "../source/models/enums/purpose_type";
import {expect} from "chai";
import FileInformationApi from "../source/api/file_information_api";
import {sandbox} from "../tests/test_utils/setup_tests";
import Config from "../source/config";
import {User} from "../source/utilities/get_authorization_headers";
import ApiCloudFile, {ApiCloudFileArgument} from "../source/models/api/api_cloud_file";
import {AssociationIds} from "../source/typings/type_aliases";
import {ApiScanDatasetPurposeType} from "../source/models/api/api_purpose_type";


describe("Assocate Project file to scan dataset files test", () => {
  let projectId: string;
  let email: string;
  let password: string;
  let checkPipelineTimeout: number;
  let checkPipelineIterations: number;
  let fileUrl: string;
  let user: User;

  beforeEach(async () => {
    email = process.env.AVVIR_SANDBOX_EMAIL
    password = process.env.AVVIR_SANDBOX_PASSWORD
    projectId = '-Mk8kNkZoSOVlAewkBqc';
    fileUrl = "https://firebasestorage.googleapis.com/v0/b/avvir-portal-acceptance.appspot.com/o/project_uploads%2F-Mk8kNkZoSOVlAewkBqc%2Fbenchmarks_floor-6-of-9-walls-built_scan-1_processed-scan_fkdo_gfog.las?alt=media&token=09791114-ddc6-4330-813e-b25ce5a6bad7"
    checkPipelineTimeout = 1000;
    checkPipelineIterations = 100;
    user = await AuthApi.login(email, password)
    sandbox.stub(Config, "sharedErrorHandler");
  })

  describe("when a project file has been ingested and a scan dataset exists",  () => {
    it("should return a success response",  async () => {
        const captureDatasetId = '-Mk8vy1VMMMtaPNltVdg';
        const floorId = '-Mk8kPX_ISw-nO_5QZ10';

        const resultFile = await FileInformationApi.associateScanFileWithCaptureDataset({projectId, floorId, captureDatasetId}, {url: fileUrl}, user);
        expect(resultFile.purposeType).to.be.eq(ApiScanDatasetPurposeType.PREPROCESSED_SCAN);
        expect(resultFile.url).to.be.eq(fileUrl);
    });
  });

  describe("when a project file has been ingested and a scan dataset does not exist",  () => {
      it("should return a not found response", async () => {
          const captureDatasetId = 'does-not-exist';
          const floorId = '-Mk8kPX_ISw-nO_5QZ10';

          try {
              await FileInformationApi
                  .associateScanFileWithCaptureDataset({projectId, floorId, captureDatasetId}, {url: fileUrl}, user);
          } catch (error) {
              expect(error.message).to.be.eq("Not found");
          }
      });
  });

});
