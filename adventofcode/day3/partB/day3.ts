interface DiagnosticReport {
  lifeSupportRating: number;
  oxygenGeneratorRating: number;
  co2ScrubberRating: number;
}

/**
 * lifeSupportAnalyser
 *
 * @param {string[]} a
 * @returns {DiagnosticReport}
 */
export const lifeSupportAnalyser = (a: string[]): DiagnosticReport => {
  const diagnosticReport: DiagnosticReport = {
    lifeSupportRating: 0,
    oxygenGeneratorRating: 0,
    co2ScrubberRating: 0,
  };

  const arrSum = (arr: string[]) =>
    arr.reduce((a, b) => a + parseFloat(b), 0).toString();

  const arrFilter = (arr: string[], index: number, positiveBit: boolean) =>
    arr.filter((a) => a.split("")[index] === (positiveBit ? "1" : "0"));

  const calculateOxygenGeneratorRating = (a: string[]) => {
    let result = [];
    let index = 0;
    result = a;
    do {
      result = arrFilter(
        result,
        index,
        2 * Math.floor(Number(arrSum(result)[index])) >= result.length
      );
      index++;
    } while (result.length !== 1);
    return parseInt(result[0], 2);
  };

  const calculateCo2ScrubberRating = (a: string[]) => {
    let result = [];
    let index = 0;
    result = a;
    do {
      result = arrFilter(
        result,
        index,
        2 * Math.floor(Number(arrSum(a)[index])) <= a.length
      );
      index++;
    } while (result.length !== 1);
    return parseInt(result[0], 2);
  };

  diagnosticReport.oxygenGeneratorRating = calculateOxygenGeneratorRating(a);
  diagnosticReport.co2ScrubberRating = calculateCo2ScrubberRating(a);

  diagnosticReport.lifeSupportRating =
    diagnosticReport.oxygenGeneratorRating * diagnosticReport.co2ScrubberRating;

  console.log(diagnosticReport);
  return diagnosticReport;
};

/**
 * instructionParser
 *
 * @param {string} input path to file or string input split by new line
 * @param {readFromFile} boolean
 * @returns {string[]}
 */
export const instructionParser = async (
  input: string,
  readFromFile: boolean
): Promise<string[]> => {
  let inputData: string;
  readFromFile
    ? (inputData = await Deno.readTextFile(input))
    : (inputData = input);

  const splitInput = inputData.split("\n");
  return splitInput;
};
