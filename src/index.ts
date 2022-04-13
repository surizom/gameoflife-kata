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

const isInUnderpopulation = (numberOfNeighbours: number): boolean => {
  return numberOfNeighbours < 2;
};

const isInOverpopulation = (numberOfNeighbours: number): boolean => {
  return numberOfNeighbours > 3;
};

export const nextStatus = (numberOfNeighbours: number): "alive" | "dead" => {
  return isInUnderpopulation(numberOfNeighbours) || isInOverpopulation(numberOfNeighbours) ? "dead" : "alive";
};

const shouldStayAlive =
  (grid: Grid) =>
  (cell: AliveCell): boolean => {
    const neighbours = extractNeighbours(cell, grid);

    return nextStatus(neighbours.length) === "alive";
  };

export const computeNextGeneration = (inputCells: Grid): Grid => {
  return inputCells.filter(shouldStayAlive(inputCells));
};
