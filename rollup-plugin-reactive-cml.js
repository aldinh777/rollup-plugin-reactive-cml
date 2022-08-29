const { writeFileSync } = require('fs');
const { extname, basename, dirname, join } = require('path');
const { parseReactiveCML } = require('@aldinh777/reactive-cml/parser');

module.exports = function (
    opts = {
        parserOptions: {
            trimCML: true,
            mode: 'import'
        },
        outputJsFile: false
    }
) {
    return {
        name: 'parse-reactive',
        transform(source, id) {
            const ext = extname(id);
            if (ext === '.rc') {
                const output = parseReactiveCML(source, opts.parserOptions);
                if (opts.outputJsFile) {
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
}
