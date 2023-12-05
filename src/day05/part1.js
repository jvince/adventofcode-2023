const { promisify } = require('util');

const readFile = promisify(require('fs').readFile);

function toNumberArr(str) {
  if (typeof str !== 'string') {
    return null;
  }

  return str.match(/(\d+)/g)?.map((v) => parseInt(v, 10)) ?? null;
}

function getDestinationValue(n, rules) {
  for (let rule of rules) {
    const [dRange, sRange, range] = rule;
    if (n >= sRange && n <= sRange + range) {
      return (n - sRange) + dRange;
    }
  }

  return n;
}

async function main() {
  try {
    const input = (await readFile('./input', 'utf8')).split(/\r?\n/);
    let source = 'seed';
    let destination = null;
    const result = { [source]: toNumberArr(input[0].split(':')[1]) };
    
    for (let i = 1; i < input.length; i++) {
      const line = input[i].trim();
      const rules = [];

      if (!line.length) {
        continue;
      }

      const mapMatch = line.match(/(\w+)-to-(\w+)/);
      if (mapMatch) {
        destination = mapMatch[2];
        result[destination] = [];

        for (let j = i + 1; ; j++) {
          const rule = toNumberArr(input[j]);
          if (rule) {
            i += 1;
            rules.push(rule)
          }
          else {
            break;
          }
        }
      }

      for (let j = 0; j < result[source].length; j++) {
        result[destination].push(getDestinationValue(result[source][j], rules));
      }

      source = destination;
    }
    console.log(result[destination].sort((a, b) => a - b)[0]);
  }
  catch (err) {
    console.error(err);
  }
}

main();