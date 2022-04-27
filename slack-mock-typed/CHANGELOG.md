# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.4.0](https://github.com/you54f/slack-mock-typed/compare/v2.2.4...v2.4.0) (2020-04-21)


### Features

* add events and web api ([#230](https://github.com/you54f/slack-mock-typed/issues/230)) ([2eb2cea](https://github.com/you54f/slack-mock-typed/commit/2eb2cea58d1af74c39072284a324e4f9909d6b52))

## [2.3.0](https://github.com/you54f/slack-mock-typed/compare/v2.2.4...v2.3.0) (2020-04-21)


### Features

* add events and web api ([f6cae46](https://github.com/you54f/slack-mock-typed/commit/f6cae46d855783ac0919eaba255d6a575cbe241e))

### [2.2.4](https://github.com/you54f/slack-mock-typed/compare/v2.2.3...v2.2.4) (2020-02-12)



### [2.2.3](https://github.com/you54f/slack-mock-typed/compare/v2.2.2...v2.2.3) (2020-02-12)



### [2.2.2](https://github.com/you54f/slack-mock-typed/compare/v2.2.1...v2.2.2) (2019-10-17)



### [2.2.1](https://github.com/you54f/slack-mock-typed/compare/v2.2.0...v2.2.1) (2019-08-07)



## [2.2.0](https://github.com/you54f/slack-mock-typed/compare/v1.1.1...v2.2.0) (2019-07-08)


### Features

* add shutdown method to incoming webhooks ([bab4e30](https://github.com/you54f/slack-mock-typed/commit/bab4e30))
* add shutdown method to incoming webhooks ([9a4b66b](https://github.com/you54f/slack-mock-typed/commit/9a4b66b))



### [2.1.2](https://github.com/you54f/slack-mock-typed/compare/v2.1.1...v2.1.2) (2019-06-03)



### [2.1.1](https://github.com/you54f/slack-mock-typed/compare/v2.1.0...v2.1.1) (2019-06-03)



## [2.1.0](https://github.com/you54f/slack-mock-typed/compare/v1.1.1...v2.1.0) (2019-06-03)


### Build System

* automated release pipeline ([4851fa3](https://github.com/you54f/slack-mock-typed/commit/4851fa3))


### Features

* add shutdown method to incoming webhooks ([bab4e30](https://github.com/you54f/slack-mock-typed/commit/bab4e30))
* add shutdown method to incoming webhooks ([9a4b66b](https://github.com/you54f/slack-mock-typed/commit/9a4b66b))



### 1.2.7 (2019-05-03)



## [2.0.0](https://github.com/you54f/slack-mock-typed/)

- Rewrite of Webhook implementation in typescript.


### Fixed

## [1.1.1](https://github.com/Skellington-Closet/slack-mock/compare/v1.1.0...v1.1.1)

- Closes the express server when the RTM websocket server is closed. Thanks for the PR [finferflu](https://github.com/finferflu)!

## [1.1.0](https://github.com/Skellington-Closet/slack-mock/compare/v1.0.2...v1.1.0)

### Changed

- Starts RTM server on a web API request to `rtm.connect`. Thanks for the PR [Lowry99](https://github.com/Lowry99)!

## [1.0.2](https://github.com/Skellington-Closet/slack-mock/compare/v1.0.1...v1.0.2)

### Changed

- Fixed wrong parameter name in README web API examples. Thanks for the PR [bmajz](https://github.com/bmajz)!

## [1.0.1](https://github.com/Skellington-Closet/slack-mock/compare/v1.0.0...v1.0.1)

### Added

- `params` property in the Events API recorded response. This was incorrectly stored as `body`.
`body` will continue to work for the Events API calls, though will be deprecated and removed in a future major release.

### Changed

- Fixed incorrect docs for the Events API
- Fixed incorrect docs and README example for the RTM API.

## [1.0.0](https://github.com/Skellington-Closet/slack-mock/tree/v1.0.0)

### Added

- Every initial feature for all your mocking needs! 
