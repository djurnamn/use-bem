import { useMemo } from 'react';

export type BemFunction = (
  element?: string,
  modifier?: string | string[] | Record<string, boolean>
) => string;

export interface BemConfig {
  elementSeparator?: string;
  modifierSeparator?: string;
}

const defaultConfig: Required<BemConfig> = {
  elementSeparator: '__',
  modifierSeparator: '--'
};

const isClient = typeof window !== 'undefined';

const validate = (
  value: string | undefined,
  type: "block" | "element" | "modifier"
) => {
  if (value && /\s/.test(value)) {
    throw new Error(
      `BEM ${type} name "${value}" should not contain spaces.${
        type === "modifier"
          ? " To add multiple modifiers, pass an array of strings instead."
          : ""
      }`
    );
  }

  const isValid = (name: string) => /^[a-zA-Z0-9_-]+$/.test(name);

  if (value && !isValid(value)) {
    throw new Error(
      `BEM ${type} name "${value}" contains invalid characters. Only letters, digits, hyphens, and underscores are allowed.`
    );
  }
};

export const createBemHook = (config?: BemConfig) => {
  const { elementSeparator, modifierSeparator } = { ...defaultConfig, ...config };

  const createBemFunction = (block: string): BemFunction => {
    validate(block, "block");

    return (element?: string, modifier?: string | string[] | Record<string, boolean>): string => {
      validate(element, "element");

      const elementClass = element ? `${block}${elementSeparator}${element}` : block;
      
      if (!modifier) {
        return elementClass;
      }

      let modifiers: string[] = [];

      if (typeof modifier === 'string') {
        validate(modifier, "modifier");
        modifiers = [modifier];
      } else if (Array.isArray(modifier)) {
        modifier.forEach(modifierItem => validate(modifierItem, "modifier"));
        modifiers = modifier;
      } else {
        (Object.entries(modifier) as [string, boolean][]).forEach(([modifierKey, value]) => {
          if (value) {
            validate(modifierKey, "modifier");
            modifiers.push(modifierKey);
          }
        });
      }

      const modifierClasses = modifiers
        .map(modifierItem => `${elementClass}${modifierSeparator}${modifierItem}`)
        .join(" ");

      return modifierClasses ? `${elementClass} ${modifierClasses}` : elementClass;
    };
  };

  const useBem = (block: string): BemFunction => {
    const bemFunction = createBemFunction(block);
    
    if (isClient) {
      return useMemo(() => bemFunction, [block]);
    }
    
    return bemFunction;
  };

  return useBem;
};

export default createBemHook();
