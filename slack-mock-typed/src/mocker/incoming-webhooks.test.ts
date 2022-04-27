import { AxiosResponse } from "axios";
import axios from "axios";
import * as qs from "qs";
import * as incomingWebhooksClient from "./incoming-webhooks";

let mock: incomingWebhooksClient.IncomingWebhooks<{}>;

function sendToUrl(url: string, body: {}) {
  return axios.post(url, body);
}

function setup() {
  beforeAll(async () => {
    jest.setTimeout(60000);
    mock = await incomingWebhooksClient.incomingWebhooks;
    await mock.start();
  });

  beforeEach(async () => {
    await mock.reset();
    expect(mock.calls).toHaveLength(0);
  });
}

describe("calls", () => {
  setup();
  let url: string;
  url = "https://hooks.slack.com/calls";

  it("should record calls", () => {
    const body = {
      walter: "white"
    };
    const stringifiedBody = JSON.stringify(body);
    return sendToUrl(url, body).then((response: AxiosResponse) => {
      expect(mock.calls).toHaveLength(1);
      const firstCall = mock.calls[0];
      expect(firstCall).toMatchObject({
        headers: {},
        params: stringifiedBody,
        url: "https://hooks.slack.com/calls"
      });
      expect(firstCall.url).toEqual(url);
      expect(firstCall.params).toEqual(stringifiedBody);
      expect(firstCall.headers).toEqual({});
    });
  });

  it("should record a slack json object as application/x-www-form-urlencoded", () => {
    const formBody = qs.stringify({ walter: "white" });

    return sendToUrl(url, formBody).then((response: AxiosResponse) => {
      expect(mock.calls).toHaveLength(1);
      const firstCall = mock.calls[0];
      expect(firstCall.params).toEqual("walter=white");
    });
  });
});

describe("reset", () => {
  setup();
  let url: string;
  url = "https://hooks.slack.com/reset";
  const body = {
    walter: "white"
  };
  it("should reset call count", () => {
    return sendToUrl(url, body).then((response: AxiosResponse) => {
      expect(mock.calls).toHaveLength(1);
      mock.reset();
      expect(mock.calls).toHaveLength(0);
    });
  });
});

describe("addResponse", () => {
  setup();
  let url: string;
  url = "https://hooks.slack.com/addresponse";

  it("should add a custom response", () => {
    const opts = {
      url,
      statusCode: 204,
      body: { not: "ok" },
      headers: { walter: "white" }
    };

    mock.addResponse(opts);

    const body = "body=string";
    return sendToUrl(url, body).then((response: AxiosResponse) => {
      expect(mock.calls).toHaveLength(1);
      const firstCall = mock.calls[0];
      expect(firstCall).toMatchObject({
        headers: {},
        params: body,
        url: "https://hooks.slack.com/addresponse"
      });
      expect(firstCall.url).toEqual(url);
      expect(firstCall.params).toEqual(body);
      expect(firstCall.headers).toEqual({});
      expect(response.data).toEqual(opts.body);
      expect(response.status).toEqual(opts.statusCode);
      expect(Object.values(response.headers)).toContain(opts.headers.walter);
    });
  });
});

describe("params", () => {
  setup();
  let url: string;
  url = "https://hooks.slack.com/params?foo=bar";

  it("should add params", () => {
    const body = "body=string";
    return sendToUrl(url, body).then((response: AxiosResponse) => {
      expect(mock.calls).toHaveLength(1);
      const firstCall = mock.calls[0];
      expect(firstCall).toMatchObject({
        headers: {},
        params: { body: "string", foo: "bar" },
        url: "https://hooks.slack.com/params?foo=bar"
      });
      expect(firstCall.url).toEqual(url);
      expect(firstCall.params).toMatchObject({ foo: "bar" });
      expect(firstCall.headers).toEqual({});
      expect(response.data).toEqual("OK");
      expect(response.status).toEqual(200);
    });
  });
});
