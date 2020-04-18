import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixuturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const afterJson = getFixuturePath('after.json');
const beforeJson = getFixuturePath('before.json');
const afterYaml = getFixuturePath('after.yaml');
const beforeYaml = getFixuturePath('before.yaml');
const afterIni = getFixuturePath('after.ini');
const beforeIni = getFixuturePath('before.ini');
const diffBeforeToAfter = fs.readFileSync(getFixuturePath('result.txt'), 'utf-8');

test('json', () => {
  expect(genDiff(beforeJson, afterJson)).toEqual(diffBeforeToAfter);
});

test('yaml', () => {
  expect(genDiff(beforeYaml, afterYaml)).toEqual(diffBeforeToAfter);
});

test('ini', () => {
  expect(genDiff(beforeIni, afterIni)).toEqual(diffBeforeToAfter);
});
