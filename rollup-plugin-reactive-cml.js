const { extname } = require('path');
const { parseReactiveCML } = require('@aldinh777/reactive-cml/parser');

module.exports = function () {
    return {
        name: 'parse-reactive',
        transform(source, id) {
            if (extname(id) === '.rc') {
                return parseReactiveCML(source);
            }
            return null;
        }
    }
}
