import _ from 'lodash';

const renderValue = (node, level) => Object.keys(node).map((key) => {
  if (!_.isObject(node[key])) return `${' '.repeat(level * 4)}    ${key}: ${node[key]}`;
  return [`${' '.repeat(level * 4)}    ${key}: {`,
    ...renderValue(Object.keys(node[key]), level + 1),
    `${' '.repeat(level * 4)}    }`];
});

const fnRender = {
  removed: (node, level) => {
    if (_.isObject(node.valueBefore)) {
      return [`${' '.repeat(level * 4)}  - ${node.key}: {`,
        ...renderValue(node.valueBefore, level + 1), `${' '.repeat(level * 4)}    }`];
    }
    return `${' '.repeat(level * 4)}  - ${node.key}: ${node.valueBefore}`;
  },
  added: (node, level) => {
    if (_.isObject(node.valueAfter)) {
      return [`${' '.repeat(level * 4)}  + ${node.key}: {`,
        ...renderValue(node.valueAfter, level + 1), `${' '.repeat(level * 4)}    }`];
    }
    return `${' '.repeat(level * 4)}  + ${node.key}: ${node.valueAfter}`;
  },
  unchanged: (node, level) => {
    if (_.isObject(node.valueBefore)) {
      return [`${' '.repeat(level * 4)}    ${node.key}: {`,
        ...renderValue(node.valueBefore, level + 1), `${' '.repeat(level * 4)}    }`];
    }
    return `${' '.repeat(level * 4)}    ${node.key}: ${node.valueBefore}`;
  },
  nested: (node, level, iter) => [`${' '.repeat(level * 4)}    ${node.key}: {`,
    ...iter(node.children, level + 1),
    `${' '.repeat(level * 4)}    }`],
  changed: (node, level) => {
    const renderBefore = _.isObject(node.valueBefore)
      ? [`${' '.repeat(level * 4)}  - ${node.key}: {`,
        ...renderValue(node.valueBefore, level + 1), `${' '.repeat(level * 4)}    }`]
      : [`${' '.repeat(level * 4)}  - ${node.key}: ${node.valueBefore}`];

    const renderAfter = _.isObject(node.valueAfter)
      ? [`${' '.repeat(level * 4)}  + ${node.key}: {`,
        ...renderValue(node.valueAfter, level + 1), `${' '.repeat(level * 4)}    }`]
      : [`${' '.repeat(level * 4)}  + ${node.key}: ${node.valueAfter}`];

    return _.flatten([...renderBefore, ...renderAfter]);
  },
};

const render = (listNodes) => {
  const iter = (nodes, level = 0) => _.flatten(nodes.map(
    node => fnRender[node.type](node, level, iter),
  ));
  const result = iter(listNodes);
  return `{\n${result.join('\n')}\n}`;
};

export default render;
