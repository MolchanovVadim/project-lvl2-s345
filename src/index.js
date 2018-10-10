import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseData from './parsers';

const buildRow = (key, obj1, obj2) => {
  if (_.has(obj1, key) && !_.has(obj2, key)) {
    return `  - ${key}: ${obj1[key]}`;
  }
  if (!_.has(obj1, key) && _.has(obj2, key)) {
    return `  + ${key}: ${obj2[key]}`;
  }
  if (obj1[key] === obj2[key]) {
    return `    ${key}: ${obj1[key]}`;
  }
  return `  - ${key}: ${obj1[key]}`
      + `\n  + ${key}: ${obj2[key]}`;
};

const genDiff = (filePath1, filePath2) => {
  const data1 = fs.readFileSync(filePath1, 'utf8');
  const data2 = fs.readFileSync(filePath2, 'utf8');
  const ext1 = path.extname(filePath1);
  const ext2 = path.extname(filePath2);

  const obj1 = parseData(ext1, data1);
  const obj2 = parseData(ext2, data2);

  const result = _.union(_.keys(obj1), _.keys(obj2))
    .map(key => buildRow(key, obj1, obj2))
    .join('\n');
  return `{\n${result}\n}`;
};

export default genDiff;
