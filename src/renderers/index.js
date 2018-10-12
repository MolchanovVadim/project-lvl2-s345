import renderDefault from './renderDefault';
import renderPlain from './renderPlain';

const render = {
  default: renderDefault,
  plain: renderPlain,
};

export default (format, ast) => render[format](ast);
