import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readDataDiffFile = (diffFileName) => fs.readFileSync(getFixturePath(diffFileName), 'utf-8').trim();

describe('', () => {
  test.each([
    ['json', 'plain'],
    ['yaml', 'plain'],
    ['ini', 'plain'],
    ['json', 'json'],
    ['yaml', 'json'],
    ['ini', 'json'],
    ['json', 'diff'],
    ['yaml', 'diff'],
    ['ini', 'diff'],
  ])('Compare files', (extension, format) => {
    const expected = readDataDiffFile(`result-nested-${format}.txt`);
    const dataBefore = getFixturePath(`before-nested.${extension}`);
    const dataAfter = getFixturePath(`after-nested.${extension}`);
    const actual = genDiff(dataBefore, dataAfter, format);
    expect(actual).toEqual(expected);
  });
});
