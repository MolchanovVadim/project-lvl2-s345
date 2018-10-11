import yaml from 'js-yaml';
import ini from 'ini';

const parse = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

export default (ext, data) => parse[ext](data);
