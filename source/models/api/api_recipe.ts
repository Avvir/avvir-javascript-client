import { Modify } from "./type_aliases";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";

export interface ApiRecipeArgument extends Partial<Modify<ApiRecipe, {
    name?: string | null
    isEnabled?: boolean | null
    modeledCode?: string | null
    steps?: ApiRecipeStep[] | null
}>> {
}

class ApiRecipe {
    readonly id: number
    readonly projectFirebaseId?: string
    name: string
    isEnabled: boolean
    modeledCode?: string
    steps?: ApiRecipeStep[]

    constructor({id, projectFirebaseId, name, isEnabled, modeledCode, steps}: ApiRecipeArgument) {
        addReadOnlyPropertiesToModel(this, {id, projectFirebaseId});
        this.name = name;
        this.isEnabled = isEnabled;
        this.modeledCode = modeledCode;
        this.steps = steps || [];
    }
}

export interface ApiRecipeStepArgument extends Partial<Modify<ApiRecipeStep, {
    ordinal: number
    name?: string | null
    code?: string | null
    partialProgressPercent?: number | null
}>> {
}

class ApiRecipeStep {
    readonly id: number
    readonly recipeId: number
    readonly globalRecipeStepId: number
    name: string
    code: string
    ordinal: number
    partialProgressPercent: number

    constructor({ id, recipeId, globalRecipeStepId, ordinal, name, code, partialProgressPercent }: ApiRecipeStepArgument) {
        addReadOnlyPropertiesToModel(this, { id, recipeId, globalRecipeStepId });
        this.ordinal = ordinal;
        this.name = name || null;
        this.code = code || null;
        this.partialProgressPercent = partialProgressPercent || 0.0;
    }
}

export default ApiRecipe;
