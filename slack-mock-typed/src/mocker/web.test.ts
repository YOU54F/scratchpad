import { AxiosResponse } from "axios";
import axios from "axios";
import * as qs from "qs";
import * as webClient from "./web";

let mock: webClient.Web<[]>;

function setup() {
  beforeAll(async () => {
    jest.setTimeout(60000);
    mock = await webClient.web;
    await mock.start();
  });

  beforeEach(async () => {
    await mock.reset();
    expect(mock.calls).toHaveLength(0);
  });
}

describe("reset", () => {
  setup();
  let url: string;
  url = "https://slack.com/api/users.list";
  const body = {
    team: "not.real"
  };
  it("should reset call count", () => {
    return axios.post(url, body).then((response: AxiosResponse) => {
      expect(mock.calls).toHaveLength(1);
      mock.reset();
      expect(mock.calls).toHaveLength(0);
    });
  });
});

describe("calls", () => {
  setup();

  it("should intercept POST API calls", () => {
    const url = "https://slack.com/api/users.list?token=abc";
    const body = {
      team: "not.real"
    };
    return axios.post(url, body).then((response: AxiosResponse) => {
      expect(response.status).toEqual(200);
      expect(response.request.path).toEqual("/api/users.list?token=abc");
      expect(response.data).toEqual({ ok: true });
      expect(mock.calls).toHaveLength(1);
      const firstCall = mock.calls[0];
      expect(Object.keys(firstCall)).toEqual(["url", "params", "headers"]);
      expect(firstCall.url).toEqual("https://slack.com/api/users.list");
      expect(firstCall.params).toEqual({
        token: "abc",
        '{"team":"not.real"}': ""
      });
    });
  });

  it("should intercept application/x-www-form-urlencoded calls", () => {
    const url = "https://slack.com/api/users.list?token=abc";
    return axios
      .post(url, qs.stringify({ team: "not.real" }))
      .then((response: AxiosResponse) => {
        expect(response.status).toEqual(200);
        expect(response.request.path).toEqual("/api/users.list?token=abc");
        expect(response.data).toEqual({ ok: true });
        expect(mock.calls).toHaveLength(1);
        const firstCall = mock.calls[0];
        expect(Object.keys(firstCall)).toEqual(["url", "params", "headers"]);
        expect(firstCall.url).toEqual("https://slack.com/api/users.list");
        expect(firstCall.params).toEqual({ token: "abc", team: "not.real" });
      });
  });

  it("should intercept GET API calls", () => {
    const url = "https://slack.com/api/users.list?not=real";
    return axios.get(url).then((response: AxiosResponse) => {
      expect(response.status).toEqual(200);
      expect(response.request.path).toEqual("/api/users.list?not=real");
      expect(response.data).toEqual({ ok: true });
      expect(mock.calls).toHaveLength(1);
      const firstCall = mock.calls[0];
      expect(Object.keys(firstCall)).toEqual(["url", "params", "headers"]);
      expect(firstCall.url).toEqual("https://slack.com/api/users.list");
      expect(firstCall.params).toEqual({ not: "real" });
    });
  });

  it("should intercept POST OAuth authorize calls", () => {
    const url = "https://slack.com/oauth/authorize";

    return axios
      .post(url, { team: "not.real" })
      .then((response: AxiosResponse) => {
        expect(response.status).toEqual(200);
        expect(response.request.path).toEqual("/oauth/authorize");
        expect(response.data).toEqual({ ok: true });
        expect(mock.calls).toHaveLength(1);
        const firstCall = mock.calls[0];
        expect(Object.keys(firstCall)).toEqual(["url", "params", "headers"]);
        expect(firstCall.url).toEqual("https://slack.com/oauth/authorize");
        expect(firstCall.params).toEqual('{"team":"not.real"}');
      });
  });

  it("should intercept GET OAuth authorize calls", () => {
    const url = "https://slack.com/oauth/authorize?team=not.real";

    return axios.get(url).then((response: AxiosResponse) => {
      expect(response.status).toEqual(200);
      expect(response.request.path).toEqual("/oauth/authorize?team=not.real");
      expect(response.data).toEqual({ ok: true });
      expect(mock.calls).toHaveLength(1);
      const firstCall = mock.calls[0];
      expect(Object.keys(firstCall)).toEqual(["url", "params", "headers"]);
      expect(firstCall.url).toEqual("https://slack.com/oauth/authorize");
      expect(firstCall.params).toEqual({ team: "not.real" });
    });
  });
});
