import Avvir from "../avvir";
import DateConverter from "../source/converters/date_converter";

describe("Avvir", () => {
  it("has all the classes from the source directory available for import", () => {
    expect(Avvir.DateConverter).to.eq(DateConverter);
  });
});