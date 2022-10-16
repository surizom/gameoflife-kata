// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
expect.extend(matchers);

import { allNeighbours, computeNextGeneration, Grid, nextStatus } from "./index";

describe("Game of life", () => {
  describe("Acceptance tests", () => {
    it(`Should generate exact same generation as input when all of cells are in continuation
      Case: square of 4 cells that all have 2 neighbours
       oo
       oo
  `, function () {
      const initialGrid: Grid = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
      ];

      expect(computeNextGeneration(initialGrid)).toIncludeSameMembers(initialGrid);
    });

    it.skip(`Should remove cells that are in underpopulation
    and create cells that should re-live
  Case: rectangle of 4 cells and one isolated neighbourless cell
   oo
   oo o
`, function () {
      const initialGrid: Grid = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 3, y: 0 },
      ];

      const survivingCells: Grid = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
      ];

      expect(computeNextGeneration(initialGrid)).toIncludeSameMembers(survivingCells);
    });

    it(`Should remove cells that are in underpopulation
  Case: rectangle of 4 cells and two cells together
   oo
   oo oo
`, function () {
      const initialGrid: Grid = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
      ];

      const survivingCells: Grid = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
      ];

      expect(computeNextGeneration(initialGrid)).toIncludeSameMembers(survivingCells);
    });

    it(`Should remove cells that are in underpopulation
  Case: three aligned cells, the one in the middle has to live (2 neighbours)
  but the other two must die
   oo
`, function () {
      const initialGrid: Grid = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ];

      const survivingCells: Grid = [{ x: 1, y: 0 }];

      expect(computeNextGeneration(initialGrid)).toIncludeSameMembers(survivingCells);
    });

    it(`Should remove cells that are in overpopulation
  Case: rectangle of 6 cells packed together: the two middle cells should DIE
   ooo     =>  o o
   ooo     =>  o o
`, function () {
      const initialGrid: Grid = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
      ];

      const survivingCells: Grid = [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
      ];

      expect(computeNextGeneration(initialGrid)).toIncludeSameMembers(survivingCells);
    });
  });

  describe("Unit tests", () => {
    g;
    describe("next status of previously alive cells", () => {
      it("Less than two neighbours: should die of underpopulation - case 0 neighbours", () => {
        expect(nextStatus(0, "alive")).toEqual("dead");
      });

      it("Less than two neighbours: should die of underpopulation - case 1 neighbour", () => {
        expect(nextStatus(1, "alive")).toEqual("dead");
      });

      it("Two or three neighours: should continue living", () => {
        expect(nextStatus(2, "alive")).toEqual("alive");
      });

      it("Two or three neighours: should continue living", () => {
        expect(nextStatus(3, "alive")).toEqual("alive");
      });

      it("Two or three neighours: should die of over", () => {
        expect(nextStatus(4, "alive")).toEqual("dead");
      });
      it("Two or three neighours: should continue living", () => {
        expect(nextStatus(5, "alive")).toEqual("dead");
      });

      it("Two or three neighours: should continue living", () => {
        expect(nextStatus(6, "alive")).toEqual("dead");
      });
    });

    describe("next status of previously dead cells", () => {
      it("Any dead cell with not exactly three live neighbours stays dead", () => {
        expect(nextStatus(2, "dead")).toEqual("dead");
      });

      it("Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction", () => {
        expect(nextStatus(3, "dead")).toEqual("alive");
      });

      it("Control - Any dead cell with not exactly three live neighbours stays dead, as if by reproduction - case 2", () => {
        expect(nextStatus(4, "dead")).toEqual("dead");
      });
    });

    describe("generating test of all neighbours of a cell", () => {
      it("Generates list of all 8 neighbours of a given cell", () => {
        const topRight = { x: 9, y: 11 };
        const topCenter = { x: 8, y: 11 };
        const topLeft = { x: 7, y: 11 };

        const mediumRight = { x: 9, y: 10 };
        const mediumLeft = { x: 7, y: 10 };

        const bottomRight = { x: 9, y: 9 };
        const bottomCenter = { x: 8, y: 9 };
        const bottomLeft = { x: 7, y: 9 };

        expect(allNeighbours({ x: 8, y: 10 })).toIncludeSameMembers([
          topRight,
          topCenter,
          topLeft,
          mediumRight,
          mediumLeft,
          bottomRight,
          bottomCenter,
          bottomLeft,
        ]);
      });
    });
  });
});
