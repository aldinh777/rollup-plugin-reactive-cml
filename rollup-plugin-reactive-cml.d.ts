import { Plugin } from 'rollup';
import { RCMLParserOptions } from '@aldinh777/reactive-cml/parser'

interface RCMLPluginOptions {
    parserOptions?: RCMLParserOptions;
    outputJsFile?: boolean;
    useDefaultLibs?: boolean;
    disableRelativeImports?: boolean;
}

export default function(opts: RCMLPluginOptions): Plugin;
