import {describe} from "mocha";
import {User} from "../../source/models/domain/user";
// @ts-ignore
import fetchMock from "fetch-mock";
import {UserAuthType} from "../../source/models/enums/user_auth_type";
import {UserRole} from "../../source/models/enums/user_role";
import Http from "../../source/utilities/http";
import {expect} from "chai";
import RecipeApi from "../../source/api/recipe_api";
import ApiRecipe from "../../source/models/api/api_recipe";

describe("RecipeApi", () => {
    let user: User;
    beforeEach(() => {
        fetchMock.resetBehavior();
        user = {
            authType: UserAuthType.FIREBASE,
            firebaseUser: {uid: "some-uid", role: UserRole.SUPERADMIN, idToken: "some-firebase.id.token"}
        };
    });
    describe("::getGlobalRecipe", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/recipes/1`, 200);
        });

        it("makes a request to the gateway api", () => {
            RecipeApi.getGlobalRecipe({recipeId: 1}, {
                authType: "GATEWAY_JWT",
                gatewayUser: {idToken: "some-firebase.id.token"}
            } as User);
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/recipes/1`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("includes the authorization headers", () => {
            RecipeApi.getGlobalRecipe({recipeId: 1}, {
                authType: "GATEWAY_JWT",
                gatewayUser: {idToken: "some-firebase.id.token"}
            } as User);

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("::getProjectRecipe", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/recipes/1`, 200);
        });

        it("makes a request to the gateway api", () => {
            RecipeApi.getProjectRecipe({projectId: "some-project-id", recipeId: 1}, {
                authType: "GATEWAY_JWT",
                gatewayUser: {idToken: "some-firebase.id.token"}
            } as User);
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/recipes/1`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("includes the authorization headers", () => {
            RecipeApi.getProjectRecipe({projectId: "some-project-id", recipeId: 1}, {
                authType: "GATEWAY_JWT",
                gatewayUser: {idToken: "some-firebase.id.token"}
            } as User);

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("::listGlobalRecipes", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/recipes`, 200);
        });

        it("makes a call to the endpoint", () => {
            RecipeApi.listGlobalRecipes(user);

            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/recipes`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("sends the request with an Authorization header", () => {
            RecipeApi.listGlobalRecipes(
                {
                    authType: UserAuthType.GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
                });

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("::listProjectRecipes", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/recipes`, 200);
        });

        it("makes a call to the endpoint", () => {
            RecipeApi.listProjectRecipes({projectId: "some-project-id"}, user);

            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/recipes`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("sends the request with an Authorization header", () => {
            RecipeApi.listProjectRecipes({projectId: "some-project-id"}, {
                authType: UserAuthType.GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
            });

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("::createGlobalRecipe", () => {
        beforeEach(() => {
            fetchMock.post(`${Http.baseUrl()}/recipes`, 200);
        });

        it("makes a request to the gateway api", () => {
            RecipeApi.createGlobalRecipe(
                new ApiRecipe({
                    name: "some recipe name",
                    isEnabled: true,
                    modeledCode: "1234"
                }), {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/recipes`);
            expect(JSON.parse(fetchCall[1].body as string)).to.deep.eq({
                "isEnabled": true,
                "modeledCode": "1234",
                "name": "some recipe name",
                "steps": []
            });
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("includes the authorization headers", () => {
            RecipeApi.createGlobalRecipe(
                new ApiRecipe({
                    name: "some recipe name",
                    isEnabled: true,
                    modeledCode: "1234"
                }), {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("::createProjectRecipe", () => {
        beforeEach(() => {
            fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/recipes`, 200);
        });

        it("makes a request to the gateway api", () => {
            RecipeApi.createProjectRecipe({
                    projectId: "some-project-id"
                },
                new ApiRecipe({
                    name: "some recipe name",
                    isEnabled: true,
                    modeledCode: "1234"
                }), {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/recipes`);
            expect(JSON.parse(fetchCall[1].body as string)).to.deep.eq({
                "isEnabled": true,
                "modeledCode": "1234",
                "name": "some recipe name",
                "steps": []
            });
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("includes the authorization headers", () => {
            RecipeApi.createProjectRecipe({
                    projectId: "some-project-id"
                },
                new ApiRecipe({
                    name: "some recipe name",
                    isEnabled: true,
                    modeledCode: "1234"
                }), {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("::updateGlobalRecipe", () => {
        beforeEach(() => {
            fetchMock.put(`${Http.baseUrl()}/recipes/1`, 200);
        });

        it("makes a request to the gateway api", () => {
            RecipeApi.updateGlobalRecipe({
                    recipeId: 1
                },
                new ApiRecipe({
                    name: "some updated name",
                    isEnabled: true,
                    modeledCode: "1234"
                }), {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/recipes/1`);
            expect(JSON.parse(fetchCall[1].body as string)).to.deep.eq({
                "isEnabled": true,
                "modeledCode": "1234",
                "name": "some updated name",
                "steps": []
            });
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("includes the authorization headers", () => {
            RecipeApi.updateGlobalRecipe({
                    recipeId: 1
                },
                new ApiRecipe({
                    name: "some recipe name",
                    isEnabled: true,
                    modeledCode: "1234"
                }), {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("::updateProjectRecipe", () => {
        beforeEach(() => {
            fetchMock.put(`${Http.baseUrl()}/projects/some-project-id/recipes/1`, 200);
        });

        it("makes a request to the gateway api", () => {
            RecipeApi.updateProjectRecipe({
                    projectId: "some-project-id",
                    recipeId: 1
                },
                new ApiRecipe({
                    name: "some updated name",
                    isEnabled: true,
                    modeledCode: "1234"
                }), {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/recipes/1`);
            expect(JSON.parse(fetchCall[1].body as string)).to.deep.eq({
                "isEnabled": true,
                "modeledCode": "1234",
                "name": "some updated name",
                "steps": []
            });
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("includes the authorization headers", () => {
            RecipeApi.updateProjectRecipe({
                    projectId: "some-project-id",
                    recipeId: 1
                },
                new ApiRecipe({
                    name: "some recipe name",
                    isEnabled: true,
                    modeledCode: "1234"
                }), {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("::deleteGlobalRecipe", () => {
        beforeEach(() => {
            fetchMock.delete(`${Http.baseUrl()}/recipes/1`, 200);
        });

        it("makes a request to the gateway api", () => {
            RecipeApi.deleteGlobalRecipe({recipeId: 1}, {
                authType: "GATEWAY_JWT",
                gatewayUser: {idToken: "some-firebase.id.token"}
            } as User);
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/recipes/1`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("includes the authorization headers", () => {
            RecipeApi.deleteGlobalRecipe({recipeId: 1}, {
                authType: "GATEWAY_JWT",
                gatewayUser: {idToken: "some-firebase.id.token"}
            } as User);

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("::deleteProjectRecipe", () => {
        beforeEach(() => {
            fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/recipes/1`, 200);
        });

        it("makes a request to the gateway api", () => {
            RecipeApi.deleteProjectRecipe({projectId: "some-project-id", recipeId: 1}, {
                authType: "GATEWAY_JWT",
                gatewayUser: {idToken: "some-firebase.id.token"}
            } as User);
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/recipes/1`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("includes the authorization headers", () => {
            RecipeApi.deleteProjectRecipe({projectId: "some-project-id", recipeId: 1}, {
                authType: "GATEWAY_JWT",
                gatewayUser: {idToken: "some-firebase.id.token"}
            } as User);

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("::deleteProjectRecipeStep", () => {
        beforeEach(() => {
            fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/recipes/1/steps/10`, 200);
        });
        it("makes a request to the gateway api", () => {
            RecipeApi.deleteProjectRecipeStep({projectId: "some-project-id", recipeId: 1, recipeStepId: 10}, {
                authType: "GATEWAY_JWT",
                gatewayUser: {idToken: "some-firebase.id.token"}
            } as User);
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/recipes/1/steps/10`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });
        it("includes the authorization headers", () => {
            RecipeApi.deleteProjectRecipeStep({projectId: "some-project-id", recipeId: 1, recipeStepId: 10}, {
                authType: "GATEWAY_JWT",
                gatewayUser: {idToken: "some-firebase.id.token"}
            } as User);

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    })
});