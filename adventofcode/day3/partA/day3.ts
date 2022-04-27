interface DiagnosticReport {
  gamma: number;
  epsilon: number;
  powerConsumption: number;
}

/**
 * powerConsumptionAnalyser
 *
 * @param {string[]} a
 * @returns {DiagnosticReport}
 */
export const powerConsumptionAnalyser = (a: string[]) => {
  const diagnosticReport: DiagnosticReport = {
    gamma: 0,
    epsilon: 0,
    powerConsumption: 0,
  };

  const columns = Array.from(Array(a[0].length).fill(0));
  a.map((v) => {
    v.split("").map((val, ind) => (columns[ind] += val));
  });
  const bitCounter = Array.from(Array(columns.length).fill(0));

  columns.filter(Boolean).map((column, index) => {
    column.split("").map((row: string[]) => {
      bitCounter[index] += Number(row);
    });
  });

  const totalBits = columns[0].length - 1;
  // detect gamma rays
  // calculate total size of bits
  // [ 7, 5, 8, 7, 5 ]
  // should return
  // 10110

  const gammaBinary = bitCounter
    .map((bits) => (bits > totalBits / 2 ? 1 : 0))
    .toString()
    .replace(/,/g, "");
  diagnosticReport.gamma = parseInt(gammaBinary, 2);
  const epsilonBinary = bitCounter
    .map((bits) => (bits < totalBits / 2 ? 1 : 0))
    .toString()
    .replace(/,/g, "");
  diagnosticReport.epsilon = parseInt(epsilonBinary, 2);
  diagnosticReport.powerConsumption =
    diagnosticReport.epsilon * diagnosticReport.gamma;

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
