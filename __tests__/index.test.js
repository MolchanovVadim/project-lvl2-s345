import fs from 'fs';
import genDiff from '../src';

const getResult = filePath => fs.readFileSync(filePath, 'utf8');

test('gen diff', () => {
  const pathFile1 = '__tests__/__fixtures__/before.json';
  const pathFile2 = '__tests__/__fixtures__/after.json';
  const pathFileRes = '__tests__/__fixtures__/result1';
  
  expect(genDiff(pathFile1, pathFile2))
    .toBe(getResult(pathFileRes));
});
