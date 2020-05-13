import { isObject, isString } from 'lodash';

const stringifyPlain = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const render = (ast, root = '') => {
  const result = ast.map((value) => {
    const path = root === '' ? value.key : `${root}.${value.key}`;
    switch (value.type) {
      case 'object':
        return render(value.children, path);
      case 'added':
        return `Property '${path}' was added with value: ${stringifyPlain(value.newValue)}`;
      case 'deleted':
        return `Property '${path}' was deleted`;
      case 'changed':
        return `Property '${path}' was changed from ${stringifyPlain(value.oldValue)} to ${stringifyPlain(value.newValue)}`;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown type ${value.type}`);
    }
  });
  return result.filter((item) => item !== null).join('\n');
};

export default render;
