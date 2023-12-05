const { promisify } = require('util');

const readFile = promisify(require('fs').readFile);

async function main() {
  try {
    const input = (await readFile('./input', 'utf8')).split(/\r?\n/);
    let result = 0;
    let stack = {};

    for (let i = input.length - 1; i >= 0; i--) {
      const [m, n] = input[i].split(':')[1].split('|').map((v) => (
        v.match(/(\d+)/g).map((n) => Number.parseInt(n, 10))
      ));

      result += 1;
      const t = m.filter((v) => n.includes(v));
      stack[i] = t.length;
      
      for (let j = i + 1; j <= i + t.length; j++) {
        stack[i] += stack[j];
      }

      result += stack[i];
    }

    console.log(result);
  }
  catch (err) {
    console.error(err);
  }
}

main();