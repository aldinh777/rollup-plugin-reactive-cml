const { writeFileSync } = require('fs');
const { extname, basename, dirname, join } = require('path');
const { parseReactiveCML } = require('@aldinh777/reactive-cml/parser');

module.exports = function (opts = {}) {
    const parserOptions = opts.parserOptions || {};
    const outputJsFile = opts.outputJsFile;
    const disableRelativeImports = opts.disableRelativeImports;

    return {
        name: 'parse-reactive',
        transform(source, id) {
            const ext = extname(id);
            if (ext === '.rc') {
                const parserOptionsClone = Object.assign({}, parserOptions);
                if (disableRelativeImports) {
                    delete parserOptionsClone.relativeImports;
                } else {
                    if (!parserOptionsClone.relativeImports) {
                        parserOptionsClone.relativeImports = {};
                    }
                    parserOptionsClone.relativeImports.filename = id;
                }
                const output = parseReactiveCML(source, parserOptionsClone);
                if (outputJsFile) {
                    const dir = dirname(id);
                    const base = basename(id);
                    const file = join(dir, base.substring(0, base.length - ext.length) + '.js');
                    writeFileSync(file, output, 'utf-8');
                }
                return output;
            }
            return null;
        }
    };
};
