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
  if (acc[idx] < value) {
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
    
    const result = data.reduce((acc, [r, g, b], idx) => {
      if (r <= 12 && g <= 13 && b <= 14) {
        return acc + idx + 1;
      }

      return acc;
    }, 0);

    console.log(result);
  }
  catch (err) {
    console.error(err);
  }
}

main();