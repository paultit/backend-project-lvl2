import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixuturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readDataDiffFile = (diffFileName) => fs.readFileSync(getFixuturePath(diffFileName), 'utf-8').trim();
const afterJson = getFixuturePath('after-nested.json');
const beforeJson = getFixuturePath('before-nested.json');
const afterYaml = getFixuturePath('after-nested.yaml');
const beforeYaml = getFixuturePath('before-nested.yaml');
const afterIni = getFixuturePath('after-nested.ini');
const beforeIni = getFixuturePath('before-nested.ini');

describe('', () => {
  test.each([[beforeJson, afterJson],
    [beforeYaml, afterYaml],
    [beforeIni, afterIni],
  ])('Compare files', (dataBefore, dataAfter) => {
    expect(genDiff(dataBefore, dataAfter)).toEqual(readDataDiffFile('result-nested.txt'));
    expect(genDiff(dataBefore, dataAfter, 'plain')).toEqual(readDataDiffFile('result-nested-plain.txt'));
    expect(genDiff(dataBefore, dataAfter, 'json')).toEqual(readDataDiffFile('result-nested-json.txt'));
  });
});
