export function get_altered_options
    <D extends { [k:string]:any }, P extends (Partial<D>)>
    (default_opts:D, partial_changes?:P): D {
        let out = jcopy(default_opts);
        if (!partial_changes) { return out; }
        if (typeof partial_changes == 'object') { 
            for (let k in partial_changes) {
                let one_is_array = (Array.isArray(partial_changes[k]) || Array.isArray(out[k]));
                if (!one_is_array && typeof partial_changes[k] == 'object' && typeof out[k] == 'object') {
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

declare const _custom_ts_type_error: unique symbol
export type COMPILETIME_TYPE_ERROR = typeof _custom_ts_type_error;

export type ReturnType<T> = T extends (...params:any) => infer U ? U: COMPILETIME_TYPE_ERROR;

export type PromiseResult<T> = T extends Promise<infer U> ? U: COMPILETIME_TYPE_ERROR;

export type Expand<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: O[K] }
    : never
  : T;

export type ExpandDeep<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandDeep<O[K]> }
    : never
  : T;


export type ArrayOfSize<N extends number, K, i_ extends K[] = []> =
  i_['length'] extends N ? i_ : ArrayOfSize<N, K, [...i_, K]>


namespace TypeMath1 {

    type Zero = _N<0>
    
    type AddOne<U extends 1[]> = [...U, 1];
    type SubtractOne<U extends 1[], N extends 1[] = Zero> = 
        U extends Zero ? Zero : 
        AddOne<N> extends U ? N : SubtractOne<U, AddOne<N>>

    type Add<A extends 1[], B extends 1[]> = [...A, ...B]; 
    type Subtract<A extends 1[], B extends 1[], _i extends 1[] = Zero> = 
        A extends Zero ? Zero : 
        Add<_i, B> extends A ? _i : Subtract<A,B,AddOne<_i>>

    type Multiply<A extends 1[], B extends 1[], _i extends 1[] = Zero> = 
        B extends Zero ? _i : Multiply<A, SubtractOne<B>, Add<_i, A>>

    type Divide<A extends 1[], B extends 1[], _i extends 1[] = Zero> =
        A extends Zero ? _i : Divide<Subtract<A, B>, B, AddOne<_i>>

    type _N<N extends number,U extends 1[] = []> = 
        U['length'] extends N ? U : _N<N,AddOne<U>>

    type __N<N extends number,U extends number[] = []> = 
        U['length'] extends N ? U : __N<N,[...U, U['length']]>

}


namespace TypeMath2 {

    type O = 0;   // ideally should be xor
    type I = 1;

    type Bit = O | I
    type Len = 4
    type Number = ArrayOfSize<Len, Bit>
    type Zero = ArrayOfSize<Len, O>
    // little endian




    type AddBit<A extends Bit, B extends Bit> = 
        A extends B ? 
            A extends 0 ?
            [0,0]
            : [0,1]
        : [1,0]

    type L<T extends any[]> = T['length']
    type Sum<A extends Number, B extends Number, _out extends Bit[] = [], _carry extends Bit = O, i extends any[] = []> =
        L<i> extends Len ? _out : 
        Sum<A,B, [..._out, 
            (A[L<i>] extends B[L<i>] ? O : I)
        ], (A[L<i>] & B[L<i>] extends I ? I : O) , [...i, 1]>
        
    type tt =  Sum<[O,O,O,I],[O,O,O,I]>



}
