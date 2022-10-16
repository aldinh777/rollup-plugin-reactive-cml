import { Plugin } from 'rollup';
import { RCMLParserOptions } from '@aldinh777/reactive-cml/parser';

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
     * Auto import specific dependencies for instant usage
     *
     * Default Dependencies:
     * - { state, observe, observeAll, stateObserve, stateObserveAll } from '@aldinh777/reactive'
     * - { statelist, statemap } from '@aldinh777/reactive/util/collection'
     * - { mapview, filterview, sortview } from '@aldinh777/reactive/util/view'
     * - { stateToggle, stateLocalStorage } from '@aldinh777/reactive-cml/dom/reactive-util'
     *
     * default: __false__
     */
    useDefaultLibs?: boolean;
    /**
     * Disable relative import, to explicitly use
     * import keyword for every file around
     *
     * default: __false__
     */
    disableRelativeImports?: boolean;
}

export default function (opts: RCMLPluginOptions): Plugin;
