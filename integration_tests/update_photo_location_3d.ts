import AuthApi from "../source/api/auth_api";
import {describe} from "mocha";
import {expect} from "chai";
import {sandbox} from "../tests/test_utils/setup_tests";
import Config from "../source/config";
import ApiPhotoLocation3d from "../source/models/api/api_photo_location_3d";
import PhotoAreaApi from "../source/api/photo_area_api";
import {Euler, Quaternion} from "three";

describe("When a user is authenticated for a project", () => {
  let projectId: string, email: string, password: string, photoAreaId: number, photoLocationId: number, photoLocation3d: ApiPhotoLocation3d;
  beforeEach(() => {
    email = process.env.AVVIR_SANDBOX_EMAIL
    password = process.env.AVVIR_SANDBOX_PASSWORD
    projectId = '-MGtQvxl_SIBzRqIyg1_';
    photoAreaId = 553;
    photoLocationId = 513146;
    let angle = Math.PI/2;
    let euler = new Euler(angle, angle, 0);
    let quaternion = new Quaternion().setFromEuler(euler);
    let orientation = { a: quaternion.x, b: quaternion.y, c: quaternion.z, d: quaternion.w };

    photoLocation3d = new ApiPhotoLocation3d({
        id: null,
        position: {x: 2, y: 1, z: 1},
        orientation
    });
    sandbox.stub(Config, "sharedErrorHandler");
  })

    it("should update a photo location",  function (done) {
        this.timeout(0);
        AuthApi.login(email, password)
            .then((user) => {
                PhotoAreaApi.updatePhotoLocationPositionAndOrientation({projectId, photoAreaId, photoLocationId}, photoLocation3d, user)
                    .then((photoLocation) => {
                        console.log(photoLocation);
                        expect(photoLocation.bimLocation.position).is.deep.eq(photoLocation3d.position);
                        expect(photoLocation.bimLocation.orientation).is.deep.eq(photoLocation3d.orientation);
                        done()
                    })
            }).catch(console.log)
    })


});
