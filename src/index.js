import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseData from './parsers';
import render from './renderers';

export const parse = (obj1, obj2) => {
  const buildNode = (key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return {
        key, valueBefore: obj1[key], type: 'removed',
      };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        key, valueAfter: obj2[key], type: 'added',
      };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key, type: 'nested', children: parse(obj1[key], obj2[key]),
      };
    }
    if (obj1[key] === obj2[key]) {
      return {
        key, valueBefore: obj1[key], type: 'unchanged',
      };
    }
    return {
      key, valueBefore: obj1[key], valueAfter: obj2[key], type: 'changed',
    };
  };

  return _.union(_.keys(obj1), _.keys(obj2))
    .map(key => buildNode(key));
};

const genDiff = (filePath1, filePath2, options) => {
  const data1 = fs.readFileSync(filePath1, 'utf8');
  const data2 = fs.readFileSync(filePath2, 'utf8');
  const ext1 = path.extname(filePath1);
  const ext2 = path.extname(filePath2);

  const obj1 = parseData(ext1, data1);
  const obj2 = parseData(ext2, data2);

  return render(options.format, parse(obj1, obj2));
};

export default genDiff;
