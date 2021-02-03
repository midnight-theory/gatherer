const sleep = require('./lib/sleep');
const fetch = require('./lib/fetch');
const nest = require('./lib/nest');
const transform = require('./lib/transform');
const writePages = require('./lib/write-pages');

/**
 * Gatherer
 * @type {object}
 */
const gatherer = {
  sleep,
  fetch,
  nest,
  transform,
  writePages
};

module.exports = gatherer;