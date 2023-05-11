import AuthApi from "../../source/api/auth_api";
import {describe} from "mocha";
import {expect} from "chai";
import {sandbox} from "../../tests/test_utils/setup_tests";
import Config from "../../source/config";
import FloorApi from "../../source/api/floor_api";

describe("When a user is authenticated for a project", () => {
  let projectId: string, email: string, password: string;
  beforeEach(() => {
    email = process.env.AVVIR_SANDBOX_EMAIL
    password = process.env.AVVIR_SANDBOX_PASSWORD
    projectId = '-Mn1zAbbiL6a-EDY5cRE';
    sandbox.stub(Config, "sharedErrorHandler");
  })

    it("should create a floor",  function (done) {
        this.timeout(0)
        console.log("starting...")
        AuthApi.login(email, password)
            .then((user) => {
                FloorApi.createFloor(projectId, 'test floor', user)
                    .then((floor) => {
                        expect(floor.floorNumber).to.eq('test floor')
                        done()
                    })
            }).catch(console.log)
    })


});

describe("When a user is not authenticated for a project", () => {
    let projectId: string, email: string, password: string;
    beforeEach(() => {
        email = 'avvir_sandbox_2@email.com'
        password = 'H6BM7e*gjOsV*n5X'
        projectId = '-Mn1zAbbiL6a-EDY5cRE';
        sandbox.stub(Config, "sharedErrorHandler");
    })

    it("should not create a floor",  function(done) {
        this.timeout(0)
        console.log("starting...")
        AuthApi.login(email, password)
            .then((user) => {
                FloorApi.createFloor(projectId, 'bad floor', user)
                    .then((floor) => {
                        expect(floor).to.eq(undefined)
                        done()
                    })
                    .catch(console.log)
            }).catch(console.log)
    })


});