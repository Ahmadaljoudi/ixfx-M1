import { A as Arc, B as Bezier } from './Bezier-91f2c5bc';
import { C as Circle } from './Circle-7a98104c';
import { P as Path, a as Point, R as RectPositioned, L as Line, b as Rect, c as Point$1, d as Path$1 } from './Rect-32759dac';
import { S as SetMutable } from './Interfaces-6ffafac5';

declare type CompoundPath = Path & {
    readonly segments: readonly Path[];
    readonly kind: `compound`;
};
/**
 * Returns a new compoundpath, replacing a path at a given index
 *
 * @param {CompoundPath} compoundPath Existing compoundpath
 * @param {number} index Index to replace at
 * @param {Paths.Path} path Path to substitute in
 * @returns {CompoundPath} New compoundpath
 */
declare const setSegment: (compoundPath: CompoundPath, index: number, path: Path) => CompoundPath;
/**
 * Computes x,y point at a relative position along compoundpath
 *
 * @param {Paths.Path[]} paths Combined paths (assumes contiguous)
 * @param {number} t Position (given as a percentage from 0 to 1)
 * @param {boolean} [useWidth] If true, widths are used for calulcating. If false, lengths are used
 * @param {Dimensions} [dimensions] Precalculated dimensions of paths, will be computed if omitted
 * @returns
 */
declare const interpolate: (paths: readonly Path[], t: number, useWidth?: boolean | undefined, dimensions?: Dimensions | undefined) => Point;
declare type Dimensions = {
    /**
     * Width of each path (based on bounding box)
     *
     * @type {number[]}
     */
    readonly widths: readonly number[];
    /**
     * Length of each path
     *
     * @type {number[]}
     */
    readonly lengths: readonly number[];
    /**
     * Total length of all paths
     *
     * @type {number}
     */
    readonly totalLength: number;
    /**
     * Total width of all paths
     *
     * @type {number}
     */
    readonly totalWidth: number;
};
/**
 * Computes the widths and lengths of all paths, adding them up as well
 *
 * @param {Paths.Path[]} paths
 * @returns {Dimensions}
 */
declare const computeDimensions: (paths: readonly Path[]) => Dimensions;
/**
 * Computes the bounding box that encloses entire compoundpath
 *
 * @param {Paths.Path[]} paths
 *
 * @returns {Rects.Rect}
 */
declare const bbox: (paths: readonly Path[]) => RectPositioned;
/**
 * Produce a human-friendly representation of paths
 *
 * @param {Paths.Path[]} paths
 * @returns {string}
 */
declare const toString: (paths: readonly Path[]) => string;
/**
 * Throws an error if paths are not connected together, in order
 *
 * @param {Paths.Path[]} paths
 */
declare const guardContinuous: (paths: readonly Path[]) => void;
declare const toSvgString: (paths: readonly Path[]) => readonly string[];
/**
 * Create a compoundpath from an array of paths.
 * All this does is verify they are connected, and precomputes dimensions
 *
 * @param {...Paths.Path[]} paths
 * @returns {CompoundPath}
 */
declare const fromPaths: (...paths: readonly Path[]) => CompoundPath;

type CompoundPath$1_CompoundPath = CompoundPath;
declare const CompoundPath$1_setSegment: typeof setSegment;
declare const CompoundPath$1_interpolate: typeof interpolate;
declare const CompoundPath$1_computeDimensions: typeof computeDimensions;
declare const CompoundPath$1_bbox: typeof bbox;
declare const CompoundPath$1_toString: typeof toString;
declare const CompoundPath$1_guardContinuous: typeof guardContinuous;
declare const CompoundPath$1_toSvgString: typeof toSvgString;
declare const CompoundPath$1_fromPaths: typeof fromPaths;
declare namespace CompoundPath$1 {
  export {
    CompoundPath$1_CompoundPath as CompoundPath,
    CompoundPath$1_setSegment as setSegment,
    CompoundPath$1_interpolate as interpolate,
    CompoundPath$1_computeDimensions as computeDimensions,
    CompoundPath$1_bbox as bbox,
    CompoundPath$1_toString as toString,
    CompoundPath$1_guardContinuous as guardContinuous,
    CompoundPath$1_toSvgString as toSvgString,
    CompoundPath$1_fromPaths as fromPaths,
  };
}

declare type GridVisual = Readonly<{
    readonly size: number;
}>;
declare type Grid = Readonly<{
    readonly rows: number;
    readonly cols: number;
}>;
declare type Cell = Readonly<{
    readonly x: number;
    readonly y: number;
}>;
declare type Neighbours = Readonly<{
    readonly n: Cell | undefined;
    readonly e: Cell | undefined;
    readonly s: Cell | undefined;
    readonly w: Cell | undefined;
    readonly ne: Cell | undefined;
    readonly nw: Cell | undefined;
    readonly se: Cell | undefined;
    readonly sw: Cell | undefined;
}>;
declare type CardinalDirection = `` | `n` | `ne` | `e` | `se` | `s` | `sw` | `w` | `nw`;
declare type BoundsLogic = `unbounded` | `undefined` | `stop` | `wrap`;
declare type VisitorLogic = {
    readonly options?: IdentifyNeighbours;
    readonly select: NeighbourSelector;
};
declare type VisitGenerator = Generator<Readonly<Cell>, void, unknown>;
declare type VisitorOpts = {
    readonly visited?: SetMutable<Cell>;
    readonly reversed?: boolean;
    readonly debug?: boolean;
};
declare type Visitor = (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare type NeighbourMaybe = readonly [keyof Neighbours, Cell | undefined];
declare type Neighbour = readonly [keyof Neighbours, Cell];
declare type NeighbourSelector = (neighbours: ReadonlyArray<Neighbour>) => Neighbour | undefined;
declare type IdentifyNeighbours = (grid: Grid, origin: Cell) => ReadonlyArray<Neighbour>;
/**
 * Returns _true_ if grids `a` and `b` are equal in value
 *
 * @param a
 * @param b
 * @return
 */
declare const isEqual: (a: Grid | GridVisual, b: Grid | GridVisual) => boolean;
/**
 * Returns a key string for a cell instance
 * A key string allows comparison of instances by value rather than reference
 * @param v
 * @returns
 */
declare const cellKeyString: (v: Cell) => string;
/**
 * Returns true if two cells equal. Returns false if either cell (or both) are undefined
 *
 * @param a
 * @param b
 * @returns
 */
declare const cellEquals: (a: Cell, b: Cell) => boolean;
/**
 * Throws an exception if any of the cell's parameters are invalid
 * @private
 * @param cell
 * @param paramName
 * @param grid
 */
declare const guardCell: (cell: Cell, paramName?: string, grid?: Readonly<{
    readonly rows: number;
    readonly cols: number;
}> | undefined) => void;
/**
 * Returns _true_ if cell coordinates are above zero and within bounds of grid
 *
 * @param grid
 * @param cell
 * @return
 */
declare const inside: (grid: Grid, cell: Cell) => boolean;
/**
 * Returns a visual rectangle of the cell, positioned from the top-left corner
 *
 * @param cell
 * @param grid
 * @return
 */
declare const rectangleForCell: (cell: Cell, grid: Grid & GridVisual) => RectPositioned;
/**
 * Returns the cell at a specified visual coordinate
 *
 * @param position Position, eg in pixels
 * @param grid Grid
 * @return Cell at position or undefined if outside of the grid
 */
declare const cellAtPoint: (position: Point, grid: Grid & GridVisual) => Cell | undefined;
/**
 * Returns a list of all cardinal directions
 */
declare const allDirections: readonly CardinalDirection[];
/**
 * Returns a list of + shaped directions (ie. excluding diaganol)
 */
declare const crossDirections: readonly CardinalDirection[];
/**
 * Returns neighbours for a cell. If no `directions` are provided, it defaults to all.
 *
 * ```js
 * const n = neighbours = ({rows: 5, cols: 5}, {x:2, y:2} `wrap`);
 * {
 *  n: {x: 2, y: 1}
 *  s: {x: 2, y: 3}
 *  ....
 * }
 * ```
 * @returns Returns a map of cells, keyed by cardinal direction
 * @param grid Grid
 * @param cell Cell
 * @param bounds How to handle edges of grid
 * @param directions Directions to return
 */
declare const neighbours: (grid: Grid, cell: Cell, bounds?: BoundsLogic, directions?: readonly CardinalDirection[] | undefined) => Neighbours;
/**
 * Returns the visual midpoint of a cell (eg pixel coordinate)
 *
 * @param cell
 * @param grid
 * @return
 */
declare const cellMiddle: (cell: Cell, grid: Grid & GridVisual) => Point;
/**
 * Returns the cells on the line of start and end, inclusive
 *
 * ```js
 * // Get cells that connect 0,0 and 10,10
 * const cells = getLine({x:0,y:0}, {x:10,y:10});
 * ```
 *
 * This function does not handle wrapped coordinates.
 * @param start Starting cell
 * @param end End cell
 * @returns
 */
declare const getLine: (start: Cell, end: Cell) => ReadonlyArray<Cell>;
/**
 * Returns cells that correspond to the cardinal directions at a specified distance
 *
 * @param grid Grid
 * @param steps Distance
 * @param start Start poiint
 * @param bound Logic for if bounds of grid are exceeded
 * @returns Cells corresponding to cardinals
 */
declare const offsetCardinals: (grid: Grid, start: Cell, steps: number, bounds?: BoundsLogic) => Neighbours;
/**
 * Returns an {x,y} signed vector corresponding to the provided cardinal direction.
 * ```js
 * const n = getVectorFromCardinal(`n`); // {x: 0, y: -1}
 * ```
 *
 * Optional `multiplier` can be applied to vector
 * ```js
 * const n = getVectorFromCardinal(`n`, 10); // {x: 0, y: -10}
 * ```
 *
 * Blank direction returns {x: 0, y: 0}
 * @param cardinal Direction
 * @param multiplier Multipler
 * @returns Signed vector in the form of {x,y}
 */
declare const getVectorFromCardinal: (cardinal: CardinalDirection, multiplier?: number) => Cell;
/**
 * Returns a list of cells from `start` to `end`.
 *
 * Throws an error if start and end are not on same row or column.
 *
 * @param start Start cell
 * @param end end clel
 * @param endInclusive
 * @return Array of cells
 */
declare const simpleLine: (start: Cell, end: Cell, endInclusive?: boolean) => ReadonlyArray<Cell>;
/**
 *
 * Returns a coordinate offset from `start` by `vector` amount.
 *
 * Different behaviour can be specified for how to handle when coordinates exceed the bounds of the grid
 *
 *
 * Note: x and y wrapping are calculated independently. A large wrapping of x, for example won't shift down a line
 * @param grid Grid to traverse
 * @param vector Offset in x/y
 * @param start Start point
 * @param bounds
 * @returns Cell
 */
declare const offset: (grid: Grid, start: Cell, vector: Cell, bounds?: BoundsLogic) => Cell | undefined;
/**
 * Visits every cell in grid using supplied selection function
 * In-built functions to use: visitorDepth, visitorBreadth, visitorRandom,
 * visitorColumn, visitorRow.
 *
 * Usage example:
 * ```js
 *  let visitor = Grids.visitor(Grids.visitorRandom, grid, startCell);
 *  for (let cell of visitor) {
 *   // do something with cell
 *  }
 * ```
 *
 * If you want to keep tabs on the visitor, pass in a MutableValueSet. This is
 * updated with visited cells (and is used internally anyway)
 * ```js
 *  let visited = new mutableValueSet<Grids.Cell>(c => Grids.cellKeyString(c));
 *  let visitor = Grids.visitor(Grids.visitorRandom, grid, startCell, visited);
 * ```
 *
 * To visit with some delay, try this pattern
 * ```js
 *  const delayMs = 100;
 *  const run = () => {
 *   let cell = visitor.next().value;
 *   if (cell === undefined) return;
 *   // Do something with cell
 *   setTimeout(run, delayMs);
 *  }
 *  setTimeout(run, delayMs);
 * ```
 * @param {(neighbourSelect: NeighbourSelector} neighbourSelect Select neighbour to visit
 * @param {Grid} grid Grid to visit
 * @param {Cell} start Starting cell
 * @param {MutableStringSet<Cell>} [visited] Optional tracker of visited cells
 * @returns {Iterable<Cell>}
 */
declare const visitor: (logic: VisitorLogic, grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorDepth: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorBreadth: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorRandomContiguous: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorRandom: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorRow: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
/**
 * Runs the provided `visitor` for `steps`, returning the cell we end at
 *
 * ```js
 * // Get a cell 10 steps away (row-wise) from start
 * const cell = visitFor(grid, start, 10, visitorRow);
 * ```
 * @param grid Grid to traverse
 * @param start Start point
 * @param steps Number of steps
 * @param visitor Visitor function
 * @returns
 */
declare const visitFor: (grid: Grid, start: Cell, steps: number, visitor: Visitor) => Cell;
/**
 * Visits cells running down columns, left-to-right.
 * @param grid Grid to traverse
 * @param start Start cell
 * @param opts Options
 * @returns Visitor generator
 */
declare const visitorColumn: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
/**
 * Enumerate rows of grid, returning all the cells in the row
 * ```js
 * for (const row of Grid.rows(shape)) {
 *  // row is an array of Cells.
 * }
 * ```
 * @param grid
 * @param start
 */
declare const rows: (grid: Grid, start?: Cell) => Generator<Readonly<{
    readonly x: number;
    readonly y: number;
}>[], void, unknown>;
/**
 * Enumerate all cells in an efficient manner. Runs left-to-right, top-to-bottom.
 * If end of grid is reached, iterator will wrap to ensure all are visited.
 *
 * @param {Grid} grid
 * @param {Cell} [start={x:0, y:0}]
 */
declare const cells: (grid: Grid, start?: Cell) => Generator<{
    x: number;
    y: number;
}, void, unknown>;

type Grid$1_GridVisual = GridVisual;
type Grid$1_Grid = Grid;
type Grid$1_Cell = Cell;
type Grid$1_Neighbours = Neighbours;
type Grid$1_CardinalDirection = CardinalDirection;
type Grid$1_BoundsLogic = BoundsLogic;
type Grid$1_VisitGenerator = VisitGenerator;
type Grid$1_VisitorOpts = VisitorOpts;
type Grid$1_Visitor = Visitor;
type Grid$1_NeighbourMaybe = NeighbourMaybe;
type Grid$1_Neighbour = Neighbour;
declare const Grid$1_isEqual: typeof isEqual;
declare const Grid$1_cellKeyString: typeof cellKeyString;
declare const Grid$1_cellEquals: typeof cellEquals;
declare const Grid$1_guardCell: typeof guardCell;
declare const Grid$1_inside: typeof inside;
declare const Grid$1_rectangleForCell: typeof rectangleForCell;
declare const Grid$1_cellAtPoint: typeof cellAtPoint;
declare const Grid$1_allDirections: typeof allDirections;
declare const Grid$1_crossDirections: typeof crossDirections;
declare const Grid$1_neighbours: typeof neighbours;
declare const Grid$1_cellMiddle: typeof cellMiddle;
declare const Grid$1_getLine: typeof getLine;
declare const Grid$1_offsetCardinals: typeof offsetCardinals;
declare const Grid$1_getVectorFromCardinal: typeof getVectorFromCardinal;
declare const Grid$1_simpleLine: typeof simpleLine;
declare const Grid$1_offset: typeof offset;
declare const Grid$1_visitor: typeof visitor;
declare const Grid$1_visitorDepth: typeof visitorDepth;
declare const Grid$1_visitorBreadth: typeof visitorBreadth;
declare const Grid$1_visitorRandomContiguous: typeof visitorRandomContiguous;
declare const Grid$1_visitorRandom: typeof visitorRandom;
declare const Grid$1_visitorRow: typeof visitorRow;
declare const Grid$1_visitFor: typeof visitFor;
declare const Grid$1_visitorColumn: typeof visitorColumn;
declare const Grid$1_rows: typeof rows;
declare const Grid$1_cells: typeof cells;
declare namespace Grid$1 {
  export {
    Grid$1_GridVisual as GridVisual,
    Grid$1_Grid as Grid,
    Grid$1_Cell as Cell,
    Grid$1_Neighbours as Neighbours,
    Grid$1_CardinalDirection as CardinalDirection,
    Grid$1_BoundsLogic as BoundsLogic,
    Grid$1_VisitGenerator as VisitGenerator,
    Grid$1_VisitorOpts as VisitorOpts,
    Grid$1_Visitor as Visitor,
    Grid$1_NeighbourMaybe as NeighbourMaybe,
    Grid$1_Neighbour as Neighbour,
    Grid$1_isEqual as isEqual,
    Grid$1_cellKeyString as cellKeyString,
    Grid$1_cellEquals as cellEquals,
    Grid$1_guardCell as guardCell,
    Grid$1_inside as inside,
    Grid$1_rectangleForCell as rectangleForCell,
    Grid$1_cellAtPoint as cellAtPoint,
    Grid$1_allDirections as allDirections,
    Grid$1_crossDirections as crossDirections,
    Grid$1_neighbours as neighbours,
    Grid$1_cellMiddle as cellMiddle,
    Grid$1_getLine as getLine,
    Grid$1_offsetCardinals as offsetCardinals,
    Grid$1_getVectorFromCardinal as getVectorFromCardinal,
    Grid$1_simpleLine as simpleLine,
    Grid$1_offset as offset,
    Grid$1_visitor as visitor,
    Grid$1_visitorDepth as visitorDepth,
    Grid$1_visitorBreadth as visitorBreadth,
    Grid$1_visitorRandomContiguous as visitorRandomContiguous,
    Grid$1_visitorRandom as visitorRandom,
    Grid$1_visitorRow as visitorRow,
    Grid$1_visitFor as visitFor,
    Grid$1_visitorColumn as visitorColumn,
    Grid$1_rows as rows,
    Grid$1_cells as cells,
  };
}

declare type Coord = {
    readonly distance: number;
    readonly angleRadian: number;
};
declare type ToCartesian = {
    (point: Coord, origin?: Point): Point;
    (distance: number, angleRadians: number, origin?: Point): Point;
};
declare const isCoord: (p: number | unknown) => p is Coord;
declare const fromCartesian: (point: Point, origin: Point) => Coord;
declare const toCartesian: ToCartesian;
/**
 * Produces an Archimedean spiral
 *
 *
 * This is a generator:
 * ```
 * const s = spiral(0.1, 1);
 * for (const coord of s) {
 *  // Use Polar coord...
 *  if (coord.step === 1000) break; // Stop after 1000 iterations
 * }
 * ```
 *
 * @param smoothness 0.1 pretty rounded, at around 5 it starts breaking down
 * @param zoom At smoothness 0.1, zoom starting at 1 is OK
 */
declare function spiral(smoothness: number, zoom: number): IterableIterator<Coord & {
    readonly step: number;
}>;
/**
 * Produces an Archimedian spiral with manual stepping.
 * @param step Step number. Typically 0, 1, 2 ...
 * @param smoothness 0.1 pretty rounded, at around 5 it starts breaking down
 * @param zoom At smoothness 0.1, zoom starting at 1 is OK
 * @returns
 */
declare const spiralRaw: (step: number, smoothness: number, zoom: number) => Coord;

type Polar_Coord = Coord;
declare const Polar_isCoord: typeof isCoord;
declare const Polar_fromCartesian: typeof fromCartesian;
declare const Polar_toCartesian: typeof toCartesian;
declare const Polar_spiral: typeof spiral;
declare const Polar_spiralRaw: typeof spiralRaw;
declare namespace Polar {
  export {
    Polar_Coord as Coord,
    Polar_isCoord as isCoord,
    Polar_fromCartesian as fromCartesian,
    Polar_toCartesian as toCartesian,
    Polar_spiral as spiral,
    Polar_spiralRaw as spiralRaw,
  };
}

declare const degreeToRadian: (angleInDegrees: number) => number;
declare const radianToDegree: (angleInRadians: number) => number;
declare const radiansFromAxisX: (point: Point) => number;

declare const index_degreeToRadian: typeof degreeToRadian;
declare const index_radianToDegree: typeof radianToDegree;
declare const index_radiansFromAxisX: typeof radiansFromAxisX;
declare const index_Polar: typeof Polar;
declare namespace index {
  export {
    Circle as Circles,
    Arc as Arcs,
    Line as Lines,
    Rect as Rects,
    Point$1 as Points,
    Path$1 as Paths,
    Grid$1 as Grids,
    Bezier as Beziers,
    CompoundPath$1 as Compound,
    index_degreeToRadian as degreeToRadian,
    index_radianToDegree as radianToDegree,
    index_radiansFromAxisX as radiansFromAxisX,
    index_Polar as Polar,
  };
}

export { CompoundPath$1 as C, Grid$1 as G, Polar as P, radiansFromAxisX as a, degreeToRadian as d, index as i, radianToDegree as r };
