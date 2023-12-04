const { promisify } = require('util');

const readFile = promisify(require('fs').readFile);

function isNumber(c) {
  if (typeof c !== 'string') {
    return false;
  }

  const charCode = c.charCodeAt();
  return charCode >= 48 && charCode <= 57;
}

function take(str, idx, d, n = '') {
  if (idx === -1) {
    return n;
  }

  const c = str[idx];
  
  if (isNumber(c)) {
    idx = idx + (1 * d);
    return take(str, idx, d, d === -1 ? c + n : n + c);
  }

  return n;
}

async function main() {
  try {
    const input = (await readFile('./input', 'utf8')).split(/\r?\n/);
    let result = 0;
    let matches = [];

    for (let k = 0; k < input.length; k++) {
      const line = input[k];

      Array.from(
        line.matchAll(/(\*)/g),
        (result) => { matches.push([k, result.index]); }
      );
    }

    for (const [i, j] of matches) {
      const arr = [];

      if (isNumber(input[i][j - 1])) {
        arr.push(parseInt(take(input[i], j - 1, -1)));
      }

      if (isNumber(input[i][j + 1])) {
        arr.push(parseInt(take(input[i], j + 1, 1)));
      }

      if ((isNumber(input[i - 1][j]))) {
        arr.push(parseInt(`${take(input[i - 1], j, -1)}${take(input[i - 1], j + 1, 1)}`));
      }
      if (!isNumber(input[i - 1][j]) && isNumber(input[i - 1][j - 1])) {
        arr.push(parseInt(take(input[i - 1], j - 1, -1)));
      }
      if (!isNumber(input[i - 1][j]) && isNumber(input[i - 1][j + 1])) {
        arr.push(parseInt(take(input[i - 1], j + 1, 1)));
      }

      if (isNumber(input[i + 1][j])) {
        arr.push(parseInt(`${take(input[i + 1], j, -1)}${take(input[i + 1], j + 1, 1)}`));
      }
      if (!isNumber(input[i + 1][j]) && isNumber(input[i + 1][j - 1])) {
        arr.push(parseInt(take(input[i + 1], j - 1, -1)));
      }
      if (!isNumber(input[i + 1][j]) && isNumber(input[i + 1][j + 1])) {
        arr.push(parseInt(take(input[i + 1], j + 1, 1)));
      }

      if (arr.length === 2) {
        result += arr[0] * arr[1];
      }
      console.log(arr);
    }

    console.log(result);
  }
  catch (err) {
    console.error(err);
  }
}

main();