import { has, union } from 'lodash';

const isObject = (...file) => file.every((el) => typeof el === 'object');
const genDiff = (fileBefore, fileAfter) => {
  const iter = (before, after, count) => {
    const fileKeys = union(Object.keys(before), Object.keys(after));
    const space = ' '.repeat(count);
    const step = 4;
    const dif = fileKeys.map((key) => {
      const beforeValue = before[key];
      const afterValue = after[key];
      if (!has(before, key)) {
        if (isObject(afterValue)) {
          return { type: 'add', name: key, value: iter(afterValue, afterValue, count + step) };
        }
        return { type: 'add', name: key, value: afterValue };
      }
      if (!has(after, key)) {
        if (isObject(beforeValue)) {
          return { type: 'delete', name: key, value: iter(beforeValue, beforeValue, count + step) };
        }
        return { type: 'delete', name: key, value: beforeValue };
      }
      if (beforeValue !== afterValue) {
        if (isObject(afterValue, beforeValue)) {
          return {
            type: 'changed', valueIsObject: true, name: key, children: iter(beforeValue, afterValue, count + step),
          };
        }
        if (isObject(beforeValue)) {
          return { type: 'changed', name: key, value: [afterValue, iter(beforeValue, beforeValue, count + step)] };
        }
        if (isObject(afterValue)) {
          return { type: 'changed', name: key, value: [iter(afterValue, afterValue, count + step), beforeValue] };
        }
        return { type: 'changed', name: key, value: [afterValue, beforeValue] };
      }
      return { type: 'unchanged', name: key, value: afterValue };
    });
    const render = ({
      type, valueIsObject, name, value, children,
    }) => {
      switch (type) {
        case 'add':
          return `${space}  + ${name}: ${value}\n`;
        case 'delete':
          return `${space}  - ${name}: ${value}\n`;
        case 'changed':
          return (valueIsObject) ? `${space}    ${name}: ${children}\n`
            : `${space}  + ${name}: ${value[0]}\n${space}  - ${name}: ${value[1]}\n`;
        case 'unchanged':
          return `${space}    ${name}: ${value}\n`;
        default:
      }
      return null;
    };
    return `{\n${dif.reduce((acc, el) => `${acc}${render(el)}`, '')}${space}}`;
  };
  return iter(fileBefore, fileAfter, 0);
};

export default genDiff;
