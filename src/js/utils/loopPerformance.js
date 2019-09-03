import { compileFunction } from 'vm';
import { format } from 'path';

const btn = document.createElement('button');
btn.onclick = () => go();
btn.innerHTML = 'Run All Tests';
document.body.appendChild(btn);

// size of array to be used for testing iteration speed
const count = 50000000;

// function to run on each item while iterating
const calc_a = int => int;
const calc_b = int => Date.now() * 3 * int;
const items = [];
// let results = [];

// build an array with [count] values for iterating over
while (items.length < count) {
  items.push(Math.round(Math.random() * 20));
}

const runTest = (method, iterable) => {
  const start = performance.now();
  switch (method) {
    case 'foreach':
      iterable.forEach(i => {
        calc_b(i);
      });
      break;
    case 'forof':
      for (let i of iterable) {
        calc_b(i);
      }
      break;
    case 'for_a':
      for (let i = 0; i < iterable.length; i++) {
        calc_b(i);
      }
      break;
    case 'for_b':
      let i = 0;
      for (; i < iterable.length; i++) {
        calc_b(i);
      }
      break;
  }
  return (performance.now() - start) / 1000;
};

// ------------------------------------------------------------
// ------------------------------------------------------------
// Call the runTest func for each loop type and format the results.
// nothing in here should make any difference to the
// execution times that are reported.

const go = () => {
  console.log('Running');
  let results = [
    { type: 'for_a', time: runTest('for_a', items) },
    { type: 'for_b', time: runTest('for_b', items) },
    { type: 'forEach', time: runTest('foreach', items) },
    { type: 'forOf', time: runTest('forof', items) },
  ];

  results = results.sort((a, b) => a.time > b.time);

  results.forEach(result => {
    const bestTime = results[0].time;
    const diff = result.time - bestTime;
    result['Time Diff'] = diff;
    result['% Slower'] = diff == 0 ? 0 : (diff / bestTime) * 100;
  });
  console.table(results);
};

// to calculate the difference in execution time and % slower
// of each loop type, compared to the fastest type

// {r: 100, g: 200, b: 100}
