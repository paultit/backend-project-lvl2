import { isObject } from 'lodash';

const space = '    ';
const makeIndent = (spacesCount) => space.repeat(spacesCount);

const buildTree = (object, depth) => {
  const keys = Object.keys(object);
  const result = keys.map((key) => {
    const value = (isObject(object[key])) ? buildTree(object[key], depth + 1) : object[key];
    return `${makeIndent(depth)}    ${key}: ${value}`;
  });
  return `{\n${result.join('\n')}\n${makeIndent(depth)}}`;
};

const stringify = (value, depth) => (isObject(value) ? buildTree(value, depth) : value);

const render = (ast, depth = 0) => {
  const result = ast.map((value) => {
    switch (value.type) {
      case 'object':
        return `${makeIndent(depth)}    ${value.key}: ${render(value.children, depth + 1)}`;
      case 'added':
        return `${makeIndent(depth)}  + ${value.key}: ${stringify(value.newValue, depth + 1)}`;
      case 'deleted':
        return `${makeIndent(depth)}  - ${value.key}: ${stringify(value.newValue, depth + 1)}`;
      case 'changed':
        return [`${makeIndent(depth)}  + ${value.key}: ${stringify(value.newValue, depth + 1)}`,
          `${makeIndent(depth)}  - ${value.key}: ${stringify(value.oldValue, depth + 1)}`];
      case 'unchanged':
        return `${makeIndent(depth)}    ${value.key}: ${stringify(value.newValue, depth + 1)}`;
      default:
        throw new Error(`Unknown type ${value.type}`);
    }
  });
  return `{\n${result.flat().join('\n')}\n${makeIndent(depth)}}`;
};
export default render;
