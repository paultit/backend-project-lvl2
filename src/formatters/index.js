import defaultFormat from './diff-format';
import plain from './plain-format';
import json from './json-format';

const formatters = (data, format) => {
  const mapping = {
    diff: defaultFormat,
    plain,
    json,
  };
  return mapping[format](data);
};

export default formatters;
