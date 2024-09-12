import { getFormattedBrDate } from "../formattedBrDate";

describe("getFormattedBrDate utility", () => {
  it("should return 2024-12-22 formatted date with br pattern", () => {
    const result = getFormattedBrDate('2024-12-22');
    expect(result).toBe("22/12/2024");
  });

  it("should return 2024-05-15 formatted date with br pattern correctly", () => {
    const result = getFormattedBrDate('2024-05-15');
    expect(result).toBe("15/05/2024");
  });

});
