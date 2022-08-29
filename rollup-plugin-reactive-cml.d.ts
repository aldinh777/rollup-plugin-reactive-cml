import { Plugin } from 'rollup';

interface RCMLParserOptions {
    mode?: 'import' | 'require';
    trimCML?: boolean;
}

interface RCMLPluginOptions {
    parserOptions?: RCMLParserOptions;
    outputJsFile?: boolean;
}

export default function(opts: RCMLPluginOptions): Plugin;
