import yaml from 'js-yaml';

export default {
  '.json': (file) => JSON.parse(file),
  '.yaml': (file) => yaml.safeLoad(file),
};
