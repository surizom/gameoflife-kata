// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
expect.extend(matchers);

import { computeNextGeneration, Grid } from "./index";
describe("Game of life", () => {
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

    expect(computeNextGeneration(initialGrid)).toEqual(initialGrid);
  });

  it(`Should remove cells that are in underpopulation
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
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ];

    expect(computeNextGeneration(initialGrid)).toEqual(survivingCells);
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

    expect(computeNextGeneration(initialGrid)).toEqual(survivingCells);
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

    expect(computeNextGeneration(initialGrid)).toEqual(survivingCells);
  });
});
