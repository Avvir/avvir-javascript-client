import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";

import type { ApiRecipe, User } from "../models";
import type { AssociationIds } from "type_aliases";

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

  static createProjectTradeRecipe({ projectId }: AssociationIds, apiRecipe: ApiRecipe, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/trade-recipes`;
    return Http.post(url, user, apiRecipe) as unknown as Promise<ApiRecipe>;
  }

  static listProjectTradeRecipes({ projectId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/trade-recipes`;
    return Http.get(url, user) as unknown as Promise<ApiRecipe[]>;
  }

  static updateProjectTradeRecipe({ projectId }: AssociationIds, apiRecipe: ApiRecipe, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/trade-recipes/${apiRecipe.id}`;
    return Http.put(url, user, apiRecipe) as unknown as Promise<ApiRecipe>;
  }

  static deleteProjectTradeRecipe({ projectId }: AssociationIds, recipeId: number, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/trade-recipes/${recipeId}`;
    return Http.delete(url, user) as unknown as Promise<void>;
  }

  static deleteProjectTradeRecipeStep({ projectId }: AssociationIds, recipeId: number, stepId: number, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/trade-recipes/${recipeId}/steps/${stepId}`;
    return Http.delete(url, user) as unknown as Promise<ApiRecipe>;
  }
}

makeErrorsPretty(RecipeApi);
