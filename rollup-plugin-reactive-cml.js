import { extname } from 'path';
import { parseReactiveCML } from '@aldinh777/reactive-cml/parser';

export default function () {
    return {
        name: 'parse-reactive',
        transform(source, id) {
            if (extname(id) === '.rc') {
                return parseReactiveCML(source);
            }
            return null;
        }
    }
}
