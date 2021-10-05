import AuthApi from "../source/api/auth_api";
import {describe} from "mocha";
import ApiCloudFile from "../source/models/api/api_cloud_file";
import {BIM_NWD, OTHER, ScanDatasetPurposeType} from "../source/models/enums/purpose_type";
import {expect} from "chai";
import {User} from "../source/utilities/get_authorization_headers";
import FileInformationApi from "../source/api/file_information_api";
import {sandbox} from "../tests/test_utils/setup_tests";
import Config from "../source/config";


describe("Assocate Project file to scan dataset files test", () => {
  let projectId: string, user: User, email: string, password: string, checkPipeline, checkPipelineTimeout: number,
      checkPipelineIterations: number, fileUrl: string;
  beforeEach(() => {
    email = process.env.AVVIR_SANDBOX_EMAIL
    password = process.env.AVVIR_SANDBOX_PASSWORD
    projectId = '-Mk8kNkZoSOVlAewkBqc';
    fileUrl = "https://storage.googleapis.com/avvir-public-readonly/old_bim.nwd"
    checkPipelineTimeout = 1000;
    checkPipelineIterations = 100
    sandbox.stub(Config, "sharedErrorHandler");
  })

  describe("when a project file has been ingested and a scan dataset exists",  () => {
    let pipeline;
    beforeEach(()=>{

      // pipeline =
    })
    it("should return a success response",  () => {
      // this.timeout(0)
      console.log("starting...")
      AuthApi.login(email, password)
          .then((user) => {
            console.log("user logged in");
            let floorId = '-Mk8kPX_ISw-nO_5QZ10';
            let cloudFile = new ApiCloudFile({
              url: fileUrl,
              purposeType: OTHER
            });

            FileInformationApi.saveFloorFile({ projectId, floorId }, cloudFile, user)
                .then((floorFile: ApiCloudFile)=>{
                  console.log("saving", floorFile);
                }).catch((e)=>{
                  console.log(e);
            }).then(()=> {
              console.log("caught");
            });
          }).catch(console.log)



    });
  })


});