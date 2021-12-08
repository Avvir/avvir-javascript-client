import { UniformatId } from "uniformat";

export class ProgressCategory {
  uniformatId: UniformatId;
  total: number;
  built: number;
  label: string;
  subCategories?: ProgressCategory[];
}

export default ProgressCategory;