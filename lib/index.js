"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait_ms = exports.MakeID = exports.log = exports.jcopy = exports.get_altered_options = void 0;
function get_altered_options(default_opts, partial_changes) {
    let out = jcopy(default_opts);
    if (!partial_changes) {
        return out;
    }
    if (typeof partial_changes == 'object') {
        for (let k in partial_changes) {
            if (typeof partial_changes[k] == 'object' && typeof out[k] == 'object') {
                out[k] = get_altered_options(out[k], partial_changes[k]);
            }
            else {
                out[k] = partial_changes[k];
            }
        }
    }
    return out;
}
exports.get_altered_options = get_altered_options;
function jcopy(o) { return JSON.parse(JSON.stringify(o)); }
exports.jcopy = jcopy;
;
function log(o) { process.stdout.write(o ? o.toString() + '\n' : '\n'); }
exports.log = log;
const MakeID = (len) => {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    len = len ? len : 10;
    return new Array(len)
        .fill(null)
        .map(() => charset.charAt(Math.floor(Math.random() * charset.length)))
        .join('');
};
exports.MakeID = MakeID;
async function wait_ms(n) {
    return new Promise((resolve) => {
        setTimeout(resolve, n);
    });
}
exports.wait_ms = wait_ms;
