import _ from 'lodash';

const propertyPlain = {
  removed: (node, keys) => `Property '${keys.join('.')}' was removed`,
  added: (node, keys) => `Property '${keys.join('.')}' was added with value: ${_.isObject(node.valueAfter) ? '[complex value]' : node.valueAfter}`,
  nested: (node, keys, iter) => _.flatten(iter(node.children, keys)),
  changed: (node, keys) => `Property '${keys.join('.')}' was updated. From ${_.isObject(node.valueBefore) ? '[complex value]' : node.valueBefore} to ${_.isObject(node.valueAfter) ? '[complex value]' : node.valueAfter}`,
};

const renderPlain = (listNodes) => {
  const iter = (nodes, keys) => nodes.filter(node => node.type !== 'unchanged').map(
    node => propertyPlain[node.type](node, [...keys, node.key], iter),
  );
  return _.flatten(iter(listNodes, '')).filter(raw => raw).join('\n');
};

export default renderPlain;
