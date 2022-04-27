import {
  beforeAll,
  describe,
  expect,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
import { depthMeasurer, slidingWindowMeasurer } from "./day1.ts";

const inputExample = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

describe("advent of code day 1 - part 1", () => {
  let depths: number[];
  beforeAll(async () => {
    const input = await Deno.readTextFile("depths.txt");
    const splitInput = input.split("\n");
    depths = splitInput.map(Number);
  });
  describe("example", () => {
    it("should count the number of times a depth measurement increases", () => {
      expect(depthMeasurer(inputExample)).toBe(7);
    });
  });

  describe("exercise", () => {
    it("should count the number of times a depth measurement increases", () => {
      expect(depthMeasurer(depths)).toBe(1832);
    });
  });
});

describe("advent of code day 1 - part 2", () => {
  let depths: number[];
  beforeAll(async () => {
    const input = await Deno.readTextFile("depths.txt");
    const splitInput = input.split("\n");
    depths = splitInput.map(Number);
  });
  describe("example", () => {
    it("should count the number of times a depth measurement increases", () => {
      expect(slidingWindowMeasurer(inputExample)).toBe(5);
    });
  });

  describe("exercise", () => {
    it("should count the number of times a window measurement increases", () => {
      expect(slidingWindowMeasurer(depths)).toBe(1858);
    });
  });
});

run();
