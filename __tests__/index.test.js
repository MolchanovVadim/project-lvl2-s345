import fs from 'fs';
import genDiff from '../src';

const getResult = filePath => fs.readFileSync(filePath, 'utf8');

test('gen diff json', () => {
  const pathFile1 = '__tests__/__fixtures__/before.json';
  const pathFile2 = '__tests__/__fixtures__/after.json';
  const pathFileRes = '__tests__/__fixtures__/result1';

  expect(genDiff(pathFile1, pathFile2))
    .toBe(getResult(pathFileRes));
});

test('gen diff yml', () => {
  const pathFile1 = '__tests__/__fixtures__/before.yml';
  const pathFile2 = '__tests__/__fixtures__/after.yml';
  const pathFileRes = '__tests__/__fixtures__/result1';

  expect(genDiff(pathFile1, pathFile2))
    .toBe(getResult(pathFileRes));
});

test('gen diff ini', () => {
  const pathFile1 = '__tests__/__fixtures__/before.ini';
  const pathFile2 = '__tests__/__fixtures__/after.ini';
  const pathFileRes = '__tests__/__fixtures__/result1';

  expect(genDiff(pathFile1, pathFile2))
    .toBe(getResult(pathFileRes));
});