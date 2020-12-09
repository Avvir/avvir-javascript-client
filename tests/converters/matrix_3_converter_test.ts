import { Matrix3 } from "three";
import Matrix3Converter from "../../source/converters/matrix_3_converter";
import { expect } from "chai";



describe("Matrix3Converter", () => {
  let someMatrix3, someMatrix3AsString, someMatrix3AsStringWithRandomSpaces
  beforeEach(() => {
    someMatrix3 = new Matrix3().set(1, 2, 3,
      4, 5, 6,
      7, 8, 9.77772);

    someMatrix3AsString = `1 2 3
4 5 6
7 8 9.77772`;

    someMatrix3AsStringWithRandomSpaces = `  1    2  3  
  4 5  6 
  7  8 9.77772`;

  });

  describe("#fromMatrix3ToString", () => {
    it("returns space-separated values", () => {
      expect(Matrix3Converter.fromMatrix3ToString(someMatrix3)).to.eq(someMatrix3AsString);
    });

    it("does not change the matrix", () => {
      let originalArray = someMatrix3.toArray();
      Matrix3Converter.fromMatrix3ToString(someMatrix3);
      expect(someMatrix3.toArray()).to.deep.eq(originalArray);
    });
  });

  describe("#fromStringToMatrix3", () => {
    it("parses space-separated values", () => {
      expect(Matrix3Converter.fromStringToMatrix3(someMatrix3AsString)).to.deep.eq(someMatrix3);
    });

    describe("when there are extra spaces", () => {
      it("ignores them", () => {
        expect(Matrix3Converter.fromStringToMatrix3(someMatrix3AsStringWithRandomSpaces)).to.deep.eq(someMatrix3);
      });
    });

    describe("when the wrong number of numbers is entered", () => {
      it("returns  null", () => {
        const result = Matrix3Converter.fromStringToMatrix3("1 1 1 1");
        expect(result).to.deep.eq(null);
      });
    });

    describe("when passed characters other than numbers", () => {
      it("returns null", () => {
        expect(Matrix3Converter.fromStringToMatrix3(`1 2 3 3
            1 1 1 ! 
            1 1 1 1 
            1 1 1 q`)).to.eq(null);
      });
    });

    describe("when passed empty string", () => {
      it("returns null", () => {
        expect(Matrix3Converter.fromStringToMatrix3("")).to.eq(null);
      });
    });
  });
});
