import fs from 'fs';
import path from 'path';
import parser from './parsers';
import ast from './ast';

export default (fileBefore, fileAfter) => {
  const extFileBefore = path.extname(fileBefore);
  const extFileAfter = path.extname(fileAfter);
  if (!(extFileBefore in parser) || !(extFileAfter in parser)) {
    throw new Error('Format is not valid');
  }
  const contentFileBefore = parser[extFileBefore](fs.readFileSync(path.resolve(fileBefore), 'utf8'));
  const contentFileAfter = parser[extFileAfter](fs.readFileSync(path.resolve(fileAfter), 'utf8'));

  return ast(contentFileBefore, contentFileAfter);
};
