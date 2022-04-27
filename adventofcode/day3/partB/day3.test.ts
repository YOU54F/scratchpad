import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
import { lifeSupportAnalyser, instructionParser } from "./day3.ts";

const inputExample = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

describe("advent of code day 3 - part 2", () => {
  describe("example", () => {
    let instructions: string[];
    beforeEach(async () => {
      instructions = await instructionParser(inputExample, false);
    });
    it("should parse instructions", () => {
      expect(instructions[0]).toEqual("00100");
    });

    it("should match the example", () => {
      expect(lifeSupportAnalyser(instructions)).toEqual({
        lifeSupportRating: 230,
        oxygenGeneratorRating: 23,
        co2ScrubberRating: 10,
      });
    });
  });

  describe("exercise", () => {
    let input: string[];
    beforeAll(async () => {
      input = await instructionParser("input.txt", true);
    });
    it("should parse instructions", () => {
      expect(input[0]).toEqual("011111101011");
    });

    it("should work out the life support rating", () => {
      expect(lifeSupportAnalyser(input)).toEqual({
        lifeSupportRating: 6677951,
        oxygenGeneratorRating: 1981,
        co2ScrubberRating: 3371,
      });
    });
  });
});

run();
