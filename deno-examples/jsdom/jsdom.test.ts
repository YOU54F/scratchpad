// https://github.com/denoland/deno/issues/3447#issuecomment-635597799
// https://github.com/testing-library/react-testing-library/issues/669

import { assertEquals } from "https://deno.land/std@0.92.0/testing/asserts.ts";

import jsdom from "https://dev.jspm.io/jsdom";
const { JSDOM } = jsdom as any;

let dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

Deno.test("hello world #1", () => {
  const expectedText = "Hello world";
  const domContent = dom.window.document.querySelector("p").textContent;
  assertEquals(domContent, expectedText);
});

Deno.test("hello world #2", () => {
  const expectedText = "Hello modified dom";
  dom = new JSDOM(`<!DOCTYPE html><p>${expectedText}</p>`);
  const domContent = dom.window.document.querySelector("p").textContent;
  assertEquals(domContent, expectedText);
});
