# slack-mock

![npm version](https://img.shields.io/npm/v/slack-mock-typed.svg)
![npm](https://img.shields.io/npm/dm/slack-mock-typed.svg)
[![Build Status](https://travis-ci.org/YOU54F/slack-mock-typed.svg?branch=master)](https://travis-ci.org/YOU54F/slack-mock-typed)
[![Dependency Status](https://img.shields.io/david/you54f/slack-mock-typed.svg?style=flat-square)](https://david-dm.org/you54f/slack-mock-typed)
[![devDependency Status](https://img.shields.io/david/dev/you54f/slack-mock-typed.svg?style=flat-square)](https://david-dm.org/you54f/slack-mock-typed#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/github/YOU54F/slack-mock-typed/badge.svg?branch=master)](https://coveralls.io/github/YOU54F/slack-mock-typed?branch=master)



A Slack API mocker for all your Slack bot and Slack app integration tests.

## Mock All Slack APIs

Slack Mock will mock a way of pushing data into Slack. You can use it to mock calls to
- [Incoming Webhooks](https://api.slack.com/incoming-webhooks)

You can use your API calls as is without changing any URLs or tokens. Slack Mock will capture all outbound HTTP requests to `https://slack.com` and `https://hooks.slack.com`, so Slack will never receive your API calls. 

With Slack-Mock you can inspect all outbound requests and trigger incoming requests to make sure your bot is doing the right thing.

## No Magic Included

OK, there's a little magic included in capturing HTTP requests, but that's it. No timeouts, magic promises, or events. Integration tests are hard, trying to make them easy with "convenience" abstractions that are out of your control only makes them harder.

Integration test by their nature are testing a closed system: you are inspecting from the outside a complex flow between at least two entities (your bot and the Slack API) and there is no guaranteed way to know when that flow is complete by observing from the outside. Any attempt to guess when the communication is complete will be wrong some of the time and just cause you frustration.

That's why Slack Mock provides simple, synchronous methods to queue, trigger, and inspect messages to and from Slack. No magic included.

To write a Slack Mock integration test queue up responses from Slack to your bot, then use Slack Mock to send a message from Slack to your bot to trigger a bot action, wait some time, then assert that your bot made the correct calls to Slack in order. How long do you wait? It depends on what your bot is doing. Play around a little and see what works. I find a 50 millisecond wait is more than enough for most flows. 

## Usage

### Incoming Webhooks

```ts
// incoming webhooks

import * as SlackMock from "slack-mock-typed";
const mock: SlackMock.Instance = SlackMock.SlackMocker({ logLevel: "debug" });

function setup() {
  beforeAll(async () => {
    jest.setTimeout(60000);
    await mock.incomingWebhooks.start();
    await mock.incomingWebhooks.reset();
  });

  beforeEach(async () => {
    jest.resetModules();
    await mock.incomingWebhooks.reset();
    expect(mock.incomingWebhooks.calls).toHaveLength(0);
  });
  afterEach(async () => {
    await mock.incomingWebhooks.reset();
  });
}

function returnMockedSlackWebhookCall() {
  expect(mock.incomingWebhooks.calls).toHaveLength(1);
  const firstCall = mock.incomingWebhooks.calls[0];
  expect(firstCall.url).toEqual(process.env.SLACK_WEBHOOK_URL);
  const body = firstCall.params;
  return body;
}
```

## API Conventions

Slack Mock will intercept all requests to `https://hooks.slack.com`. There's no need to change any URLs in your bot.

Here are the method conventions. Not every API wrapper supports each of these methods, see the [API docs](#api) below:
- `addResponse` will add the next response returned. You can call mutlitple times to queue responses. If you set a `url` option, then the response will only be returned for that url. URL specific responses take precedence over unspecified responses
- `calls` will be in order received and always contain params, headers, and url. Params contain both query params and body properties.
- `reset` will always clear calls and any queued responses you have.

There is also a top level `reset` convenience method that will call reset on each API wrapper.

Slack mock will respond to all requests with a 200 OK unless a custom response has been queued. For web requests, a the default body will be `{ok: true}`.

## API

### `require('slack-mock')`: `function(config)`

The exported function used to start the Slack Mock server. Returns an instance of the server.

Slack Mock is a singleton so can only be configured once per process. Subsequent calls to SlackMocker() will return
the same instance.

Config options are: 
  - `logLevel` (String, optional) The log level to use. One of `error`, `warn`, `info`, `verbose`, `debug`, or `silly`. Defaults to `info`.

---

### `instance`

The configured instance of the Slack Mock `SlackMocker.instance` object. This is the same object returned from `require('slack-mock')(config)`.

---

### `instance.incomingWebhooks` (Incoming Webhooks)

The `incomingWebhooks` object mocks receiving payloads from you Slack App to all Incoming Webhooks at `https://hooks.slack.com/`.

- `addResponse`: `function(opts)` Queues a response payload that Slack Mock will use to respond upon
receiving a post to a registered endpoint. This method can be called multiple times. Responses
will be used in a FIFO order. Options are: 
  - `url` (String, optional) The Incoming Webhook URL your app will be POSTing to.
  - `statusCode` (Number, optional) The HTTP status code to reply with. Defaults to 200. 
  - `body` (Object, optional) The response body to reply with. Defaults to `OK`.
  - `headers` (Object, optional) The HTTP headers to reply with. Defaults to `{}`.

- `reset`: `function()` Empties the `incomingWebhooks.calls` array and clears any queued responses.

- `calls`: `Array` An array of payloads received your from Slack app to an Incoming Webhook url.
  - `url` The url of the call that was intercepted.
  - `params` The POST body merged with any query string parameters captured from the intercepted request as an Object.
  - `headers` The headers of the intercepted request as an Object.


### `instance.reset`: `function()`

Resets all mocks. A convenience method for calling reset on individual API mocks.
