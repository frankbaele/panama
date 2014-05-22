/**
 * Random number god
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */
define([], function () {
  var seed,
    s0 = 0,
    s1 = 0,
    s2 = 0,
    c = 0,
    frac = 2.3283064365386963e-10;
  /* 2^-32 */

  function init() {
    setSeed(Date.now());
  }

  /**
   * @returns {number}
   */
  function getSeed() {
    return seed;
  }

  /**
   * @param {number} seed Seed the number generator
   */
  function setSeed(tempSeed) {
    tempSeed = (tempSeed < 1 ? 1 / tempSeed : tempSeed);

    seed = tempSeed;
    s0 = (tempSeed >>> 0) * frac;

    tempSeed = (tempSeed * 69069 + 1) >>> 0;
    s1 = tempSeed * frac;

    tempSeed = (tempSeed * 69069 + 1) >>> 0;
    s2 = tempSeed * frac;

    c = 1;
  }

  /**
   * @returns {float} Pseudorandom value [0,1), uniformly distributed
   */
  function getUniform() {
    var t = 2091639 * s0 + c * frac;
    s0 = s1;
    s1 = s2;
    c = t | 0;
    s2 = t - c;
    return s2;
  }

  /**
   * @param {float} [mean=0] Mean value
   * @param {float} [stddev=1] Standard deviation. ~95% of the absolute values will be lower than 2*stddev.
   * @returns {float} A normally distributed pseudorandom value
   */
  function getNormal(mean, stddev) {
    do {
      var u = 2 * getUniform() - 1;
      var v = 2 * getUniform() - 1;
      var r = u * u + v * v;
    } while (r > 1 || r == 0);

    var gauss = u * Math.sqrt(-2 * Math.log(r) / r);
    return (mean || 0) + gauss * (stddev || 1);
  }

  /**
   * @returns {int} Pseudorandom value [1,100] inclusive, uniformly distributed
   */
  function getPercentage() {
    return 1 + Math.floor(getUniform() * 100);
  }

  /**
   * @param {object} data key=whatever, value=weight (relative probability)
   * @returns {string} whatever
   */
  function getWeightedValue(data) {
    var avail = [];
    var total = 0;

    for (var id in data) {
      total += data[id];
    }
    var random = Math.floor(getUniform() * total);

    var part = 0;
    for (var id in data) {
      part += data[id];
      if (random < part) {
        return id;
      }
    }

    return null;
  }

  /**
   * Get RNG state. Useful for storing the state and re-setting it via setState.
   * @returns {?} Internal state
   */
  function getState() {
    return [s0, s1, s2, c];
  }

  /**
   * Set a previously retrieved state.
   * @param {?} state
   */
  function setState(state) {
    s0 = state[0];
    s1 = state[1];
    s2 = state[2];
    c = state[3];
  }

  init();

  return {
    getSeed: getSeed,
    setSeed: setSeed,
    getUniform: getUniform,
    getNormal: getNormal,
    getPercentage: getPercentage,
    getWeightedValue: getWeightedValue,
    getState: getState,
    setState: setState
  };
});
