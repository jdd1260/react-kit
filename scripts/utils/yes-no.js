const _ = require('lodash');

module.exports = function(str) {
    const formatted = _.toUpper(_.trim(str));
    return formatted === 'Y';
}