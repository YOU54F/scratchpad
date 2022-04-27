import * as proxyquire from "proxyquire";
import * as sinon from "sinon";

describe("utils", () => {
  let loggerMock: any;
  let utils: any;

  beforeEach(() => {
    loggerMock = {
      error: sinon.stub(),
      info: sinon.stub(),
      debug: sinon.stub()
    };

    utils = proxyquire("./utils.ts", {
      "./logger": loggerMock
    });
  });

  beforeEach(() => {
    loggerMock.error.reset();
    loggerMock.info.reset();
    loggerMock.debug.reset();
  });

  describe("parseParams", () => {
    it("should return the body", () => {
      const result = utils.parseParams("/heisenberg", { walter: "white" });
      expect(Object.keys(result)).toEqual(["walter"]);
      expect(result.walter).toEqual("white");
    });

    it("should merge query parameters with body", () => {
      const result = utils.parseParams("/heisenberg?the=one&who=knocks", {
        walter: "white"
      });

      // expect(qsMock.parse).toHaveBeenCalledWith('the=one&who=knocks')
      expect(Object.keys(result)).toEqual(["walter", "the", "who"]);
      expect(result.walter).toEqual("white");
      expect(result.the).toEqual("one");
      expect(result.who).toEqual("knocks");
    });

    it("should parse application/x-www-form-urlencoded body", () => {
      const result = utils.parseParams(
        "/heisenberg?the=one&who=knocks",
        "walter=white"
      );
      expect(result).toEqual({ the: "one", who: "knocks", walter: "white" });
    });
  });
});
