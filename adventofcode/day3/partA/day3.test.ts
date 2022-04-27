import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
import { powerConsumptionAnalyser, instructionParser } from "./day3.ts";

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
describe("advent of code day 3 - part 1", () => {
  describe("example", () => {
    let instructions: string[];
    beforeEach(async () => {
      instructions = await instructionParser(inputExample, false);
    });
    it("should parse instructions", () => {
      expect(instructions[0]).toEqual("00100");
    });

    it("should match the example", () => {
      expect(powerConsumptionAnalyser(instructions)).toEqual({
        gamma: 22,
        epsilon: 9,
        powerConsumption: 198,
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

    it("should work out the final horizontal position", () => {
      expect(powerConsumptionAnalyser(input)).toEqual({
        gamma: 844,
        epsilon: 3251,
        powerConsumption: 2743844,
      });
    });
  });
});

run();
