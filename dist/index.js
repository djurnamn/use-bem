"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const validate = (value, type) => {
    if (value && /\s/.test(value)) {
        throw new Error(`BEM ${type} name "${value}" should not contain spaces.${type === "modifier"
            ? " To add multiple modifiers, pass an array of strings instead."
            : ""}`);
    }
    const isValid = (name) => /^[a-zA-Z0-9_-]+$/.test(name);
    if (value && !isValid(value)) {
        throw new Error(`BEM ${type} name "${value}" contains invalid characters. Only letters, digits, hyphens, and underscores are allowed.`);
    }
};
const useBem = (block) => {
    validate(block, "block");
    return (0, react_1.useMemo)(() => {
        return (element, modifier) => {
            validate(element, "element");
            if (Array.isArray(modifier)) {
                modifier.forEach((mod) => validate(mod, "modifier"));
            }
            else {
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
exports.default = useBem;
