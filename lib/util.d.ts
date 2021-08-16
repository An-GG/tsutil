declare const _default: 0;
export = _default;
export declare function get_altered_options<D extends {
    [k: string]: any;
}, P extends (Partial<D>)>(default_opts: D, partial_changes?: P): D;
export declare function jcopy<T>(o: T): T;
export declare function log(o: any): void;
export declare const MakeID: (len?: number | undefined) => string;
export declare function wait_ms(n: number): Promise<void>;
