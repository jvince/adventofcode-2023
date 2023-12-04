const { promisify } = require('util');

const readFile = promisify(require('fs').readFile);

async function main() {
  try {
    const input = (await readFile('./input', 'utf8')).split(/\r?\n/);
    let result = 0;

    for (let k = 0; k < input.length; k++) {
      const line = input[k];

      const matches = Array.from(
        line.matchAll(/(\d+)/g),
        (result) => [result[1], result.index]
      );

      if (!matches) {
        continue;
      }

      main: for (const [match, mIdx] of matches) {
        const mLen = mIdx + match.length;

        for (let i = k - 1; i < k + 2; i++) {
          for (let j = mIdx - 1; j < mLen + 1; j++) {
            if (i < 0 || i > input.length - 1 || j < 0 || j > line.length - 1 || (i === k && (j > mIdx && j < mLen))) {
              continue;
            }

            const charCode = input[i][j].charCodeAt();
            if (charCode !== 46 && (charCode < 48 || charCode > 57)) {
              result += Number.parseInt(match, 10);
              continue main;
            }
          }
        }
      }
    }

    console.log(result);
  }
  catch (err) {
    console.error(err);
  }
}

main();