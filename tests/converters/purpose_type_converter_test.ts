import { expect } from "chai";
import PurposeTypeConverter from "../../source/converters/purpose_type_converter";
import { FloorPurposeType, ProjectPurposeType, PurposeType, ScanDatasetPurposeType } from "../../source";
import { ApiFloorPurposeType, ApiProjectPurposeType, ApiPurposeType, ApiScanDatasetPurposeType } from "../../source";

describe("PurposeTypeConverter", () => {
  describe("#toApiPurposeType", () => {
    it("returns the SCREAMING_SNAKE_CASE version", () => {
      expect(PurposeTypeConverter.toApiPurposeType(FloorPurposeType.BIM_MESH_OBJ)).to.eq("BIM_MESH_OBJ");
    });

    it("converts all of the purpose types", () => {
      const allPurposeTypes = (Object.values(ProjectPurposeType) as PurposeType[]).concat(Object.values(FloorPurposeType)).concat(Object.values(ScanDatasetPurposeType));

      allPurposeTypes.forEach(purposeType => {
        expect(PurposeTypeConverter.toApiPurposeType(purposeType)).not.to.be.undefined;
      });
    });
  });

  describe("#toPurposeType", () => {
    it("returns the camelCase version", () => {
      expect(PurposeTypeConverter.toPurposeType(ApiFloorPurposeType.BIM_MESH_OBJ)).to.eq("bimMeshObj");
    });

    it("converts all of the purpose types", () => {
      const allPurposeTypes = (Object.values(ApiProjectPurposeType) as ApiPurposeType[]).concat(Object.values(ApiFloorPurposeType)).concat(Object.values(ApiScanDatasetPurposeType));

      allPurposeTypes.forEach(purposeType => {
        const converted = PurposeTypeConverter.toPurposeType(purposeType);
        expect(converted).not.to.be.undefined;
      });
    });
  });
});
