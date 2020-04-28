import { has, union, isObject } from 'lodash';

const propertyActions = [
  {
    check:
    (contentFile1, contentFile2, key) => isObject(contentFile1[key]) && isObject(contentFile2[key]),
    process: (valueFile1, valueFile2, key, func) => ({
      type: 'object', key, children: func(valueFile1, valueFile2),
    }),
  },
  {
    check: (contentFile1, contentFile2, key) => !has(contentFile1, key),
    process: (valueFile1, valueFile2, key) => ({
      type: 'added', key, newValue: valueFile2,
    }),
  },
  {
    check: (contentFile1, contentFile2, key) => !has(contentFile2, key),
    process: (valueFile1, valueFile2, key) => ({
      type: 'deleted', key, newValue: valueFile1,
    }),
  },
  {
    check: (contentFile1, contentFile2, key) => contentFile1[key] !== contentFile2[key],
    process: (valueFile1, valueFile2, key) => ({
      type: 'changed', key, oldValue: valueFile1, newValue: valueFile2,
    }),
  },
  {
    check: (contentFile1, contentFile2, key) => contentFile1[key] === contentFile2[key],
    process: (valueFile1, valueFile2, key) => ({
      type: 'unchanged', key, newValue: valueFile2,
    }),
  },
];

const getPropertyActions = (arg1, arg2, key) => propertyActions
  .find(({ check }) => check(arg1, arg2, key));

const buildAst = (contentFile1, contentFile2) => {
  const commonKeys = union(Object.keys(contentFile1), Object.keys(contentFile2));
  const ast = commonKeys.map((key) => {
    const { process } = getPropertyActions(contentFile1, contentFile2, key);
    return process(contentFile1[key], contentFile2[key], key, buildAst);
  });
  return ast;
};

export default buildAst;
