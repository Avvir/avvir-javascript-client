import { UniformatId } from "uniformat";
export default class ProgressCategory {
    uniformatId: UniformatId;
    total: number;
    built: number;
    label: string;
    subCategories?: ProgressCategory[];
}
