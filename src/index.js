import fs from 'fs';
import path from 'path';
import { has } from 'lodash';

const genDiff = (pathToFileBefore, pathToFileAfter) => {
  const contentFileBefore = JSON.parse(fs.readFileSync(path.resolve(pathToFileBefore), 'utf8'));
  const contentFileAfter = JSON.parse(fs.readFileSync(path.resolve(pathToFileAfter), 'utf8'));
  const fileKeys = Object.keys({ ...contentFileBefore, ...contentFileAfter });
  const result = fileKeys.reduce((acc, key) => {
    if (contentFileAfter[key] === contentFileBefore[key]) {
      return `${acc}  ${key}: ${contentFileAfter[key]}\n`;
    } if (!has(contentFileBefore, key)) {
      return `${acc}  +${key}: ${contentFileAfter[key]}\n`;
    } if (!has(contentFileAfter, key)) {
      return `${acc}  -${key}: ${contentFileBefore[key]}\n`;
    }
    return `${acc}  +${key}: ${contentFileAfter[key]}\n  -${key}: ${contentFileBefore[key]}\n`;
  }, '');
  return `{\n${result}}`;
};

export default genDiff;
