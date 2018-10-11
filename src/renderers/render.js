import _ from 'lodash';

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
      const renderBefore = _.isObject(node.valueBefore)
        ? [`${' '.repeat(level * 4)}  ${propertyRender.changedBefore} ${key}: {`,
          ...renderValue(node.valueBefore, level + 1), `${' '.repeat(level * 4)}    }`]
        : [`${' '.repeat(level * 4)}  ${propertyRender.changedBefore} ${key}: ${node.valueBefore}`];

      const renderAfter = _.isObject(node.valueAfter)
        ? [`${' '.repeat(level * 4)}  ${propertyRender.changedAfter} ${key}: {`,
          ...renderValue(node.valueAfter, level + 1), `${' '.repeat(level * 4)}    }`]
        : [`${' '.repeat(level * 4)}  ${propertyRender.changedAfter} ${key}: ${node.valueAfter}`];

      return _.flatten([...renderBefore, ...renderAfter]);
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

export default render;
