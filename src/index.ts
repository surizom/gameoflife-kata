type AliveCell = Readonly<{
  x: number;
  y: number;
}>;

export type Grid = AliveCell[];

const isSameCell =
  ({ x: x1, y: y1 }: AliveCell) =>
  ({ x: x2, y: y2 }: AliveCell): boolean =>
    x1 === x2 && y1 === y2;

const areNeighbours = ({ x: x1, y: y1 }: AliveCell, { x: x2, y: y2 }: AliveCell): boolean =>
  Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1 && !isSameCell({ x: x1, y: y1 })({ x: x2, y: y2 });

export const allNeighbours = ({ x: xCell, y: yCell }: AliveCell): AliveCell[] =>
  [
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
  ].map(({ x: translationX, y: translationY }) => ({ x: xCell + translationX, y: yCell + translationY }));

const extractAliveNeighbours = (currentCell: AliveCell, grid: Grid): AliveCell[] =>
  grid.filter((cell) => areNeighbours(currentCell, cell));

const isInUnderpopulation = (numberOfNeighbours: number): boolean => {
  return numberOfNeighbours < 2;
};

const isInOverpopulation = (numberOfNeighbours: number): boolean => {
  return numberOfNeighbours > 3;
};

type CellStatus = "alive" | "dead";

export const nextStatus = (numberOfNeighbours: number, currentStatus: CellStatus): "alive" | "dead" => {
  if (currentStatus === "dead") {
    return numberOfNeighbours === 3 ? "alive" : "dead";
  }

  return isInUnderpopulation(numberOfNeighbours) || isInOverpopulation(numberOfNeighbours) ? "dead" : "alive";
};

const shouldStayAlive =
  (grid: Grid) =>
  (cell: AliveCell): boolean => {
    const liveNeighbours = extractAliveNeighbours(cell, grid);

    const deadNeighbours = allNeighbours(cell).filter((cell) => !liveNeighbours.some(isSameCell(cell)));

    return nextStatus(liveNeighbours.length, "alive") === "alive";
  };

export const computeNextGeneration = (inputCells: Grid): Grid => {
  return inputCells.filter(shouldStayAlive(inputCells));
};
