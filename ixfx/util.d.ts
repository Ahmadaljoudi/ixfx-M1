/**
 * Clamps a value between min and max (both inclusive)
 * Defaults to a 0-1 range, useful for percentages.
 *
 * @example Usage
 * ```js
 * // 0.5 - just fine, within default of 0 to 1
 * clamp(0.5);
 * // 1 - above default max of 1
 * clamp(1.5);
 * // 0 - below range
 * clamp(-50, 0, 100);
 * // 50 - within range
 * clamp(50, 0, 50);
 * ```
 *
 * For clamping integer ranges, consider {@link clampZeroBounds}
 * For clamping {x,y} points, consider `Points.clamp`.
 *
 * @param v Value to clamp
 * @param Minimum value (inclusive)
 * @param Maximum value (inclusive)
 * @returns Clamped value
 */
declare const clamp: (v: number, min?: number, max?: number) => number;
/**
 * Scales `v` from an input range to an output range (aka `map`)
 *
 * For example, if a sensor's useful range is 100-500, scale it to a percentage:
 * ```js
 * scale(sensorReading, 100, 500, 0, 1);
 * ```
 *
 * `scale` defaults to a percentage-range output, so you can get away with:
 * ```js
 * scale(sensorReading, 100, 500);
 * ```
 *
 * If inMin and inMax are equal, outMax will be returned.
 * @param v Value to scale
 * @param inMin Input minimum
 * @param inMax Input maximum
 * @param outMin Output minimum. If not specified, 0
 * @param outMax Output maximum. If not specified, 1
 * @param easing Easing function to use
 * @returns Scaled value
 */
declare const scale: (v: number, inMin: number, inMax: number, outMin?: number | undefined, outMax?: number | undefined, easing?: ((v: number) => number) | undefined) => number;
declare type NumberFunction = () => number;
/**
 * Flips a percentage-scale number: `1 - v`.
 *
 * The utility of this function is that it sanity-checks
 * that `v` is in 0..1 scale.
 *
 * ```js
 * flip(1);   // 0
 * flip(0.5); // 0.5
 * flip(0);   // 1
 * ```
 * @param v
 * @returns
 */
declare const flip: (v: number | NumberFunction) => number;
/**
 * Scales a percentage-scale number `v * t`.
 * The utility of this function is that it sanity-checks that
 *  both parameters are in 0..1 scale
 * @param v Value
 * @param t Scale amount
 * @returns Scaled value
 */
declare const proportion: (v: number | NumberFunction, t: number | NumberFunction) => number;
/**
 * Scales a percentage-scale number but reversed: `(1-v) * t`
 * The utility of this function is that it sanity-checks that
 *  both parameters are in 0..1 scale
 * @param v
 * @param t
 * @returns
 */
declare const proportionReverse: (v: number | NumberFunction, t: number | NumberFunction) => number;
/**
 * Scales an input percentage to a new percentage range.
 *
 * If you have an input percentage (0-1), `scalePercentageOutput` maps it to an
 * _output_ percentage of `outMin`-`outMax`.
 *
 * ```js
 * // Scales 50% to a range of 0-10%
 * scalePercentages(0.5, 0, 0.10); // 0.05 - 5%
 * ```
 *
 * An error is thrown if any parameter is outside of percentage range. This added
 * safety is useful for catching bugs. Otherwise, you could just as well call
 * `scale(percentage, 0, 1, outMin, outMax)`.
 *
 * If you want to scale some input range to percentage output range, just use `scale`:
 * ```js
 * // Yields 0.5
 * scale(2.5, 0, 5);
 * ```
 * @param percentage Input value, within percentage range
 * @param outMin Output minimum, between 0-1
 * @param outMax Output maximum, between 0-1
 * @returns Scaled value between outMin-outMax.
 */
declare const scalePercentages: (percentage: number, outMin: number, outMax?: number) => number;
/**
 * Scales an input percentage value to an output range
 * If you have an input percentage (0-1), `scalePercent` maps it to an output range of `outMin`-`outMax`.
 * ```js
 * scalePercent(0.5, 10, 20); // 15
 * ```
 *
 * @param v Value to scale
 * @param outMin Minimum for output
 * @param outMax Maximum for output
 * @returns
 */
declare const scalePercent: (v: number, outMin: number, outMax: number) => number;
/**
 * Clamps integer `v` between 0 (inclusive) and array length or length (exclusive).
 * Returns value then will always be at least zero, and a valid array index.
 *
 * @example Usage
 * ```js
 * // Array of length 4
 * const myArray = [`a`, `b`, `c`, `d`];
 * clampIndex(0, myArray);    // 0
 * clampIndex(4, myArray);    // 3
 * clampIndex(-1, myArray);   // 0
 *
 * clampIndex(5, 3); // 2
 * ```
 *
 * Throws an error if `v` is not an integer.
 * @param v Value to clamp (must be an interger)
 * @param arrayOrLength Array, or length of bounds (must be an integer)
 * @returns Clamped value, minimum will be 0, maximum will be one less than `length`.
 */
declare const clampIndex: (v: number, arrayOrLength: number | readonly any[]) => number;
/**
 * Interpolates between `a` and `b` by `amount`. Aka `lerp`.
 *
 * @example Get the halfway point between 30 and 60
 * ```js
 * interpolate(0.5, 30, 60);
 * ```
 *
 * Interpolation is often used for animation. In that case, `amount`
 * would start at 0 and you would keep interpolating up to `1`
 * @example
 * ```js
 * // Go back and forth between 0 and 1 by 0.1
 * let pp = percentPingPong(0.1);
 * continuously(() => {
 *  // Get position in ping-pong
 *  const amt = pp.next().value;
 *  // interpolate between Math.PI and Math.PI*2
 *  const v = interpolate(amt, Math.PI, Math.PI*2);
 *  // do something with v...
 * }).start();
 * ```
 *
 * See also {@link Colour.interpolate}, {@link Points.interpolate}.
 * @param amount Interpolation amount, between 0 and 1 inclusive
 * @param a Start (ie when `amt` is 0)
 * @param b End (ie. when `amt` is 1)
 * @returns Interpolated value which will be between `a` and `b`.
 */
declare const interpolate: (amount: number, a: number, b: number) => number;
/**
 * @private
 */
declare type ToString<V> = (itemToMakeStringFor: V) => string;
/**
 * @private
 */
declare type IsEqual<V> = (a: V, b: V) => boolean;
/**
 * Default comparer function is equiv to checking `a === b`
 * @private
 * @template V
 * @param {V} a
 * @param {V} b
 * @return {*}  {boolean}
 */
declare const isEqualDefault: <V>(a: V, b: V) => boolean;
/**
 * Comparer returns true if string representation of `a` and `b` are equal.
 * Uses `toStringDefault` to generate a string representation (`JSON.stringify`)
 * @private
 * @template V
 * @param {V} a
 * @param {V} b
 * @return {*}  {boolean} True if the contents of `a` and `b` are equal
 */
declare const isEqualValueDefault: <V>(a: V, b: V) => boolean;
/**
 * A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
 * @private
 * @template V
 * @param {V} itemToMakeStringFor
 * @returns {string}
 */
declare const toStringDefault: <V>(itemToMakeStringFor: V) => string;
/**
 * Wraps a number within a specified range, defaulting to degrees (0-360)
 *
 * This is useful for calculations involving degree angles and hue, which wrap from 0-360.
 * Eg: to add 200 to 200, we don't want 400, but 40.
 *
 * ```js
 * const v = wrap(200+200, 0, 360); // 40
 * ```
 *
 * Or if we minus 100 from 10, we don't want -90 but 270
 * ```js
 * const v = wrap(10-100, 0, 360); // 270
 * ```
 *
 * `wrap` uses 0-360 as a default range, so both of these
 * examples could just as well be:
 *
 * ```js
 * wrap(200+200);  // 40
 * wrap(10-100);  // 270
 * ```
 *
 * Non-zero starting points can be used. A range of 20-70:
 * ```js
 * const v = wrap(-20, 20, 70); // 50
 * ```
 *
 * Note that the minimum value is inclusive, while the maximum is _exclusive_.
 * So with the default range of 0-360, 360 is never reached:
 *
 * ```js
 * wrap(360); // 0
 * wrap(361); // 1
 * ```
 *
 * @param v Value to wrap
 * @param min Integer minimum of range (default: 0). Inclusive
 * @param max Integer maximum of range (default: 360). Exlusive
 * @returns
 */
declare const wrapInteger: (v: number, min?: number, max?: number) => number;
/**
 * Wraps floating point numbers. Defaults to a 0..1 scale.
 * @param v
 * @param min
 * @param max
 * @returns
 */
declare const wrap: (v: number, min?: number, max?: number) => number;
/**
 * Performs a calculation within a wrapping number range. This is a lower-level function.
 * See also: {@link wrapInteger} for simple wrapping within a range.
 *
 * `min` and `max` define the start and end of the valid range, inclusive. Eg for hue degrees it'd be 0, 360.
 * `a` and `b` is the range you want to work in.
 *
 * For example, let's say you want to get the middle point between a hue of 30 and a hue of 330 (ie warmer colours):
 * ```js
 * wrapRange(0,360, (distance) => {
 *  // for a:0 and b:330, distance would be 90 from 30 degrees to 330 (via zero)
 *  return distance * 0.5; // eg return middle point
 * }, 30, 330);
 * ```
 *
 * The return value of the callback should be in the range of 0-distance. `wrapRange` will subsequently
 * conform it to the `min` and `max` range before it's returned to the caller.
 *
 * @param a Output start (eg. 60)
 * @param b Output end (eg 300)
 * @param min Range start (eg 0)
 * @param max Range end (eg 360)
 * @param fn Returns a computed value from 0 to `distance`.
 * @returns
 */
declare const wrapRange: (min: number, max: number, fn: (distance: number) => number, a: number, b: number) => number;

export { IsEqual, NumberFunction, ToString, clamp, clampIndex, flip, interpolate, isEqualDefault, isEqualValueDefault, proportion, proportionReverse, scale, scalePercent, scalePercentages, toStringDefault, wrap, wrapInteger, wrapRange };