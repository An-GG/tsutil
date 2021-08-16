export function get_altered_options
    <D extends { [k:string]:any }, P extends (Partial<D>)>
    (default_opts:D, partial_changes?:P): D {
        let out = jcopy(default_opts);
        if (!partial_changes) { return out; }
        if (typeof partial_changes == 'object') { 
            for (let k in partial_changes) {
                if (typeof partial_changes[k] == 'object' && typeof out[k] == 'object') {
                    out[k] = get_altered_options(out[k], partial_changes[k] as any);
                } else {
                    (out as any)[k] = partial_changes[k];
                }
            }
        }
        return out;
}

export function jcopy<T>(o:T):T { return JSON.parse(JSON.stringify(o)) };

export function log(o:any) { process.stdout.write( o ? o.toString() + '\n' : '\n' ); }

export const MakeID = (len?:number)=>{
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    len = len ? len : 10;
    return new Array(len)
        .fill(null)
        .map(() => charset.charAt(Math.floor(Math.random() * charset.length)))
        .join('');
}

export async function wait_ms(n:number):Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, n);
    })
}