import { helper } from '@ember/component/helper';

export default helper(function join([array, delimiter = ', ']) {
  return Array.isArray(array) ? array.join(delimiter) : '';
});
