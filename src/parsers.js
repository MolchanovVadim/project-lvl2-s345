import yaml from 'js-yaml';

const parse = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
};

export default (ext, data) => parse[ext](data);
