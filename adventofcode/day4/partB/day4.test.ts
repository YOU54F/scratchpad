import {
  beforeEach,
  describe,
  expect,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";

const inputExample = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

describe("advent of code day 4 - part 1", () => {
  describe("example", () => {
    let input: string[];
    let bingoNumbers: string[];
    let boards: string[][][];
    beforeEach(async () => {
      input = await instructionParser(inputExample, false);
      bingoNumbers = input.slice(0, 1)[0].split(",");
      boards = createBoards(input);
    });
    it("should parse the first set of numbers", () => {
      expect(bingoNumbers).toEqual([
        "7",
        "4",
        "9",
        "5",
        "11",
        "17",
        "23",
        "2",
        "0",
        "14",
        "21",
        "24",
        "10",
        "16",
        "13",
        "6",
        "15",
        "25",
        "12",
        "22",
        "18",
        "20",
        "8",
        "19",
        "3",
        "26",
        "1",
      ]);
    });
    it("should create 3 bingo boards", () => {
      expect(boards.length).toEqual(3);
      expect(boards[0][0][0]).toEqual("22");
      expect(boards[2][4][4]).toEqual("7");
    });

    it("should count unmarked boards", () => {
      expect(boards[0][0].length).toEqual(5);
      expect(boards[0][0]).toEqual(["22", "13", "17", "11", "0"]);
      expect(checkRowMarked(boards[0][0])).toEqual(false);
      expect(checkRowsMarked(boards[0])).toEqual(false);
    });

    it("should count winning rows", () => {
      // mark row
      // 1 1 1 1 1
      // 1 1 1 1 1
      // X X X X X
      // 1 1 1 1 1
      // 1 1 1 1 1
      boards[0][3][0] = "X";
      boards[0][3][1] = "X";
      boards[0][3][2] = "X";
      boards[0][3][3] = "X";
      boards[0][3][4] = "X";
      expect(checkRowMarked(boards[0][3])).toEqual(true);
      expect(checkRowsMarked(boards[0])).toEqual(true);
    });

    it("should count winning columns", () => {
      // mark column
      // 1 1 1 1 X
      // 1 1 1 1 X
      // 1 1 1 1 X
      // 1 1 1 1 X
      // 1 1 1 1 X
      boards[0][0][4] = "X";
      boards[0][1][4] = "X";
      boards[0][2][4] = "X";
      boards[0][3][4] = "X";
      boards[0][4][4] = "X";

      expect(checkRowsMarked(boards[0])).toEqual(false);
      expect(checkColumnsMarked(boards[0])).toEqual(true);
    });

    it("should find a winner across multiple boards", () => {
      // mark column on 3rd board
      // 1 1 1 1 X
      // 1 1 1 1 X
      // 1 1 1 1 X
      // 1 1 1 1 X
      // 1 1 1 1 X
      boards[2][0][4] = "X";
      boards[2][1][4] = "X";
      boards[2][2][4] = "X";
      boards[2][3][4] = "X";
      boards[2][4][4] = "X";

      expect(findWinningBoard(boards)).toEqual(2);
    });

    it("should mark a single board when a number is", () => {
      const firstNumber = bingoNumbers.splice(0, 1)[0];
      const secondNumber = bingoNumbers.splice(0, 1)[0];

      expect(firstNumber).toEqual("7");
      expect(secondNumber).toEqual("4");

      expect(boards[0][2][4]).toEqual("7");
      expect(boards[1][2][2]).toEqual("7");
      expect(boards[2][4][4]).toEqual("7");

      markBoards(firstNumber, boards);
      expect(boards[0][2][4]).toEqual("X");
      expect(boards[1][2][2]).toEqual("X");
      expect(boards[2][4][4]).toEqual("X");

      expect(boards[0][1][3]).toEqual("4");
      expect(boards[1][3][4]).toEqual("4");
      expect(boards[2][0][4]).toEqual("4");

      markBoards(secondNumber, boards);
      expect(boards[0][1][3]).toEqual("X");
      expect(boards[1][3][4]).toEqual("X");
      expect(boards[2][0][4]).toEqual("X");
    });

    it.only("should run the bingo and find the last winner", () => {
      const results = {
        winner: 2,
        lastCalledNumber: "13",
        score: 1924,
      };
      expect(runBingo(bingoNumbers, boards)).toEqual(results);
    });
  });

  describe("exercise", () => {
    let input: string[];
    let bingoNumbers: string[];
    let boards: string[][][];
    beforeEach(async () => {
      input = await instructionParser("input.txt", true);
      bingoNumbers = input.slice(0, 1)[0].split(",");
      boards = createBoards(input);
    });

    it("should run the bingo and find a winner", () => {
      const results = { winner: 18, lastCalledNumber: "7", score: 4662 };
      expect(runBingo(bingoNumbers, boards)).toEqual(results);
    });
  });
});

run();

const instructionParser = async (
  input: string,
  readFromFile: boolean
): Promise<string[]> => {
  let inputData: string;
  readFromFile
    ? (inputData = await Deno.readTextFile(input))
    : (inputData = input);

  const splitInput = inputData.split("\n").filter(Boolean);
  return splitInput;
};
const createBoard = (arr: string[]) => {
  const board: string[][] = new Array(5);
  for (let i = 0; i < board.length; i++) {
    board[i] = arr[i]
      .replace(/\s\s/g, ",")
      .replace(/\s/g, ",")
      .split(",")
      .filter((x) => Boolean(x));
  }
  return board;
};
const createBoards = (arr: string[]) => {
  const boardInput = arr.slice(1); // remove bingo numbers
  const boards: string[][][] = [];
  let boardCounter = 0;
  for (let index = 0; index < boardInput.length / 5; index++) {
    boards.push(createBoard(boardInput.slice(boardCounter, boardCounter + 5)));
    boardCounter += 5;
  }
  return boards;
};

const markBoard = (bingoNumber: string, board: string[][]) =>
  board.map((v) => markMatchingCells(bingoNumber, v));

const markBoards = (bingoNumber: string, boards: string[][][]) =>
  boards.map((board) => markBoard(bingoNumber, board));

const markMatchingCells = (matcher: string, arr: string[]) =>
  arr.filter((cell, i) => (cell === matcher ? (arr[i] = "X") : cell));

const checkRowMarked = (arr: string[]) =>
  arr.filter((cell) => cell === "X").length === 5;

const checkRowsMarked = (arr: string[][]) =>
  arr.map((v) => checkRowMarked(v)).filter(Boolean)[0] === true;

const checkColumnsMarked = (arr: string[][]) => {
  return (
    arr
      .map((_v, i) => checkRowMarked(arr.map((v) => v[i])) === true)
      .filter(Boolean)[0] === true
  );
};

const findWinningBoard = (boards: string[][][]) =>
  boards
    .map((board) => {
      if (checkRowsMarked(board)) {
        return true;
      }
      if (checkColumnsMarked(board)) {
        return true;
      }
    })
    .findIndex((v) => Boolean(v));

const lastWinningBoard = (boards: string[][][]) => {
  let results = new Array(boards.length).fill(false);
  let lastWinner: number | undefined = undefined;

  boards.every((board, i) => {
    if (checkRowsMarked(board)) {
      results[i] = true;

      if (results.every((value) => value === true)) {
        lastWinner = i;
        return false;
      }
      return true;
    }
    if (checkColumnsMarked(board)) {
      results[i] = true;

      if (results.every((value) => value === true)) {
        lastWinner = i;
        return false;
      }
      return true;
    }
    return true;
  });
  return lastWinner;
};

const runBingo = (bingoNumbers: string[], boards: string[][][]) => {
  const results: {
    winner: number | undefined;
    lastCalledNumber: string | undefined;
    score: number | undefined;
  }[] = [];
  const winningBoards: number[] = [];
  bingoNumbers.map((bingoNumber) => {
    // console.log(winningBoards);
    console.log();
    markBoards(
      bingoNumber,
      boards.filter((v, i, a) => !(winningBoards.indexOf(i) > -1))
    );
    const winningBoard = findWinningBoard(boards);
    if (winningBoard && winningBoard !== -1) {
      winningBoards.push(winningBoard);
      results.push({
        winner: winningBoard,
        lastCalledNumber: bingoNumber,
        score: calculateScore(bingoNumber, boards[winningBoard]),
      });
    }
  });
  return results;
};

const calculateScore = (multiplier: string, board: string[][]) => {
  let totaliser = 0;
  board.map((r) =>
    r.map((cell) => (cell !== "X" ? (totaliser += Number(cell)) : "0"))
  );
  const score = Number(multiplier) * totaliser;
  return score;
};
