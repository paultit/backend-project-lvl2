import defaultFormat from './diff-format';
import plain from './plain-format';

const formatters = (data, format) => {
  const mapping = {
    diff: defaultFormat,
    plain,
  };
  return mapping[format](data);
};

export default formatters;
