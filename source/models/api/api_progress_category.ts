import { UniformatId } from "uniformat";

export class ApiProgressCategory {
  uniformatId: UniformatId;
  total: number;
  built: number;
  label: string;
  subCategories?: ApiProgressCategory[];
}

export default ApiProgressCategory;