import _ from 'lodash';

const getValue = value => (_.isObject(value) ? '[complex value]' : value);

const propertyPlain = {
  removed: (node, keys) => `Property '${keys.join('.')}' was removed`,
  added: (node, keys) => `Property '${keys.join('.')}' was added with value: ${getValue(node.valueAfter)}`,
  nested: (node, keys, iter) => _.flatten(iter(node.children, keys)),
  changed: (node, keys) => `Property '${keys.join('.')}' was updated. From ${getValue(node.valueBefore)} to ${getValue(node.valueAfter)}`,
};

export default (listNodes) => {
  const iter = (nodes, keys) => nodes.filter(node => node.type !== 'unchanged').map(
    node => propertyPlain[node.type](node, [...keys, node.key], iter),
  );
  return _.flatten(iter(listNodes, '')).filter(raw => raw).join('\n');
};
