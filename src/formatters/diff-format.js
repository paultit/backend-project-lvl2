import { flatten, isObject } from 'lodash';

const buildTree = (object, depth) => {
  const space = '    '.repeat(depth);
  const keys = Object.keys(object);
  const result = keys.map((key) => {
    const value = (isObject(object[key])) ? buildTree(object[key], depth + 1) : object[key];
    return `${space}    ${key}: ${value}`;
  });
  return `{\n${result.join('\n')}\n${space}}`;
};

const stringify = (value, depth) => (isObject(value) ? buildTree(value, depth) : value);

const render = (ast, depth = 0) => {
  const space = '    '.repeat(depth);
  const result = flatten(ast.map((value) => {
    switch (value.type) {
      case 'object':
        return `${space}    ${value.key}: ${render(value.children, depth + 1)}`;
      case 'added':
        return `${space}  + ${value.key}: ${stringify(value.newValue, depth + 1)}`;
      case 'deleted':
        return `${space}  - ${value.key}: ${stringify(value.newValue, depth + 1)}`;
      case 'changed':
        return [`${space}  + ${value.key}: ${stringify(value.newValue, depth + 1)}`,
          `${space}  - ${value.key}: ${stringify(value.oldValue, depth + 1)}`];
      case 'unchanged':
        return `${space}    ${value.key}: ${stringify(value.newValue, depth + 1)}`;
      default:
        throw new Error(`Unknown type ${value.type}`);
    }
  }));
  return `{\n${result.join('\n')}\n${space}}`;
};
export default render;
