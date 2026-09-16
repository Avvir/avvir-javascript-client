import {describe} from "mocha";
import {expect} from "chai";
import fetchMock from "fetch-mock";

import TosApi from "../../source/api/tos_api";
import {GATEWAY_JWT, User, USER, UserAuthType, UserRole} from "../../source";
import Http from "../../source/utilities/http";

describe("TosApi", () => {
    let user: User;

    beforeEach(() => {
        fetchMock.resetBehavior();
        user = {
            authType: UserAuthType.FIREBASE,
            firebaseUser: {
                uid: "some-uid",
                role: UserRole.SUPERADMIN,
                idToken: "some-firebase.id.token"
            }
        };
    });

    describe("::getLatest", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/tos/latest`, 200);
        });

        it("includes the authorization headers", () => {
            return TosApi.getLatest({
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).then(() => {
                expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            }).catch(console.error);
        });

        it("makes a call to the endpoint", () => {
            return TosApi.getLatest(user).then(latest => {
                expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/tos/latest`);
            }).catch(console.error);
        });
    });

    describe("::getAcceptances", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/tos/acceptances`, 200);
        });

        it("includes the authorization headers", () => {
            return TosApi.getAcceptances({
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).then(() => {
                expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            }).catch(console.error);
        });

        it("makes a call to the endpoint", () => {
            return TosApi.getAcceptances(user).then(latest => {
                expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/tos/acceptances`);
            }).catch(console.error);
        });
    });

    describe("::accept", () => {
        beforeEach(() => {
            fetchMock.post(`${Http.baseUrl()}/tos/123/accept`, 200);
        });

        it("includes the authorization headers", () => {
            return TosApi.accept(123, {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).then(() => {
                expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            }).catch(console.error);
        });

        it("makes a call to the endpoint", () => {
            return TosApi.accept(123, user).then(latest => {
                expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/tos/123/accept`);
            }).catch(console.error);
        });
    });
});
