import yaml from 'js-yaml';
import ini from 'ini';

const parseIni = (data) => {
  const parserData = ini.parse(data);
  return JSON.parse(Object.keys(parserData).join('\n'));
};

const parse = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': parseIni,
};

export default (ext, data) => parse[ext](data);
