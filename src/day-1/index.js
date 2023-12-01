const { promisify } = require('util');

const readFile = promisify(require('fs').readFile);

const NumberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
};

function getNumberFromMap(str) {
  return NumberMap[str] ?? str;
}

/** 
 * @callback StringProcessor
 * @param {string} str
 * @returns {number}
 */

/** @type {StringProcessor} */
function processLine1(str) {
  const first = str.match(/\d/);

  if (!first) {
    throw new Error(`Invalid line: ${str}. No number found.`);
  };

  const last = str.match(/\d(?=\D*$)/);
  const n = Number.parseInt(`${first}${last}`, 10)

  console.log(`got: ${n}`);

  return n;
}

/** @type {StringProcessor} */
function processLine2(str) {
  const result = Array.from(
    str.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g),
    ([, match]) => match
  );

  if (!result) {
    throw new Error(`Invalid line: ${str}. No number found.`);
  };

  const n = Number.parseInt(`${getNumberFromMap(result[0])}${getNumberFromMap(result[result.length - 1])}`, 10)

  console.log(`got: ${n}`);

  return n;
}


async function main() {
  try {
    const input = await readFile('./input', 'utf8');
    const lines = input.split(/\r?\n/);

    const result = lines.reduce((acc, line) => {
      console.log(`processing line: ${line}`);
      return acc + processLine2(line);
    }, 0)

    console.log(`Result: ${result}`);
  }
  catch (err) {
    console.error(err);
  }
}

main();