const _ = require('lodash');

module.exports = (str) => {
  const formatted = _.toUpper(_.trim(str));
  return formatted === 'Y';
};
