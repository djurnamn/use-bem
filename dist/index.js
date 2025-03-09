"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBemHook = void 0;
const react_1 = require("react");
const defaultConfig = {
    elementSeparator: '__',
    modifierSeparator: '--'
};
const isClient = typeof window !== 'undefined';
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
const createBemHook = (config) => {
    const { elementSeparator, modifierSeparator } = Object.assign(Object.assign({}, defaultConfig), config);
    const createBemFunction = (block) => {
        validate(block, "block");
        return (element, modifier) => {
            validate(element, "element");
            const elementClass = element ? `${block}${elementSeparator}${element}` : block;
            if (!modifier) {
                return elementClass;
            }
            let modifiers = [];
            if (typeof modifier === 'string') {
                validate(modifier, "modifier");
                modifiers = [modifier];
            }
            else if (Array.isArray(modifier)) {
                modifier.forEach(modifierItem => validate(modifierItem, "modifier"));
                modifiers = modifier;
            }
            else {
                Object.entries(modifier).forEach(([modifierKey, value]) => {
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
    const useBem = (block) => {
        const bemFunction = createBemFunction(block);
        if (isClient) {
            return (0, react_1.useMemo)(() => bemFunction, [block]);
        }
        return bemFunction;
    };
    return useBem;
};
exports.createBemHook = createBemHook;
exports.default = (0, exports.createBemHook)();
