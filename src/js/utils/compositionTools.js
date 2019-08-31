// Utilities for functional composition

// pipe -- compose functions from left to right
const _pipe = (f, g) => (...args) => g(f(...args));
const pipe = (...fns) => fns.reduce(_pipe);

module.exports.pipe = pipe;
