import {
  beforeAll,
  describe,
  expect,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
import { instructionParser, subMover } from "./day2.ts";

const inputExample = [
  ["forward", "5"],
  ["down", "5"],
  ["forward", "8"],
  ["up", "3"],
  ["down", "8"],
  ["forward", "2"],
];

describe("advent of code day 2 - part 1", () => {
  describe("example", () => {
    it("should match the example", () => {
      expect(subMover(inputExample)).toEqual({
        horizontalPosition: 15,
        depth: 10,
        finalPosition: 150,
      });
    });
  });

  describe("exercise", () => {
    let input: string[][];
    beforeAll(async () => {
      input = await instructionParser("input.txt");
    });
    it("should parse instructions", () => {
      expect(input[0]).toEqual(["forward", "6"]);
    });

    it("should work out the final horizontal position", () => {
      expect(subMover(input)).toEqual({
        horizontalPosition: 1962,
        depth: 987,
        finalPosition: 1936494,
      });
    });
  });
});

describe("advent of code day 2 - part 2", () => {
  describe("example", () => {
    it("should match the example", () => {
      expect(subMover(inputExample, true)).toEqual({
        horizontalPosition: 15,
        depth: 60,
        finalPosition: 900,
        aim: 10,
      });
    });
  });

  describe("exercise", () => {
    let input: string[][];
    beforeAll(async () => {
      input = await instructionParser("input.txt");
    });
    it("should parse instructions", () => {
      expect(input[0]).toEqual(["forward", "6"]);
    });

    it("should work out the final horizontal position", () => {
      expect(subMover(input, true)).toEqual({
        horizontalPosition: 1962,
        depth: 1017893,
        finalPosition: 1997106066,
        aim: 987,
      });
    });
  });
});

run();
