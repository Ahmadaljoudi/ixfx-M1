/**
 * Breaks an iterable into array chunks
 * ```js
 * chunks([1,2,3,4,5,6,7,8,9,10], 3);
 * // Yields [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
 * ```
 * @param it
 * @param size
 */
declare function chunks<V>(it: Iterable<V>, size: number): AsyncGenerator<Awaited<V>[], void, unknown>;
/**
 * Return concatenation of iterators
 * @param its
 */
declare function concat<V>(...its: readonly Iterable<V>[]): AsyncGenerator<Awaited<V>, void, undefined>;
/**
 * Drops elements that do not meet the predicate `f`.
 * ```js
 * dropWhile([1, 2, 3, 4], e => e < 3);
 * returns [3, 4]
 * ```
 * @param it
 * @param f
 */
declare function dropWhile<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<Awaited<V>, void, undefined>;
/**
 * Returns true if items in two iterables are equal, as
 * determined by the `equality` function.
 * @param it1
 * @param it2
 * @param equality
 * @returns
 */
declare function equals<V>(it1: Iterable<V>, it2: Iterable<V>, equality?: IsEqual<V>): Promise<boolean | undefined>;
/**
 * Returns _true_ if `f` returns _true_ for
 * every item in iterable
 * @param it
 * @param f
 * @returns
 */
declare function every<V>(it: Iterable<V>, f: (v: V) => boolean): Promise<boolean>;
/**
 * Yields `v` for each item within `it`.
 *
 * ```js
 * fill([1, 2, 3], 0);
 * // Yields: [0, 0, 0]
 * ```
 * @param it
 * @param v
 */
declare function fill<V>(it: AsyncIterable<V>, v: V): AsyncGenerator<Awaited<V>, void, unknown>;
/**
 * Filters an iterable, returning items which match `f`.
 *
 * ```js
 * filter([1, 2, 3, 4], e => e % 2 == 0);
 * returns [2, 4]
 * ```
 * @param it
 * @param f
 */
declare function filter<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<Awaited<V>, void, unknown>;
/**
 * Returns first item from iterable `it` that matches predicate `f`
 * ```js
 * find([1, 2, 3, 4], e => e > 2);
 * // Yields: 3
 * ```
 * @param it
 * @param f
 * @returns
 */
declare function find<V>(it: AsyncIterable<V>, f: (v: V) => boolean): Promise<V | undefined>;
/**
 * Returns a 'flattened' copy of array, un-nesting arrays one level
 * ```js
 * flatten([1, [2, 3], [[4]]]);
 * // Yields: [1, 2, 3, [4]];
 * ```
 * @param it
 */
declare function flatten<V>(it: AsyncIterable<V>): AsyncGenerator<any, void, unknown>;
/**
 * Execute function `f` for each item in iterable
 * @param it
 * @param f
 */
declare function forEach<V>(it: AsyncIterable<V>, f: (v: V) => boolean): Promise<void>;
/**
 * Maps an iterable of type `V` to type `X`.
 * ```js
 * map([1, 2, 3], e => e*e)
 * returns [1, 4, 9]
 * ```
 * @param it
 * @param f
 */
declare function map<V, X>(it: AsyncIterable<V>, f: (v: V) => X): AsyncGenerator<Awaited<X>, void, unknown>;
/**
 * Returns the maximum seen of an iterable
 * ```js
 * min([
 *  {i:0,v:1},
 *  {i:1,v:9},
 *  {i:2,v:-2}
 * ], (a, b) => a.v > b.v);
 * // Yields: {i:1, v:-9}
 * ```
 * @param it Iterable
 * @param gt Should return _true_ if `a` is greater than `b`.
 * @returns
 */
declare function max<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): Promise<V | undefined>;
/**
 * Returns the minimum seen of an iterable
 * ```js
 * min([
 *  {i:0,v:1},
 *  {i:1,v:9},
 *  {i:2,v:-2}
 * ], (a, b) => a.v > b.v);
 * // Yields: {i:2, v:-2}
 * ```
 * @param it Iterable
 * @param gt Should return _true_ if `a` is greater than `b`.
 * @returns
 */
declare function min<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): Promise<V | undefined>;
/**
 * Returns count from `start` for a given length
 * ```js
 * range(-5, 10);
 * // Yields: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]
 * ```
 * @param start
 * @param len
 */
declare function range(start: number, len: number): AsyncGenerator<number, void, unknown>;
/**
 * Reduce for iterables
 * ```js
 * reduce([1, 2, 3], (acc, cur) => acc + cur, 0);
 * // Yields: 6
 * ```
 * @param it Iterable
 * @param f Function
 * @param start Start value
 * @returns
 */
declare function reduce<V>(it: AsyncIterable<V>, f: (acc: V, current: V) => V, start: V): Promise<V>;
/**
 * Returns a section from an iterable
 * @param it Iterable
 * @param start Start index
 * @param end End index (or until completion)
 */
declare function slice<V>(it: AsyncIterable<V>, start?: number, end?: number): AsyncGenerator<Awaited<V>, void, unknown>;
/**
 * Returns true the first time `f` returns true. Useful for spotting any occurrence of
 * data, and exiting quickly
 * ```js
 * some([1, 2, 3, 4], e => e % 3 === 0);
 * // Yields: true
 * ```
 * @param it Iterable
 * @param f Filter function
 * @returns
 */
declare function some<V>(it: AsyncIterable<V>, f: (v: V) => boolean): Promise<boolean>;
/**
 * Returns items for which the filter function returns _true_
 * ```js
 * takeWhile([ 1, 2, 3, 4 ], e => e < 3);
 * // Yields: [ 1, 2 ]
 * ```
 * @param it Iterable
 * @param f Filter function
 * @returns
 */
declare function takeWhile<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<Awaited<V>, void, unknown>;
/**
 * Returns an array of values from an iterator.
 *
 * ```js
 * const data = await toArray(adsrSample(opts, 10));
 * ```
 *
 * Note: If the iterator is infinite, be sure to provide a `count` or the function
 * will never return.
 *
 * @param it Asynchronous iterable
 * @param count Number of items to return, by default all.
 * @returns
 */
declare function toArray<V>(it: AsyncIterable<V>, count?: number): Promise<readonly V[]>;
/**
 * Returns unique items from iterables, given a particular key function
 * ```js
 * unique([{i:0,v:2},{i:1,v:3},{i:2,v:2}], e => e.v);
 * Yields:  [{i:0,v:2},{i:1,v:3}]
 * @param it
 * @param f
 */
declare function unique<V>(it: AsyncIterable<V>, f?: ((id: V) => V)): AsyncGenerator<Awaited<V>, void, unknown>;
/**
 * Combine same-positioned items from several iterables
 * ```js
 * zip( [1, 2, 3], [4, 5, 6], [7, 8, 9] );
 * Yields: [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]
 * ```
 * @param its
 * @returns
 */
declare function zip<V>(...its: readonly AsyncIterable<V>[]): AsyncGenerator<any[], void, unknown>;

declare const IterableAsync_chunks: typeof chunks;
declare const IterableAsync_concat: typeof concat;
declare const IterableAsync_dropWhile: typeof dropWhile;
declare const IterableAsync_equals: typeof equals;
declare const IterableAsync_every: typeof every;
declare const IterableAsync_fill: typeof fill;
declare const IterableAsync_filter: typeof filter;
declare const IterableAsync_find: typeof find;
declare const IterableAsync_flatten: typeof flatten;
declare const IterableAsync_forEach: typeof forEach;
declare const IterableAsync_map: typeof map;
declare const IterableAsync_max: typeof max;
declare const IterableAsync_min: typeof min;
declare const IterableAsync_range: typeof range;
declare const IterableAsync_reduce: typeof reduce;
declare const IterableAsync_slice: typeof slice;
declare const IterableAsync_some: typeof some;
declare const IterableAsync_takeWhile: typeof takeWhile;
declare const IterableAsync_toArray: typeof toArray;
declare const IterableAsync_unique: typeof unique;
declare const IterableAsync_zip: typeof zip;
declare namespace IterableAsync {
  export {
    IterableAsync_chunks as chunks,
    IterableAsync_concat as concat,
    IterableAsync_dropWhile as dropWhile,
    IterableAsync_equals as equals,
    IterableAsync_every as every,
    IterableAsync_fill as fill,
    IterableAsync_filter as filter,
    IterableAsync_find as find,
    IterableAsync_flatten as flatten,
    IterableAsync_forEach as forEach,
    IterableAsync_map as map,
    IterableAsync_max as max,
    IterableAsync_min as min,
    IterableAsync_range as range,
    IterableAsync_reduce as reduce,
    IterableAsync_slice as slice,
    IterableAsync_some as some,
    IterableAsync_takeWhile as takeWhile,
    IterableAsync_toArray as toArray,
    IterableAsync_unique as unique,
    IterableAsync_zip as zip,
  };
}

/**
 * Returns a bundled collection of {@link logger}s
 *
 * ```js
 * const con = logSet(`a`);
 * con.log(`Hello`);  // console.log(`a Hello`);
 * con.warn(`Uh-oh`); // console.warn(`a Uh-oh`);
 * con.error(`Eek!`); // console.error(`a Eek!`);
 * ```
 *
 * By default each prefix is assigned a colour. To use
 * another logic, provide the `colourKey` parameter.
 *
 * ```js
 * // Both set of loggers will use same colour
 * const con = logSet(`a`, true, `system`);
 * const con2 = logSet(`b`, true, `system`);
 * ```
 * @param prefix Prefix for log messages
 * @param verbose True by default. If false, log() messages are a no-op
 * @param colourKey If specified, log messages will be coloured by this key instead of prefix (default)
 * @returns
 */
declare const logSet: (prefix: string, verbose?: boolean, colourKey?: string) => {
    log: Logger;
    warn: Logger;
    error: Logger;
};
type Logger = (m: any) => void;
type LogSet = {
    readonly log: Logger;
    readonly warn: Logger;
    readonly error: Logger;
};
/**
 * Returns a console logging function which prefixes messages. This is
 * useful for tracing messages from different components. Each prefix
 * is assigned a colour, further helping to distinguish messages.
 *
 * Use {@link logSet} to get a bundled set.
 *
 * ```
 * // Initialise once
 * const log = logger(`a`);
 * const error = logger(`a`, `error`);
 * const warn = logger(`a`, `warn);
 *
 * // And then use
 * log(`Hello`);    // console.log(`a Hello`);
 * error(`Uh-oh`);  // console.error(`a Uh-oh`);
 * warn(`Eek!`);    // console.warn(`a Eeek!`);
 * ```
 *
 * Provide the `colourKey` parameter to make log messages
 * be coloured the same, even though the prefix is different.
 * ```js
 * // Both loggers will use the same colour because they
 * // share the colour key `system`
 * const log = logger(`a`,`log`,`system`);
 * const log2 = logger(`b`, `log`, `system`);
 * ```
 * @param prefix
 * @param kind
 * @param colourKey Optional key to colour log lines by instead of prefix
 * @returns
 */
declare const logger: (prefix: string, kind?: `log` | `warn` | `error`, colourKey?: string) => Logger;

type Debug_LogSet = LogSet;
type Debug_Logger = Logger;
declare const Debug_logSet: typeof logSet;
declare const Debug_logger: typeof logger;
declare namespace Debug {
  export {
    Debug_LogSet as LogSet,
    Debug_Logger as Logger,
    Debug_logSet as logSet,
    Debug_logger as logger,
  };
}

/**
 * Returns `fallback` if `v` is NaN, otherwise returns `v`
 * @param v
 * @param fallback
 * @returns
 */
declare const ifNaN: (v: number, fallback: number) => number;
/**
 * Maps the properties of an object through a map function.
 * In terms of typesafety, the mapped properties are assumed to have the
 * same type.
 *
 * ```js
 * const o = {
 *  x: 10,
 *  y: 20,
 *  width: 200,
 *  height: 200
 * }
 *
 * // Make each property use an averager instead
 * const oAvg = mapObject(o, (value, key) => {
 *  return movingAverage(10);
 * });
 *
 * // Add a value to the averager
 * oAvg.x.add(20);
 * ```
 */
declare const mapObject: <X extends Record<string, unknown>, V>(object: X, mapFn: (value: any, key?: readonly [keyof X] | undefined, index?: number) => V) => RemapObjectPropertyType<X, V>;
type RemapObjectPropertyType<OriginalType, PropType> = {
    readonly [Property in keyof OriginalType]: PropType;
};
/**
 * Returns true if `x` is a power of two
 * @param x
 * @returns True if `x` is a power of two
 */
declare const isPowerOfTwo: (x: number) => boolean;
/**
 * Returns the relative difference from the `initial` value
 * ```js
 * const rel = relativeDifference(100);
 * rel(100); // 1
 * rel(150); // 1.5
 * rel(50);  // 0.5
 * ```
 *
 * The code for this is simple:
 * ```js
 * const relativeDifference = (initial) => (v) => v/initial
 * ```
 * @param {number} initial
 * @returns
 */
declare const relativeDifference: (initial: number) => (v: number) => number;
/**
 * Returns a field on object `o` by a dotted path.
 * ```
 * const d = {
 *  accel: {x: 1, y: 2, z: 3},
 *  gyro:  {x: 4, y: 5, z: 6}
 * };
 * getFieldByPath(d, `accel.x`); // 1
 * getFieldByPath(d, `gyro.z`);  // 6
 * getFieldByPath(d, `gyro`);    // {x:4, y:5, z:6}
 * getFieldByPath(d, ``);        // Returns original object
 * ```
 *
 * If a field does not exist, `undefined` is returned.
 * Use {@link getFieldPaths} to get a list of paths.
 * @param o
 * @param path
 * @returns
 */
declare const getFieldByPath: (o: any, path?: string) => any | undefined;
/**
 * Returns a list of paths for all the fields on `o`
 * ```
 * const d = {
 *  accel: {x: 1, y: 2, z: 3},
 *  gyro:  {x: 4, y: 5, z: 6}
 * };
 * const paths = getFieldPaths(d);
 * // Yields [ `accel.x`, `accel.y`,`accel.z`,`gyro.x`,`gyro.y`,`gyro.z` ]
 * ```
 *
 * Use {@link getFieldByPath} to fetch data by this 'path' string.
 * @param o
 * @returns
 */
declare const getFieldPaths: (o: any) => readonly string[];
/**
 * Rounds `v` up to the nearest multiple of `multiple`
 * ```
 * roundMultiple(19, 20); // 20
 * roundMultiple(21, 20); // 40
 * ```
 * @param v
 * @param multiple
 * @returns
 */
declare const roundUpToMultiple: (v: number, multiple: number) => number;
type ToString<V> = (itemToMakeStringFor: V) => string;
/**
 * Function that returns true if `a` and `b` are considered equal
 */
type IsEqual<V> = (a: V, b: V) => boolean;
/**
 * Default comparer function is equiv to checking `a === b`
 */
declare const isEqualDefault: <V>(a: V, b: V) => boolean;
/**
 * Comparer returns true if string representation of `a` and `b` are equal.
 * Uses `toStringDefault` to generate a string representation (`JSON.stringify`)
 * @returns True if the contents of `a` and `b` are equal
 */
declare const isEqualValueDefault: <V>(a: V, b: V) => boolean;
/**
 * A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
 */
declare const toStringDefault: <V>(itemToMakeStringFor: V) => string;
declare const runningiOS: () => boolean;
type CompareResult = 0 | 1 | -1;
type Comparer<V> = (a: V, b: V) => CompareResult;
/**
 * Default sort comparer, following same sematics as Array.sort
 * @param x
 * @param y
 * @returns
 */
declare const defaultComparer: (x: any, y: any) => CompareResult;

type Util_CompareResult = CompareResult;
type Util_Comparer<V> = Comparer<V>;
declare const Util_Debug: typeof Debug;
type Util_IsEqual<V> = IsEqual<V>;
declare const Util_IterableAsync: typeof IterableAsync;
type Util_RemapObjectPropertyType<OriginalType, PropType> = RemapObjectPropertyType<OriginalType, PropType>;
type Util_ToString<V> = ToString<V>;
declare const Util_defaultComparer: typeof defaultComparer;
declare const Util_getFieldByPath: typeof getFieldByPath;
declare const Util_getFieldPaths: typeof getFieldPaths;
declare const Util_ifNaN: typeof ifNaN;
declare const Util_isEqualDefault: typeof isEqualDefault;
declare const Util_isEqualValueDefault: typeof isEqualValueDefault;
declare const Util_isPowerOfTwo: typeof isPowerOfTwo;
declare const Util_mapObject: typeof mapObject;
declare const Util_relativeDifference: typeof relativeDifference;
declare const Util_roundUpToMultiple: typeof roundUpToMultiple;
declare const Util_runningiOS: typeof runningiOS;
declare const Util_toStringDefault: typeof toStringDefault;
declare namespace Util {
  export {
    Util_CompareResult as CompareResult,
    Util_Comparer as Comparer,
    Util_Debug as Debug,
    Util_IsEqual as IsEqual,
    Util_IterableAsync as IterableAsync,
    Util_RemapObjectPropertyType as RemapObjectPropertyType,
    Util_ToString as ToString,
    Util_defaultComparer as defaultComparer,
    Util_getFieldByPath as getFieldByPath,
    Util_getFieldPaths as getFieldPaths,
    Util_ifNaN as ifNaN,
    Util_isEqualDefault as isEqualDefault,
    Util_isEqualValueDefault as isEqualValueDefault,
    Util_isPowerOfTwo as isPowerOfTwo,
    Util_mapObject as mapObject,
    Util_relativeDifference as relativeDifference,
    Util_roundUpToMultiple as roundUpToMultiple,
    Util_runningiOS as runningiOS,
    Util_toStringDefault as toStringDefault,
  };
}

export { CompareResult as C, Debug as D, IsEqual as I, LogSet as L, RemapObjectPropertyType as R, ToString as T, Util as U, IterableAsync as a, isPowerOfTwo as b, getFieldPaths as c, roundUpToMultiple as d, isEqualDefault as e, isEqualValueDefault as f, getFieldByPath as g, runningiOS as h, ifNaN as i, Comparer as j, defaultComparer as k, mapObject as m, relativeDifference as r, toStringDefault as t };
