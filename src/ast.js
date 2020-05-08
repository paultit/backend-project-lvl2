import { has, union, isObject } from 'lodash';

const propertyActions = [
  {
    check:
    (dataBefore, dataAfter, key) => isObject(dataBefore[key]) && isObject(dataAfter[key]),
    process: (valueBefore, valueAfter, key, func) => ({
      type: 'object', key, children: func(valueBefore, valueAfter),
    }),
  },
  {
    check: (dataBefore, dataAfter, key) => !has(dataBefore, key),
    process: (valueBefore, valueAfter, key) => ({
      type: 'added', key, newValue: valueAfter,
    }),
  },
  {
    check: (dataBefore, dataAfter, key) => !has(dataAfter, key),
    process: (valueBefore, valueAfter, key) => ({
      type: 'deleted', key, newValue: valueBefore,
    }),
  },
  {
    check: (dataBefore, dataAfter, key) => dataBefore[key] !== dataAfter[key],
    process: (valueBefore, valueAfter, key) => ({
      type: 'changed', key, oldValue: valueBefore, newValue: valueAfter,
    }),
  },
  {
    check: (dataBefore, dataAfter, key) => dataBefore[key] === dataAfter[key],
    process: (valueBefore, valueAfter, key) => ({
      type: 'unchanged', key, newValue: valueAfter,
    }),
  },
];

const getPropertyActions = (arg1, arg2, key) => propertyActions
  .find(({ check }) => check(arg1, arg2, key));

const buildAst = (dataBefore, dataAfter) => {
  const commonKeys = union(Object.keys(dataBefore), Object.keys(dataAfter));
  const ast = commonKeys.map((key) => {
    const { process } = getPropertyActions(dataBefore, dataAfter, key);
    return process(dataBefore[key], dataAfter[key], key, buildAst);
  });
  return ast;
};

export default buildAst;
