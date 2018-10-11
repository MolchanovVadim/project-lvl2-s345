import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseData from './parsers';
import render from './renderers/render';
import renderPlain from './renderers/renderPlain';

export const parse = (obj1, obj2) => {
  const buildNode = (key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return {
        key, value: obj1[key], type: 'removed', children: [],
      };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        key, value: obj2[key], type: 'added', children: [],
      };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key, type: 'unchanged', children: parse(obj1[key], obj2[key]),
      };
    }
    if (obj1[key] === obj2[key]) {
      return {
        key, value: obj1[key], type: 'unchanged', children: [],
      };
    }
    return {
      key, valueBefore: obj1[key], valueAfter: obj2[key], type: 'changed', children: [],
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

  if (options.format === 'json') return render(parse(obj1, obj2));
  if (options.format === 'plain') return renderPlain(parse(obj1, obj2));
  return 'this format is not supported';
};

export default genDiff;
