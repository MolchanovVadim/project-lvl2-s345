import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseData from './parsers';

export const parse = (obj1, obj2) => {
  const buildNode = (key) => {
    const node = {
      key,
      children: [],
    };
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      node.value = obj1[key];
      node.type = 'removed';
    } else if (!_.has(obj1, key) && _.has(obj2, key)) {
      node.value = obj2[key];
      node.type = 'added';
    } else if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      node.type = 'unchanged';
      node.children = parse(obj1[key], obj2[key]);
    } else if (obj1[key] === obj2[key]) {
      node.type = 'unchanged';
      node.value = obj1[key];
    } else {
      node.type = 'changed';
      node.valueBefore = obj1[key];
      node.valueAfter = obj2[key];
    }
    return node;
  };

  return _.union(_.keys(obj1), _.keys(obj2))
    .map(key => buildNode(key));
};

const propertyRender = {
  removed: '-',
  added: '+',
  unchanged: ' ',
  changedBefore: '-',
  changedAfter: '+',
};

const renderValue = (node, level) => Object.keys(node).map((key) => {
  if (_.isObject(node[key])) {
    return [`${' '.repeat(level * 4)}    ${key}: {`,
      ...renderValue(Object.keys(node[key]), level + 1),
      `${' '.repeat(level * 4)}    }`];
  }
  return `${' '.repeat(level * 4)}    ${key}: ${node[key]}`;
});

const render = (listNodes) => {
  const iter = (nodes, level = 0) => _.flatten(nodes.map((node) => {
    const {
      key,
      type,
      children,
    } = node;
    if (children.length > 0) {
      return [`${' '.repeat(level * 4)}  ${propertyRender[type]} ${key}: {`,
        ...iter(children, level + 1),
        `${' '.repeat(level * 4)}    }`];
    }
    if (type === 'changed') {
      const renderChanged = [];
      if (_.isObject(node.valueBefore)) {
        renderChanged.push([`${' '.repeat(level * 4)}  ${propertyRender.changedBefore} ${key}: {`,
          ...renderValue(node.valueBefore, level + 1), `${' '.repeat(level * 4)}    }`]);
      } else {
        renderChanged.push(`${' '.repeat(level * 4)}  ${propertyRender.changedBefore} ${key}: ${node.valueBefore}`);
      }
      if (_.isObject(node.valueAfter)) {
        renderChanged.push([`${' '.repeat(level * 4)}  ${propertyRender.changedAfter} ${key}: {`,
          ...renderValue(node.valueAfter, level + 1), `${' '.repeat(level * 4)}    }`]);
      } else {
        renderChanged.push(`${' '.repeat(level * 4)}  ${propertyRender.changedAfter} ${key}: ${node.valueAfter}`);
      }
      return _.flatten(renderChanged);
    }
    if (_.isObject(node.value)) {
      return [`${' '.repeat(level * 4)}  ${propertyRender[type]} ${key}: {`,
        ...renderValue(node.value, level + 1), `${' '.repeat(level * 4)}    }`];
    }
    return `${' '.repeat(level * 4)}  ${propertyRender[type]} ${key}: ${node.value}`;
  }));

  const result = iter(listNodes);

  return `{\n${result.join('\n')}\n}`;
};

const genDiff = (filePath1, filePath2) => {
  const data1 = fs.readFileSync(filePath1, 'utf8');
  const data2 = fs.readFileSync(filePath2, 'utf8');
  const ext1 = path.extname(filePath1);
  const ext2 = path.extname(filePath2);

  const obj1 = parseData(ext1, data1);
  const obj2 = parseData(ext2, data2);

  return render(parse(obj1, obj2));
};

export default genDiff;
