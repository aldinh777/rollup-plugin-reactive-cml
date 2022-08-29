#Rollup Reactive CML Plugin

Rollup Plugin for to import .rc file

```js
import reactiveCML from '@aldinh777/rollup-plugin-cml';

export default {
    plugins: [
        reactiveCML({
            outputJsFile: false,
            parserOptions: {
                trimCML: true,
                mode: 'import'
            }
        })
    ]
};
```
