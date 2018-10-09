import _ from 'lodash';
import fs from 'fs';

const genDiff = (filePath1, filePath2) => {
  const data1 = fs.readFileSync(filePath1, 'utf8');
  const data2 = fs.readFileSync(filePath2, 'utf8');

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  const result = [...Object.keys(obj1), ...Object.keys(obj2)]
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((key) => {
      if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key]) {
        return `    ${key}: ${obj1[key]}`;
      }
      if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key]) {
        return `  - ${key}: ${obj1[key]}`
          + `\n  + ${key}: ${obj2[key]}`;
      }
      if (_.has(obj1, key) && !_.has(obj2, key)) {
        return `  - ${key}: ${obj1[key]}`;
      }
      if (!_.has(obj1, key) && _.has(obj2, key)) {
        return `  + ${key}: ${obj2[key]}`;
      }
      return key;
    }).join('\n');

  return `{\n${result}\n}`;
};

export const fillProgram = (program) => {
  program
    .arguments('Usage: gendiff <firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'Output format')
    .action((filePath1, filePath2) => {
      console.log(genDiff(filePath1, filePath2));
    });
};

export default genDiff;
