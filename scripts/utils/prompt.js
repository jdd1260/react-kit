const util = require('util');
const readline = require('readline');

module.exports = util.promisify((query, callback) => {
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.question(query, (result) => {
        rl.close();
        callback(null, result);
    });
});
