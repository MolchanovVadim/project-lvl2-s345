import renderCurly from './renderCurly';
import renderPlain from './renderPlain';

const render = {
  curly: renderCurly,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (format, ast) => render[format](ast);
