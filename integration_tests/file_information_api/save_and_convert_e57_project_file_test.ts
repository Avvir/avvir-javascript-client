import {describe} from "mocha";
import {expect} from "chai";
import FileInformationApi from "../../source/api/file_information_api";
import ApiCloudFile from "../../source/models/api/api_cloud_file";
import AuthApi from "../../source/api/auth_api";
import {ApiProjectPurposeType} from "../../source";

describe("Ingest project files test", () => {
  let projectId: string, email: string, password: string;

  beforeEach(() => {
    email = process.env.AVVIR_SANDBOX_EMAIL
    password = process.env.AVVIR_SANDBOX_PASSWORD
    projectId = '-MmYhmgXRbd0_ms1-OvV' //e57 conversion project in portal
  });

  it("uploads an e57 project file, and converts it to an las project file", function () {
    this.timeout(0)
    let apiFile: ApiCloudFile = new ApiCloudFile({
      url: 'https://storage.googleapis.com/avvir-public-readonly/test-point-cloud.e57',
      purposeType: ApiProjectPurposeType.OTHER
    })
    return AuthApi.login(email, password)
        .then((user) => {
            return FileInformationApi.saveAndConvertE57ProjectFile({projectId}, apiFile, user).then((ingestedFile)=>{
              let isExternalUrl = new RegExp(`https://storage.googleapis.com/avvir-portal-acceptance.appspot.com/project_uploads/${projectId}/.+?_test-point-cloud\\.las`)
              expect(isExternalUrl.test(ingestedFile.url)).to.eq(true);
              return;
            })
        });

  })
})