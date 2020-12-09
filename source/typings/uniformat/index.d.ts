import level1 from "../../resources/uniformat/level_1.json";
import level2 from "../../resources/uniformat/level_2.json";
import level3 from "../../resources/uniformat/level_3.json";
import level4 from "../../resources/uniformat/level_4.json";

type UniformatLevel = 1 | 2 | 3 | 4;
type Level1Id = keyof typeof level1 | "OTHER";
type Level2Id = keyof typeof level2 & string;
type Level3Id = keyof typeof level3 & string;
type Level4Id = keyof typeof level4 & string;
type UniformatLevel1 = typeof level1 & { OTHER: string };
type UniformatLevel2 = typeof level2;
type UniformatLevel3 = typeof level3;
type UniformatLevel4 = typeof level4;
type UniformatId = Level1Id | Level2Id | Level3Id | Level4Id
type Uniformat = UniformatLevel1 | UniformatLevel2 | UniformatLevel3 | UniformatLevel4
type UniformatCodesWithParents = Level2Id | Level3Id | Level4Id;
type UniformatCodesWithChildren = Level1Id | Level2Id | Level3Id;
type UniformatsWithParents = UniformatLevel2 | UniformatLevel3 | UniformatLevel4;
type UniformatsWithChildren = UniformatLevel1 | UniformatLevel2 | UniformatLevel3;
