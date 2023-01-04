const { writeFileSync } = require('fs');
const { extname, basename, dirname, join } = require('path');
const { parseReactiveCML } = require('@aldinh777/reactive-cml/parser');

const defaultLibraries = {
    'reactive-utils': [
        '@aldinh777/reactive-utils',
        [
            'state',
            'observe',
            'observeAll',
            'stateObserve',
            'stateObserveAll',
            'stateToggle',
            'stateLocalStorage'
        ]
    ],
    'reactive-utils/collection': [
        '@aldinh777/reactive-utils/collection',
        ['statelist', 'statemap', 'mapview', 'filterview', 'sortview']
    ],
    'reactive-utils/validator': [
        '@aldinh777/reactive-utils/validator',
        ['isState', 'isMutable', 'isCollection', 'isList', 'isMap']
    ]
};

module.exports = function (opts = {}) {
    const parserOptions = opts.parserOptions || {};
    const outputJsFile = opts.outputJsFile;
    const autoImports = opts.autoImports;
    const disableRelativeImports = opts.disableRelativeImports;

    if (autoImports) {
        for (const pot of autoImports) {
            if (!parserOptions.autoImports) {
                parserOptions.autoImports = [];
            }
            if (typeof pot === 'string') {
                if (defaultLibraries[pot]) {
                    parserOptions.autoImports = parserOptions.autoImports.concat(defaultLibraries[pot]);
                }
            } else if (pot instanceof Array) {
                parserOptions.autoImports = parserOptions.autoImports.concat(pot);
            }
        }
    }

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
