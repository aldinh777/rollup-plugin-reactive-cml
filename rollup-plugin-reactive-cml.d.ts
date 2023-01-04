import { Plugin } from 'rollup';
import { RCMLParserOptions } from '@aldinh777/reactive-cml/parser';
import { ImportFormat } from '@aldinh777/reactive-cml/util';

interface RCMLPluginOptions {
    /** Reactive-CML parser options */
    parserOptions?: RCMLParserOptions;
    /**
     * Output .js File alongside .rc file
     *
     * default: __false__
     */
    outputJsFile?: boolean;
    /**
     * Use auto import
     * 
     * keys:
     *  - reactive-utils
     *  - reactive-utils/collection
     *  - reactive-utils/validator
     */
    autoImports: (string | ImportFormat)[];
    /**
     * Disable relative import, to explicitly use
     * import keyword for every file around
     *
     * default: __false__
     */
    disableRelativeImports?: boolean;
}

export default function (opts: RCMLPluginOptions): Plugin;
