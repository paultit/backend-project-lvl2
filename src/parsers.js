import yaml from 'js-yaml';
import ini from 'ini';

export default {
  '.json': (file) => JSON.parse(file),
  '.yaml': (file) => yaml.safeLoad(file),
  '.ini': (file) => ini.parse(file),
};
