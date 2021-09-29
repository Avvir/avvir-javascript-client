import { expect } from "chai";
import "./setup_tests";

describe("beVeryLike", () => {
  it("can pass", () => {
    expect([4]).to.beVeryLike([4]);
    expect([4]).not.to.beVeryLike([7]);

    // expect([4]).to.beVeryLike([5], 1.5);
  });

  xdescribe("tests that should fail", () => {
    it("can fail at level 0", () => {
      expect(4).to.beVeryLike(7);
      expect(4).not.to.beVeryLike(4);

    });

    it("can fail at level 1", () => {
      expect({ v: [4], a: "hi" }).to.beVeryLike({ v: [5], a: "hi" }, 1.5);

    });

  });
});
