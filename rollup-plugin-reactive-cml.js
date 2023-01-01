const { writeFileSync } = require('fs');
const { extname, basename, dirname, join } = require('path');
const { parseReactiveCML } = require('@aldinh777/reactive-cml/parser');

const defaultLibraries = [
    [
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
    [
        '@aldinh777/reactive-utils/collection',
        ['statelist', 'statemap', 'mapview', 'filterview', 'sortview']
    ],
    [
        '@aldinh777/reactive-utils/validator',
        ['isState', 'isMutable', 'isCollection', 'isList', 'isMap']
    ]
];

module.exports = function (opts = {}) {
    const parserOptions = opts.parserOptions || {};
    const outputJsFile = opts.outputJsFile;
    const useDefaultLibs = opts.useDefaultLibs;
    const disableRelativeImports = opts.disableRelativeImports;

    if (useDefaultLibs) {
        if (parserOptions.autoImports) {
            parserOptions.autoImports = parserOptions.autoImports.concat(defaultLibraries);
        } else {
            parserOptions.autoImports = defaultLibraries;
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
                const output = parseReactiveCML(source, parserOptionsClone, id);
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
