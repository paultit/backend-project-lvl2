import fs from 'fs';
import path from 'path';
import parser from './parsers';
import render from './formatters';
import buildAst from './ast';

const genDiff = (fileBefore, fileAfter, format = 'diff') => {
  const extFileBefore = path.extname(fileBefore);
  const extFileAfter = path.extname(fileAfter);
  if (extFileBefore !== extFileAfter) {
    throw new Error('Formats are not equal');
  }
  const contentFileBefore = parser[extFileBefore](fs.readFileSync(path.resolve(fileBefore), 'utf8'));
  const contentFileAfter = parser[extFileAfter](fs.readFileSync(path.resolve(fileAfter), 'utf8'));
  return render(buildAst(contentFileBefore, contentFileAfter), format);
};
export default genDiff;
