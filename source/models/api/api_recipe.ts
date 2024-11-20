import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";

import type { ModifyPartial } from "type_aliases";

export type ApiRecipeArgument = ModifyPartial<ApiRecipe, {
  steps?: Partial<ApiRecipeStep>[] | null
}>

export class ApiRecipe {
  readonly id: number;
  readonly firebaseProjectId?: string;
  name: string;
  isEnabled: boolean;
  modeledCode?: string;
  steps?: ApiRecipeStep[];

  constructor({ id, firebaseProjectId, name, isEnabled, modeledCode, steps }: ApiRecipeArgument) {
    addReadOnlyPropertiesToModel(this, { id, firebaseProjectId });
    this.name = name;
    this.isEnabled = isEnabled || false;
    this.modeledCode = modeledCode;
    this.steps = steps?.map(step => new ApiRecipeStep(step)) || [];
  }
}

export class ApiRecipeStep {
  readonly id: number;
  readonly recipeId: number;
  readonly globalRecipeStepId: number;
  name: string;
  code: string;
  ordinal: number;
  partialProgressPercent: number;

  constructor({
                id,
                recipeId,
                globalRecipeStepId,
                ordinal,
                name,
                code,
                partialProgressPercent
              }: Partial<ApiRecipeStep>)
  {
    addReadOnlyPropertiesToModel(this, { id, recipeId, globalRecipeStepId });
    this.ordinal = ordinal;
    this.name = name || null;
    this.code = code || null;
    this.partialProgressPercent = partialProgressPercent || 0.0;
  }
}

export default ApiRecipe;
