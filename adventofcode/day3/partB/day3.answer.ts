import { instructionParser } from "./day3.ts";

type Bit = 0 | 1;
type BitExtended = 0 | 1 | "both";
enum RatingType {
  "o" = "o",
  "co2" = "co2",
}

const getBitsInLine = (line: string): Bit[] =>
  line.split("").map((bit) => parseInt(bit, 10) as Bit);

const sumBits = (acc: Bit[], curr: Bit[]): any[] =>
  acc.map((bit, index) => curr[index] + bit);

const calculateCommonBit = (input: string[]): number[] => {
  return input.map((line) => getBitsInLine(line)).reduce(sumBits);
};

const getGamaFromBits = (gamaSums: number[], len: number): Bit[] =>
  gamaSums.map((bit) => Math.round(bit / len) as Bit);

const getExtendedGamma = (gamaSums: number[], len: number): BitExtended[] =>
  gamaSums.map((bit) =>
    Math.round(bit / len) === 0.5 ? "both" : (Math.round(bit / len) as Bit)
  );

const flipBits = (bits: Bit[]): Bit[] => bits.map((bit) => (bit ? 0 : 1));

const bitsToDecimal = (bits: Bit[]): number => parseInt(bits.join(""), 2);

const part1 = (input: string[]): number => {
  const gamaSums = calculateCommonBit(input);
  const gamma = getGamaFromBits(gamaSums, input.length);
  const epsilon = flipBits(gamma);
  return bitsToDecimal(gamma) * bitsToDecimal(epsilon);
};

const getOxRating = (
  line: Bit[],
  extendedGamma: BitExtended[],
  pos = 0
): boolean =>
  line[pos] === extendedGamma[pos] ||
  (extendedGamma[pos] === "both" && line[pos] === 1);

const getCo2Rating = (
  line: Bit[],
  extendedGamma: BitExtended[],
  pos = 0
): boolean =>
  line[pos] === extendedGamma[pos] ||
  (extendedGamma[pos] === "both" && line[pos] === 0);

const flipExtended = (extendedGamma: BitExtended[]): BitExtended[] =>
  extendedGamma.map((bit) => (bit === 1 ? 0 : bit === 0 ? 1 : "both"));

const getRating = (
  input: string[],
  ratingType: RatingType,
  pos = 0
): string => {
  const len = input.length;
  const gammaSums = calculateCommonBit(input);
  const extendedGamma = getExtendedGamma(gammaSums, len);
  const flipped = flipExtended(extendedGamma);
  let filtered;
  if (ratingType === RatingType.o) {
    filtered = input.filter((line) =>
      getOxRating(getBitsInLine(line), extendedGamma, pos)
    );
  } else {
    filtered = input.filter((line) =>
      getCo2Rating(getBitsInLine(line), flipped, pos)
    );
  }

  if (filtered.length === 1) {
    return filtered[0];
  } else {
    return getRating(filtered, ratingType, pos + 1);
  }
};

const part2 = (input: string[]): number => {
  const oxygenRatingBits = getRating(input, RatingType.o);
  const co2RatingBits = getRating(input, RatingType.co2);
  const oxygenRating = parseInt(oxygenRatingBits, 2);
  const co2Rating = parseInt(co2RatingBits, 2);
  console.log("oxygenRating", oxygenRating);
  console.log("co2Rating", co2Rating);
  return oxygenRating * co2Rating;
};

const input = `00100
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
01010`.split("\n");

console.log(part1(input));
console.log(part2(input));

const input222 = await instructionParser("input.txt", true);
console.log(part2(input222));
// Answer 6677951
