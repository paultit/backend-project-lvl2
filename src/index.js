import fs from 'fs';
import path from 'path';
import parser from './parsers';
import render from './formatters';
import buildAst from './ast';

const genDiff = (fileBefore, fileAfter, format = 'diff') => {
  const extFileBefore = path.extname(fileBefore).slice(1);
  const extFileAfter = path.extname(fileAfter).slice(1);
  const contentFileBefore = parser(fs.readFileSync(path.resolve(fileBefore), 'utf8'), extFileBefore);
  const contentFileAfter = parser(fs.readFileSync(path.resolve(fileAfter), 'utf8'), extFileAfter);
  return render(buildAst(contentFileBefore, contentFileAfter), format);
};
export default genDiff;
