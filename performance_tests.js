const rnd = () => Math.round(Math.random() * 256);

const test = (rgb, iterations, method, repeat = 0) => {
  if (!results[method.name]) results[method.name] = [];
  for (var i = 0; i <= repeat; i++) {
    rgb = Array.isArray(rgb) ? [...rgb] : { ...rgb };
    results[method.name].push(measure(iterations, rgb, method));
  }
};

const measure = (count, rgb, method = spread) => {
  type = Array.isArray(rgb) ? 'Array' : 'Object';
  let start = Date.now();

  for (var i = 0; i < count; i++) {
    rgb = method(rgb);
  }

  const time = (Date.now() - start) / 1000;
  return { method: method.name, type, time, data: JSON.stringify(rgb) };
};

// manual assignment is up to 10x faster than spread
function manualAssign(rgb) {
  if (Array.isArray(rgb)) {
    // Array.isArray(rgb)
    return [rgb[0], rgb[1], rgb[2]];
  } else {
    return { r: rgb.r, g: rgb.g, b: rgb.b };
  }
}

// manual assignment is up to 10x faster than spread
function serialise(rgb) {
  return JSON.parse(JSON.stringify(rgb));
}

// spread is up to 10x slower than manual assignment
function spread(rgb) {
  if (Array.isArray(rgb)) {
    return [...rgb];
  } else {
    return { ...rgb };
  }
}

const results = {};
const rgbObj = { r: 100, g: 200, b: 300 };
const rgbArr = [100, 200, 300];
const iterations = 1000000;
const repeatEachTest = 1;

test(rgbObj, iterations, serialise, repeatEachTest);
test(rgbObj, iterations, spread, repeatEachTest);
test(rgbObj, iterations, manualAssign, repeatEachTest);
//
test(rgbArr, iterations, spread, repeatEachTest);
test(rgbArr, iterations, manualAssign, repeatEachTest);
test(rgbArr, iterations, serialise, repeatEachTest);

const details = Object.values(results).reduce((acc, method) => [...method, ...acc], []);
const sorted = details.sort((a, b) => a.time > b.time);
console.log(sorted);
const summary = sorted.reduce((acc, result) => {
  let { count, total, average } = acc[result.method] || { count: 0, total: 0, average: 0 };
  count += 1;
  total = Number((total + result.time).toFixed(5));
  average = Number((total / count).toFixed(3));
  acc[result.method] = { count, total, average };
  return acc;
}, {});

console.table(summary);
console.table(sorted);
