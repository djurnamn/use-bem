import { useMemo } from "react";

type BemFunction = (element?: string, modifier?: string | string[]) => string;

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

const useBem = (block: string): BemFunction => {
  validate(block, "block");

  return useMemo(() => {
    return (element?: string, modifier?: string | string[]): string => {
      validate(element, "element");

      if (Array.isArray(modifier)) {
        modifier.forEach((mod) => validate(mod, "modifier"));
      } else {
        validate(modifier, "modifier");
      }

      const elementClass = element ? `${block}__${element}` : block;
      const modifiers = Array.isArray(modifier)
        ? modifier
        : [modifier].filter(Boolean);

      const modifierClasses = modifiers
        .map((mod) => `${elementClass}--${mod}`)
        .join(" ");

      return [elementClass, modifierClasses].filter(Boolean).join(" ");
    };
  }, [block]);
};

export default useBem;
