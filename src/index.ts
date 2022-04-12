type AliveCell = Readonly<{
  x: number;
  y: number;
}>;

export type Grid = AliveCell[];

const isSameCell = ({ x: x1, y: y1 }: AliveCell, { x: x2, y: y2 }: AliveCell): boolean => x1 === x2 && y1 === y2;

const areNeighbours = ({ x: x1, y: y1 }: AliveCell, { x: x2, y: y2 }: AliveCell): boolean =>
  Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1 && !isSameCell({ x: x1, y: y1 }, { x: x2, y: y2 });

const extractNeighbours = (currentCell: AliveCell, grid: Grid): AliveCell[] =>
  grid.filter((cell) => areNeighbours(currentCell, cell));

const isInUnderpopulation = (neighbours: AliveCell[]): boolean => {
  return neighbours.length <= 2;
};

const isInOverpopulation = (neighbours: AliveCell[]): boolean => {
  return neighbours.length > 3;
};

const shouldStayAlive =
  (grid: Grid) =>
  (cell: AliveCell): boolean => {
    const neighbours = extractNeighbours(cell, grid);

    return !isInUnderpopulation(neighbours) && !isInOverpopulation(neighbours);
  };

export const computeNextGeneration = (inputCells: Grid): Grid => {
  return inputCells.filter(shouldStayAlive(inputCells));
};
