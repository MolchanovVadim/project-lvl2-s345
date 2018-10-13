import _ from 'lodash';

const tab = level => `${' '.repeat(level * 4)}`;

const renderNode = (key, value, level, prefix) => {
  if (!_.isObject(value)) return [`${tab(level)}  ${prefix} ${key}: ${value}`];
  return [`${tab(level)}  ${prefix} ${key}: {`,
    ...Object.keys(value).map(keyObj => renderNode(keyObj, value[keyObj], level + 1, ' ')),
    `${tab(level)}    }`];
};

const fnRender = {
  removed: (node, level) => renderNode(node.key, node.valueBefore, level, '-'),
  added: (node, level) => renderNode(node.key, node.valueAfter, level, '+'),
  unchanged: (node, level) => renderNode(node.key, node.valueBefore, level, ' '),
  nested: (node, level, iter) => [`${tab(level)}    ${node.key}: {`,
    ...iter(node.children, level + 1), `${tab(level)}    }`],
  changed: (node, level) => [...fnRender.removed(node, level),
    ...fnRender.added(node, level)],
};

export default (listNodes) => {
  const iter = (nodes, level = 0) => _.flattenDeep(nodes.map(
    node => fnRender[node.type](node, level, iter),
  ));
  const result = iter(listNodes);
  return `{\n${result.join('\n')}\n}`;
};
