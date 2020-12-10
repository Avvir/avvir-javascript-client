import { Matrix4 } from "three";
import Matrix4Converter from "../../source/converters/matrix_4_converter";
import { expect } from "chai";



describe("Matrix4Converter", () => {
  let someMatrix4, someMatrix4AsString, someMatrix4AsStringWithRandomSpaces
  beforeEach(() => {
    someMatrix4 = new Matrix4().set(1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, 16.77772);

    someMatrix4AsString = `1 2 3 4
5 6 7 8
9 10 11 12
13 14 15 16.77772`;

    someMatrix4AsStringWithRandomSpaces = `  1    2  3  4
  5 6 7 8
  9  10 11   12
  13   14  15 16.77772`;

  });

  describe("#fromMatrix4ToString", () => {
    it("returns space-separated values", () => {
      expect(Matrix4Converter.fromMatrix4ToString(someMatrix4)).to.eq(someMatrix4AsString);
    });

    it("does not change the matrix", () => {
      let originalArray = someMatrix4.toArray();
      Matrix4Converter.fromMatrix4ToString(someMatrix4);
      expect(someMatrix4.toArray()).to.deep.eq(originalArray);
    });
  });

  describe("#fromStringToMatrix4", () => {
    it("parses space-separated values", () => {
      expect(Matrix4Converter.fromStringToMatrix4(someMatrix4AsString)).to.deep.eq(someMatrix4);
    });

    describe("when there are extra spaces", () => {
      it("ignores them", () => {
        expect(Matrix4Converter.fromStringToMatrix4(someMatrix4AsStringWithRandomSpaces)).to.deep.eq(someMatrix4);
      });
    });

    describe("when the wrong number of numbers is entered", () => {
      it("returns  null", () => {
        const result = Matrix4Converter.fromStringToMatrix4("1 1 1 1");
        expect(result).to.deep.eq(null);
      });
    });

    describe("when passed characters other than numbers", () => {
      it("returns null", () => {
        expect(Matrix4Converter.fromStringToMatrix4(`1 2 3 4
            1 1 1 ! 
            1 1 1 1 
            1 1 1 q`)).to.eq(null);
      });
    });

    describe("when passed empty string", () => {
      it("returns null", () => {
        expect(Matrix4Converter.fromStringToMatrix4("")).to.eq(null);
      });
    });
  });
});
