/**
 * Delays a promise
 * @type {function}
 * @param {number} ms - Number of milliseconds to delay for
 * @return {function}
 */

const sleep = (ms) => {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

module.exports = sleep;
