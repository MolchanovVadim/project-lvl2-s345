import _ from 'lodash';

const tab = level => `${' '.repeat(level * 4)}`;

const renderNode = (key, value, level, prefix) => {
  if (_.isObject(value)) {
    return [`${tab(level)}  ${prefix} ${key}: {`,
      ..._.flatten(Object.keys(value).map(keyObj => renderNode(keyObj, value[keyObj], level + 1, ' '))),
      `${tab(level)}    }`];
  }
  return [`${tab(level)}  ${prefix} ${key}: ${value}`];
};

const fnRender = {
  removed: (node, level) => renderNode(node.key, node.valueBefore, level, '-'),
  added: (node, level) => renderNode(node.key, node.valueAfter, level, '+'),
  unchanged: (node, level) => renderNode(node.key, node.valueBefore, level, ' '),
  nested: (node, level, iter) => [`${tab(level)}    ${node.key}: {`,
    ...iter(node.children, level + 1), `${tab(level)}    }`],
  changed: (node, level) => _.flatten([...fnRender.removed(node, level),
    ...fnRender.added(node, level)]),
};

const render = (listNodes) => {
  const iter = (nodes, level = 0) => _.flatten(nodes.map(
    node => fnRender[node.type](node, level, iter),
  ));
  const result = iter(listNodes);
  return `{\n${result.join('\n')}\n}`;
};

export default render;
