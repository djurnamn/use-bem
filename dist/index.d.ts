export type BemFunction = (element?: string, modifier?: string | string[] | Record<string, boolean>) => string;
export interface BemConfig {
    elementSeparator?: string;
    modifierSeparator?: string;
}
export declare const createBemHook: (config?: BemConfig) => (block: string) => BemFunction;
declare const _default: (block: string) => BemFunction;
export default _default;
