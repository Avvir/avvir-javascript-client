import level1 from "../../resources/uniformat/level_1.json";
import level2 from "../../resources/uniformat/level_2.json";
import level3 from "../../resources/uniformat/level_3.json";
import level4 from "../../resources/uniformat/level_4.json";

export type UniformatLevel = 1 | 2 | 3 | 4;
export type Level1Id = keyof typeof level1 | "OTHER";
export type Level2Id = keyof typeof level2 & string;
export type Level3Id = keyof typeof level3 & string;
export type Level4Id = keyof typeof level4 & string;
export type UniformatLevel1 = typeof level1 & { OTHER: string };
export type UniformatLevel2 = typeof level2;
export type UniformatLevel3 = typeof level3;
export type UniformatLevel4 = typeof level4;
export type UniformatId = Level1Id | Level2Id | Level3Id | Level4Id
export type Uniformat = UniformatLevel1 | UniformatLevel2 | UniformatLevel3 | UniformatLevel4
export type UniformatCodesWithParents = Level2Id | Level3Id | Level4Id;
export type UniformatCodesWithChildren = Level1Id | Level2Id | Level3Id;
export type UniformatsWithParents = UniformatLevel2 | UniformatLevel3 | UniformatLevel4;
export type UniformatsWithChildren = UniformatLevel1 | UniformatLevel2 | UniformatLevel3;
