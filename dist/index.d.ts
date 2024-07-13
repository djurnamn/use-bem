type BemFunction = (element?: string, modifier?: string | string[]) => string;
declare const useBem: (block: string) => BemFunction;
export default useBem;
