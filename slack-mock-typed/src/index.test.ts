import { Instance, SlackMocker } from "./index";

jest.mock("./index", () => {
  return {
    SlackMocker: jest.fn().mockImplementation(() => {
      return {
        events: {
          send: jest.fn(),
          reset: jest.fn(),
          calls: []
        },
        incomingWebhooks: {
          addResponse: jest.fn(),
          reset: jest.fn(),
          calls: [],
          start: jest.fn()
        },
        web: {
          addResponse: jest.fn(),
          reset: jest.fn(),
          calls: [],
          start: jest.fn()
        },
        reset() {
          this.events.reset();
          this.incomingWebhooks.reset();
        }
      };
    })
  };
});

describe("slack-mock", () => {
  describe("api", () => {
    let mockInstance: Instance;
    let realInstance: Instance;

    beforeEach(() => {
      mockInstance = SlackMocker({ logLevel: "debug" });
      const { SlackMocker: RealSlackMocker } = jest.requireActual("./index");
      realInstance = new RealSlackMocker({ logLevel: "debug" });
    });

    it("mocks all api families", () => {
      const apiFamilies = (clientInstance: Instance | Instance) =>
        Object.keys(clientInstance);
      const expectedApiFamilies = apiFamilies(realInstance);
      const actualApiFamilies = apiFamilies(mockInstance);
      expect(actualApiFamilies).toEqual(expectedApiFamilies);
    });

    it("should expose events api", () => {
      const apiFamilies = (clientInstance: Instance | Instance) =>
        Object.keys(clientInstance.events);
      const expectedApiFamilies = apiFamilies(realInstance);
      const actualApiFamilies = apiFamilies(mockInstance);
      // [ 'send', 'reset', 'calls' ]
      expect(actualApiFamilies).toEqual(expectedApiFamilies);
    });

    it("should expose incoming webhooks api", () => {
      const apiFamilies = (clientInstance: Instance | Instance) =>
        Object.keys(clientInstance.incomingWebhooks);
      const expectedApiFamilies = apiFamilies(realInstance);
      const actualApiFamilies = apiFamilies(mockInstance);
      // [ 'addResponse', 'reset', 'calls', 'start' ]
      expect(actualApiFamilies).toEqual(expectedApiFamilies);
    });

    it("should expose web api", () => {
      const apiFamilies = (clientInstance: Instance | Instance) =>
        Object.keys(clientInstance.web);
      const expectedApiFamilies = apiFamilies(realInstance);
      const actualApiFamilies = apiFamilies(mockInstance);
      // [ 'addResponse', 'reset', 'calls' ]
      expect(actualApiFamilies).toEqual(expectedApiFamilies);
    });

    it("should expose a reset method", () => {
      mockInstance.reset();
      expect(mockInstance.events.reset).toHaveBeenCalled();
      expect(mockInstance.incomingWebhooks.reset).toHaveBeenCalled();
    });
  });
});
