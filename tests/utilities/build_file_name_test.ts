import { expect } from "chai";
import buildFileName from "../../source/utilities/build_file_name";

describe("buildFileName", () => {
  it("doesn't allow forbidden characters", () => {
    expect(buildFileName("this/is~a+file|name,with[]'\"?^$.#!*<>\\{}`:;% illegal characters")).to.eq("this-is-a-file-name-with-illegal-characters");
  });

  it("kebab cases the file name", () => {
    expect(buildFileName("Some File Name")).to.eq("some-file-name");
  });

  describe("when the file is associated with a project", () => {
    it("includes the project name in the file's name", () => {
      expect(buildFileName("", { projectName: "Some Project" })).to.eq("some-project");
    });
  });

  describe("when the file is associated with a floor", () => {
    it("includes the floor number in the file's name", () => {
      expect(buildFileName("some-project", { floorNumber: "Some Floor" })).to.eq("some-project_floor-some-floor");
    });
  });

  describe("when the file is associated with a scan dataset", () => {
    it("includes the scan number in the file's name", () => {
      expect(buildFileName("some-project_floor-some-floor", { scanNumber: 3 })).to.eq("some-project_floor-some-floor_scan-3");
    });
  });
});
