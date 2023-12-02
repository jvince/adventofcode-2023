const { promisify } = require('util');

const readFile = promisify(require('fs').readFile);

const ColorToIndexMap = {
  red: 0,
  green: 1,
  blue: 2
};

function reducer(acc, [count, color]) {
  const idx = ColorToIndexMap[color];
  const value = parseInt(count, 10);
  if (acc[idx] < value || acc[idx] === 0) {
    acc[idx] = value;
  }
  return acc;
}

function parse(line) {
  return Array.from(line.matchAll(/(?:(\d+)\s(red|green|blue))/g), ([, v, k]) => [v, k]);
}

async function main() {
  try {
    const input = (await readFile('./input', 'utf8')).split(/\r?\n/);

    const data = input.reduce(
      (acc, line) => ([
        ...acc,
        [...parse(line).reduce(reducer, [0, 0, 0])]
      ]),
      []
    );
    
    const result = data.reduce((acc, [r, g, b]) => {
      return acc + r * g * b;
    }, 0);

    console.log(result);
  }
  catch (err) {
    console.error(err);
  }
}

main();