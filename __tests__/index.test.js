import fs from 'fs';
import genDiff from '../src';

const getResult = filePath => fs.readFileSync(filePath, 'utf8');

test('gen diff json', () => {
  const pathFile1 = '__tests__/__fixtures__/before.json';
  const pathFile2 = '__tests__/__fixtures__/after.json';
  const pathFileRes = '__tests__/__fixtures__/result1';

  expect(genDiff(pathFile1, pathFile2, { format: 'curly' }))
    .toBe(getResult(pathFileRes));
});

test('gen diff yml', () => {
  const pathFile1 = '__tests__/__fixtures__/before.yml';
  const pathFile2 = '__tests__/__fixtures__/after.yml';
  const pathFileRes = '__tests__/__fixtures__/result1';

  expect(genDiff(pathFile1, pathFile2, { format: 'curly' }))
    .toBe(getResult(pathFileRes));
});

test('gen diff ini', () => {
  const pathFile1 = '__tests__/__fixtures__/before.ini';
  const pathFile2 = '__tests__/__fixtures__/after.ini';
  const pathFileRes = '__tests__/__fixtures__/result1';

  expect(genDiff(pathFile1, pathFile2, { format: 'curly' }))
    .toBe(getResult(pathFileRes));
});

test('gen diff json 2', () => {
  const pathFile1 = '__tests__/__fixtures__/before2.json';
  const pathFile2 = '__tests__/__fixtures__/after2.json';
  const pathFileRes = '__tests__/__fixtures__/result2';

  expect(genDiff(pathFile1, pathFile2, { format: 'curly' }))
    .toBe(getResult(pathFileRes));
});

test('gen diff yml 2', () => {
  const pathFile1 = '__tests__/__fixtures__/before2.yml';
  const pathFile2 = '__tests__/__fixtures__/after2.yml';
  const pathFileRes = '__tests__/__fixtures__/result2';

  expect(genDiff(pathFile1, pathFile2, { format: 'curly' }))
    .toBe(getResult(pathFileRes));
});

test('gen diff ini 2', () => {
  const pathFile1 = '__tests__/__fixtures__/before2.ini';
  const pathFile2 = '__tests__/__fixtures__/after2.ini';
  const pathFileRes = '__tests__/__fixtures__/result2';

  expect(genDiff(pathFile1, pathFile2, { format: 'curly' }))
    .toBe(getResult(pathFileRes));
});

test('gen diff json 3 plain', () => {
  const pathFile1 = '__tests__/__fixtures__/before2.json';
  const pathFile2 = '__tests__/__fixtures__/after2.json';
  const pathFileRes = '__tests__/__fixtures__/result3';

  expect(genDiff(pathFile1, pathFile2, { format: 'plain' }))
    .toBe(getResult(pathFileRes));
});

test('gen diff yml 3 plain', () => {
  const pathFile1 = '__tests__/__fixtures__/before2.yml';
  const pathFile2 = '__tests__/__fixtures__/after2.yml';
  const pathFileRes = '__tests__/__fixtures__/result3';

  expect(genDiff(pathFile1, pathFile2, { format: 'plain' }))
    .toBe(getResult(pathFileRes));
});

test('gen diff ini 3 plain', () => {
  const pathFile1 = '__tests__/__fixtures__/before2.ini';
  const pathFile2 = '__tests__/__fixtures__/after2.ini';
  const pathFileRes = '__tests__/__fixtures__/result3';

  expect(genDiff(pathFile1, pathFile2, { format: 'plain' }))
    .toBe(getResult(pathFileRes));
});

test('gen diff ini 4 json', () => {
  const pathFile1 = '__tests__/__fixtures__/before.json';
  const pathFile2 = '__tests__/__fixtures__/after.json';
  const pathFileRes = '__tests__/__fixtures__/result4';

  expect(genDiff(pathFile1, pathFile2, { format: 'json' }))
    .toBe(getResult(pathFileRes));
});
