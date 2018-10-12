import renderDefault from './renderMain';
import renderPlain from './renderPlain';

const render = {
  default: renderDefault,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (format, ast) => render[format](ast);
