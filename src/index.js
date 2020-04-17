import fs from 'fs';
import path from 'path';
import { has } from 'lodash';
import parser from './parsers';

const genDiff = (fileBefore, fileAfter) => {
  const extFileBefore = path.extname(fileBefore);
  const extFileAfter = path.extname(fileAfter);
  if (!(extFileBefore in parser) || !(extFileAfter in parser)) {
    throw new Error('Format is not valid');
  }
  const contentFileBefore = parser[extFileBefore](fs.readFileSync(path.resolve(fileBefore), 'utf8'));
  const contentFileAfter = parser[extFileAfter](fs.readFileSync(path.resolve(fileAfter), 'utf8'));
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
