import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return value;
};

const getRaw = (keys, value) => `Property '${keys.join('.')}' was ${value}`;

const propertyPlain = {
  removed: (node, keys) => getRaw(keys, 'removed'),
  added: (node, keys) => getRaw(keys, `added with value: ${getValue(node.valueAfter)}`),
  nested: (node, keys, iter) => _.flatten(iter(node.children, keys)),
  changed: (node, keys) => getRaw(keys, `updated. From ${getValue(node.valueBefore)} to ${getValue(node.valueAfter)}`),
};

const renderPlain = (listNodes) => {
  const iter = (nodes, keys) => nodes.filter(node => node.type !== 'unchanged').map(
    node => propertyPlain[node.type](node, [...keys, node.key], iter),
  );
  return _.flatten(iter(listNodes, '')).filter(raw => raw).join('\n');
};

export default renderPlain;
