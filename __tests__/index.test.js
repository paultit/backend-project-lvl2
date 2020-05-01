import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixuturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const readDataDiffFile = (diffFileName) => fs.readFileSync(getFixuturePath(diffFileName), 'utf-8').trim();

test('compare json, ini, yml nested files default format', () => {
  expect(genDiff(getFixuturePath('before-nested.json'), getFixuturePath('after-nested.json')))
    .toBe(readDataDiffFile('result-nested.txt'));
  expect(genDiff(getFixuturePath('before-nested.yaml'), getFixuturePath('after-nested.yaml')))
    .toBe(readDataDiffFile('result-nested.txt'));
  expect(genDiff(getFixuturePath('before-nested.ini'), getFixuturePath('after-nested.ini')))
    .toBe(readDataDiffFile('result-nested.txt'));
});

test('compare json, ini, yml nested files plain format', () => {
  expect(genDiff(getFixuturePath('before-nested.json'), getFixuturePath('after-nested.json'), 'plain'))
    .toBe(readDataDiffFile('result-nested-plain.txt'));
  expect(genDiff(getFixuturePath('before-nested.yaml'), getFixuturePath('after-nested.yaml'), 'plain'))
    .toBe(readDataDiffFile('result-nested-plain.txt'));
  expect(genDiff(getFixuturePath('before-nested.ini'), getFixuturePath('after-nested.ini'), 'plain'))
    .toBe(readDataDiffFile('result-nested-plain.txt'));
});

test('compare json, ini, yml nested files json format', () => {
  expect(genDiff(getFixuturePath('before-nested.json'), getFixuturePath('after-nested.json'), 'json'))
    .toBe(readDataDiffFile('result-nested-json.txt'));
  expect(genDiff(getFixuturePath('before-nested.yaml'), getFixuturePath('after-nested.yaml'), 'json'))
    .toBe(readDataDiffFile('result-nested-json.txt'));
  expect(genDiff(getFixuturePath('before-nested.ini'), getFixuturePath('after-nested.ini'), 'json'))
    .toBe(readDataDiffFile('result-nested-json.txt'));
});
