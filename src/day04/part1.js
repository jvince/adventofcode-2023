const { promisify } = require('util');

const readFile = promisify(require('fs').readFile);

async function main() {
  try {
    const input = (await readFile('./input', 'utf8')).split(/\r?\n/);
    let result = 0;


    for (const line of input) {
      const [a, b] = line.split(':')[1].split('|').map((v) => (
        v.match(/(\d+)/g).map((n) => Number.parseInt(n, 10))
      ));

      const n = a.filter((v) => b.includes(v));
      if (n.length > 0) {
        result += Math.pow(2, n.length - 1);
      }
    }

    console.log(result);
  }
  catch (err) {
    console.error(err);
  }
}

main();