import { getQueryParam } from "../getQueryParam";

describe("getQueryParam utility", () => {
  it("should return a query string when valid key-value pair is provided", () => {
    const param = { cpf: "123.456.789-00" };
    const result = getQueryParam(param);
    expect(result).toBe("?cpf=123.456.789-00");
  });

  it("should return an encoded query string when the value contains special characters", () => {
    const param = { name: "John Doe" };
    const result = getQueryParam(param);
    expect(result).toBe("?name=John%20Doe");
  });

  it("should return an empty string if the key is missing", () => {
    const param = {};
    const result = getQueryParam(param);
    expect(result).toBe("");
  });

  it("should return an empty string if the value is missing", () => {
    const param = { cpf: "" };
    const result = getQueryParam(param);
    expect(result).toBe("");
  });

  it("should return an empty string if the key or value is undefined", () => {
    const param = { cpf: undefined as any };
    const result = getQueryParam(param);
    expect(result).toBe("");
  });

  it("should return a query string when the value contains URL-unsafe characters", () => {
    const param = { search: "hello world&" };
    const result = getQueryParam(param);
    expect(result).toBe("?search=hello%20world%26");
  });
});
