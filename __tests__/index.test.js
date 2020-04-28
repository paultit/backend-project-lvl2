import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixuturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const resultAst = (result) => fs.readFileSync(getFixuturePath(result), 'utf-8').trim();

test('compare json files', () => {
  expect(genDiff(getFixuturePath('before.json'), getFixuturePath('after.json')))
    .toBe(resultAst('result.txt'));
});

test('compare files yaml', () => {
  expect(genDiff(getFixuturePath('before.yaml'), getFixuturePath('after.yaml')))
    .toBe(resultAst('result.txt'));
});

test('compare files ini', () => {
  expect(genDiff(getFixuturePath('before.ini'), getFixuturePath('after.ini')))
    .toBe(resultAst('result.txt'));
});

test('compare json, ini, yml nested files default format', () => {
  expect(genDiff(getFixuturePath('before-nested.json'), getFixuturePath('after-nested.json')))
    .toBe(resultAst('result-nested.txt'));
  expect(genDiff(getFixuturePath('before-nested.yaml'), getFixuturePath('after-nested.yaml')))
    .toBe(resultAst('result-nested.txt'));
  expect(genDiff(getFixuturePath('before-nested.ini'), getFixuturePath('after-nested.ini')))
    .toBe(resultAst('result-nested.txt'));
});

test('compare json, ini, yml nested files plain format', () => {
  expect(genDiff(getFixuturePath('before-nested.json'), getFixuturePath('after-nested.json'), 'plain'))
    .toBe(resultAst('result-nested-plain.txt'));
  expect(genDiff(getFixuturePath('before-nested.yaml'), getFixuturePath('after-nested.yaml'), 'plain'))
    .toBe(resultAst('result-nested-plain.txt'));
  expect(genDiff(getFixuturePath('before-nested.ini'), getFixuturePath('after-nested.ini'), 'plain'))
    .toBe(resultAst('result-nested-plain.txt'));
});
