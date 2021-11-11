import AuthApi from "../source/api/auth_api";
import {describe} from "mocha";
import {expect} from "chai";
import {sandbox} from "../tests/test_utils/setup_tests";
import Config from "../source/config";
import FloorApi from "../source/api/floor_api";
import ApiPhotoLocation3d from "../source/models/api/api_photo_location_3d";
import PhotoAreaApi from "../source/api/photo_area_api";

describe("When a user is authenticated for a project", () => {
  let projectId: string, email: string, password: string, photoAreaId: number, photoLocationId: number, photoLocation3d: ApiPhotoLocation3d;
  beforeEach(() => {
    email = process.env.AVVIR_SANDBOX_EMAIL
    password = process.env.AVVIR_SANDBOX_PASSWORD
    projectId = '-MGtQvxl_SIBzRqIyg1_';
    photoAreaId = 553;
    photoLocationId = 513148;
    photoLocation3d = new ApiPhotoLocation3d({
        id: null,
        position: {x: 2, y: 1, z: 1},
        orientation: {a: 1, b: .4, c: .3, d: .2}
    });
    sandbox.stub(Config, "sharedErrorHandler");
  })

    it("should create a floor",  function (done) {
        this.timeout(0)
        console.log("starting...")
        AuthApi.login(email, password)
            .then((user) => {
                PhotoAreaApi.updatePhotoLocationCoordinates({projectId, photoAreaId, photoLocationId}, photoLocation3d, user)
                    .then((photoLocation) => {
                        console.log(photoLocation);
                        expect(photoLocation.bimLocation).is.deep.eq(photoLocation3d);
                        done()
                    })
            }).catch(console.log)
    })


});
