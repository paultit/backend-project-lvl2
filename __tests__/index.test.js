import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixuturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readDataDiffFile = (diffFileName) => fs.readFileSync(getFixuturePath(diffFileName), 'utf-8').trim();

describe('', () => {
  test.each([[getFixuturePath('before-nested.json'), getFixuturePath('after-nested.json')],
    [getFixuturePath('before-nested.yaml'), getFixuturePath('after-nested.yaml')],
    [getFixuturePath('before-nested.ini'), getFixuturePath('after-nested.ini')],
  ])('Compare files', (dataBefore, dataAfter) => {
    expect(genDiff(dataBefore, dataAfter)).toEqual(readDataDiffFile('result-nested.txt'));
    expect(genDiff(dataBefore, dataAfter, 'plain')).toEqual(readDataDiffFile('result-nested-plain.txt'));
    expect(genDiff(dataBefore, dataAfter, 'json')).toEqual(readDataDiffFile('result-nested-json.txt'));
  });
});
