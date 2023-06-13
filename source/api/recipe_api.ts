import {User} from "../utilities/get_authorization_headers";
import Http from "../utilities/http";
import {AssociationIds} from "../models";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import ApiRecipe from "../models/api/api_recipe";

export default class RecipeApi {
  static getGlobalRecipe({ recipeId }: AssociationIds, user: User, ): Promise<ApiRecipe|null> {
    let url = `${Http.baseUrl()}/recipes/${recipeId}`;
    return Http.get(url, user) as unknown as Promise<ApiRecipe|null>;
  }

  static listGlobalRecipes(user: User, ): Promise<ApiRecipe[]> {
    let url = `${Http.baseUrl()}/recipes`;
    return Http.get(url, user) as unknown as Promise<ApiRecipe[]>;
  }

  static createGlobalRecipe(apiRecipe: ApiRecipe, user: User, ): Promise<ApiRecipe> {
    let url = `${Http.baseUrl()}/recipes`;
    return Http.post(url, user, apiRecipe) as unknown as Promise<ApiRecipe>;
  }

  static updateGlobalRecipe({ recipeId }: AssociationIds, apiRecipe: ApiRecipe, user: User, ): Promise<ApiRecipe> {
    let url = `${Http.baseUrl()}/recipes/${recipeId}`;
    return Http.put(url, user, apiRecipe) as unknown as Promise<ApiRecipe>;
  }

  static deleteGlobalRecipe({ recipeId }: AssociationIds, user: User, ): Promise<void> {
    let url = `${Http.baseUrl()}/recipes/${recipeId}`;
    return Http.delete(url, user) as unknown as Promise<void>;
  }

  static getProjectRecipe({ projectId, recipeId }: AssociationIds, user: User, ): Promise<ApiRecipe|null> {
    let url = `${Http.baseUrl()}/projects/${projectId}/recipes/${recipeId}`;
    return Http.get(url, user) as unknown as Promise<ApiRecipe|null>;
  }

  static listProjectRecipes({ projectId }: AssociationIds, user: User, ): Promise<ApiRecipe[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/recipes`;
    return Http.get(url, user) as unknown as Promise<ApiRecipe[]>;
  }

  static createProjectRecipe({ projectId }: AssociationIds, apiRecipe: ApiRecipe, user: User, ): Promise<ApiRecipe> {
    let url = `${Http.baseUrl()}/projects/${projectId}/recipes`;
    return Http.post(url, user, apiRecipe) as unknown as Promise<ApiRecipe>;
  }

  static updateProjectRecipe({ projectId, recipeId }: AssociationIds, apiRecipe: ApiRecipe, user: User, ): Promise<ApiRecipe> {
    let url = `${Http.baseUrl()}/projects/${projectId}/recipes/${recipeId}`;
    return Http.put(url, user, apiRecipe) as unknown as Promise<ApiRecipe>;
  }

  static deleteProjectRecipe({ projectId, recipeId }: AssociationIds, user: User, ): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/recipes/${recipeId}`;
    return Http.delete(url, user) as unknown as Promise<void>;
  }

  static deleteProjectRecipeStep({projectId, recipeId, recipeStepId}: AssociationIds, user: User): Promise<ApiRecipe> {
    let url = `${Http.baseUrl()}/projects/${projectId}/recipes/${recipeId}/steps/${recipeStepId}`;
    return Http.delete(url, user) as unknown as Promise<ApiRecipe>;
  }
}

makeErrorsPretty(RecipeApi);