import moxios = require("moxios");
import { logger } from "../lib/logger";
import { events } from "./events";

jest.mock("../lib/logger");

describe("mocker: events", () => {
  let resMock: any;
  let headersMock: any;
  let bodyMock: any;
  let target: string;
  let data: any;

  beforeEach(() => {
    beforeEach(() => moxios.install());

    moxios.install();
    bodyMock = { walter: "white" };
    headersMock = { channel: "AMC" };
    resMock = {
      headers: headersMock,
      status: 200
    };

    target = "http://gus.fring";
    data = { ding: "ding" };

    events.reset();
  });

  afterEach(() => moxios.uninstall());
  describe("send", () => {
    it("should have a successful result", () => {
      moxios.stubOnce("POST", target, {
        headers: headersMock,
        status: 200,
        response: { body: bodyMock }
      });

      return events.send({ target, data }).then(() => {
        expect(events.calls).toHaveLength(1);

        const firstCall = events.calls[0];
        expect(Object.keys(firstCall)).toMatchObject([
          "url",
          "params",
          "body",
          "headers",
          "statusCode"
        ]);

        expect(firstCall.url).toEqual(target);
        expect(firstCall.body).toEqual(bodyMock);
        expect(firstCall.params).toEqual(bodyMock);
        expect(firstCall.headers).toEqual(headersMock);
        expect(firstCall.statusCode).toEqual(resMock.status);
      });
    });

    it("should log an error if request fails", () => {
      const error = new Error("nope");
      moxios.stubFailure("POST", target, {
        status: 500
      });

      return events.send({ target, data }).then(() => {
        expect(events.calls).toHaveLength(0);
        expect(logger.error).toHaveBeenCalled();
      });
    });
  });

  describe("reset", () => {
    it("should reset calls array", () => {
      moxios.stubOnce("POST", target, {
        headers: headersMock,
        status: 200,
        response: { body: bodyMock }
      });

      return events.send({ target, data }).then(() => {
        expect(events.calls).toHaveLength(1);
        events.reset();
        expect(events.calls).toHaveLength(0);
      });
    });
  });
});
