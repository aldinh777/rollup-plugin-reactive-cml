#Rollup Reactive CML Plugin

Rollup Plugin for to import .rc file

Usage Example with all options :

```js
import reactiveCML from '@aldinh777/rollup-plugin-cml';

export default {
    plugins: [
        reactiveCML({
            parserOptions: {
                mode: 'import'
                trimCML: true,
                autoImports: [
                    ['@aldinh777/reactive', ['state', 'observe']]
                ],
                relativeImports: {
                    extensions: ['.rc', '.js'],
                    includes: ['src/pages'],
                    excludes: ['node_modules', '.git']
                }
            }
            outputJsFile: false,
            useDefaultLibs: false,
            disableRelativeImports: false
        })
    ]
};
```
