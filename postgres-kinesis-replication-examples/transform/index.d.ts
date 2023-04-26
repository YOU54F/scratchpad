/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R, T> {
    toMatchJSON(value: any): R;
  }
}
