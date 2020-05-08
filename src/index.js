import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './formatters';
import buildAst from './ast';

const genDiff = (pathToFileBefore, pathToFileAfter, format = 'diff') => {
  const extFileBefore = path.extname(pathToFileBefore).slice(1);
  const extFileAfter = path.extname(pathToFileAfter).slice(1);
  const contentBefore = parse(fs.readFileSync(path.resolve(pathToFileBefore), 'utf8'), extFileBefore);
  const contentAfter = parse(fs.readFileSync(path.resolve(pathToFileAfter), 'utf8'), extFileAfter);
  return render(buildAst(contentBefore, contentAfter), format);
};
export default genDiff;
