interface SubData {
  horizontalPosition: number;
  depth: number;
  finalPosition: number;
  aim?: number;
}
/**
 * Sub Mover.
 *
 * Default behaviour
 *
 * forward X increases the horizontal position by X units.
 * down X increases the depth by X units.
 * up X decreases the depth by X units.
 *
 * If aim === true
 *
 * down X increases your aim by X units.
 * up X decreases your aim by X units.
 * forward X does two things:
 *  It increases your horizontal position by X units.
 *  It increases your depth by your aim multiplied by X.
 * @param {string[][]} a an array of instruction string arrays [["forward","X"], ["down","X"]]
 * @param {boolean} aim Use aim to calculate depth movements
 * @returns {SubData} Calculating final positions
 */
export const subMover = (a: string[][], aim?: boolean) => {
  // If aim is disabled then

  // forward X increases the horizontal position by X units.
  // down X increases the depth by X units.
  // up X decreases the depth by X units.

  // If aim is enabled then

  const data: SubData = {
    horizontalPosition: 0,
    depth: 0,
    finalPosition: 0,
  };
  if (aim) {
    data.aim = 0;
  }
  for (let i = 0; i < a.length; i++) {
    switch (a[i][0]) {
      case "forward":
        {
          data.horizontalPosition += Number(a[i][1]);
          if (aim) {
            data.depth += data.aim! * Number(a[i][1]);
          }
        }
        break;
      case "down":
        {
          aim
            ? (data.aim! += Number(a[i][1]))
            : (data.depth += Number(a[i][1]));
        }
        break;
      case "up":
        {
          aim
            ? (data.aim! -= Number(a[i][1]))
            : (data.depth -= Number(a[i][1]));
        }
        break;

      default:
        break;
    }
  }
  data.finalPosition = data.horizontalPosition * data.depth;
  return data;
};

export const instructionParser = async (file: string): Promise<string[][]> => {
  const input = await Deno.readTextFile(file);
  const splitInput = input.split("\n");
  const instructions = splitInput.map((x) => x.split(" "));
  return instructions;
};
