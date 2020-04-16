import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixuturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const afterJson = getFixuturePath('after.json');
const beforeJson = getFixuturePath('before.json');
const diffAfterToBefore = fs.readFileSync(getFixuturePath('resultJson.txt'), 'utf-8');

test('gendiff', () => {
  expect(genDiff(beforeJson, afterJson)).toEqual(diffAfterToBefore);
});
