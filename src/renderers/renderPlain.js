import _ from 'lodash';

const propertyPlain = {
  removed: (node, keys) => `Property '${keys.join('.')}' was removed`,
  added: (node, keys) => `Property '${keys.join('.')}' was added with value: ${_.isObject(node.value) ? '[complex value]' : node.value}`,
  unchanged: () => '',
  changed: (node, keys) => `Property '${keys.join('.')}' was updated. From ${_.isObject(node.valueBefore) ? '[complex value]' : node.valueBefore} to ${_.isObject(node.valueAfter) ? '[complex value]' : node.valueAfter}`,
};

const renderPlain = (listNodes) => {
  const iter = (nodes, keys) => nodes.map((node) => {
    if (node.children.length > 0) {
      return _.flatten(iter(node.children, [...keys, node.key]));
    }
    return propertyPlain[node.type](node, [...keys, node.key]);
  });
  return _.flatten(iter(listNodes, '')).filter(raw => raw).join('\n');
};

export default renderPlain;
