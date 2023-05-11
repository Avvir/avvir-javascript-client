import AuthApi from "../../source/api/auth_api";
import {describe} from "mocha";
import ApiCloudFile from "../../source/models/api/api_cloud_file";
import {expect} from "chai";
import FileInformationApi from "../../source/api/file_information_api";
import {sandbox} from "../../tests/test_utils/setup_tests";
import Config from "../../source/config";
import {ApiScanDatasetPurposeType} from "../../source";


describe("Assocate Project file to scan dataset files test", () => {
  let projectId: string, email: string, password: string, checkPipelineTimeout: number,
    checkPipelineIterations: number, fileUrl: string;
  beforeEach(() => {
    email = process.env.AVVIR_SANDBOX_EMAIL
    password = process.env.AVVIR_SANDBOX_PASSWORD
    projectId = '-Mk8kNkZoSOVlAewkBqc';
    fileUrl = "https://firebasestorage.googleapis.com/v0/b/avvir-portal-acceptance.appspot.com/o/project_uploads%2F-Mk8kNkZoSOVlAewkBqc%2Fbenchmarks_floor-6-of-9-walls-built_scan-1_processed-scan_fkdo_gfog.las?alt=media&token=09791114-ddc6-4330-813e-b25ce5a6bad7"
    checkPipelineTimeout = 1000;
    checkPipelineIterations = 100
    sandbox.stub(Config, "sharedErrorHandler");
  })

  describe("when a project file has been ingested and a scan dataset exists",  () => {
    beforeEach(()=>{

      // pipeline =
    })
    it("should return a success response",  () => {
      // this.timeout(0)
      console.log("starting...")
      AuthApi.login(email, password)
          .then((user) => {
            console.log("user logged in")
            let scanDatasetId = '-Mk8vy1VMMMtaPNltVdg';
            let floorId = '-Mk8kPX_ISw-nO_5QZ1';
            let cloudFile = new ApiCloudFile({
              url: fileUrl,
              purposeType: ApiScanDatasetPurposeType.PREPROCESSED_SCAN
            });

            FileInformationApi.saveScanDatasetFile({ projectId, floorId, scanDatasetId }, cloudFile, user)
                .then((scanDatasetCloudFile: ApiCloudFile)=>{
                  console.log("saving")
                  expect(scanDatasetCloudFile.purposeType).to.be.eq(ApiScanDatasetPurposeType.PREPROCESSED_SCAN);
                  expect(scanDatasetCloudFile.url).to.be.eq(fileUrl);
                }).catch(console.log).then(()=> {
                  console.log("caught");
                });
          }).catch(console.log)



    });
  })


});