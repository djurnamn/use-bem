# use-bem

A flexible React hook for generating BEM class names with TypeScript support.

## Features

- 🎯 TypeScript support
- 🔄 Server-side rendering compatible (Next.js)
- 🎨 Customizable separators
- ✨ Multiple modifier styles (string, array, or object)
- 🚀 Automatic client-side memoization

## Installation

```bash
npm install use-bem
# or
yarn add use-bem
```

## Basic Usage

```tsx
import useBem from 'use-bem';

const Component = () => {
  const bem = useBem('button');
  
  return (
    <button 
      className={bem('icon', 'large')} // -> "button__icon button__icon--large"
    >
      Click me
    </button>
  );
};
```

## Advanced Usage

### Multiple Modifiers

```tsx
const bem = useBem('card');

// Array of modifiers
bem('title', ['primary', 'large']) // -> "card__title card__title--primary card__title--large"

// Object syntax for boolean modifiers
bem('content', {
  visible: true,
  hidden: false,
  large: true
}) // -> "card__content card__content--visible card__content--large"
```

### Custom Configuration

You can create a custom instance with your own separator configuration:

```tsx
// utils/bem.ts
import { createBemHook } from 'use-bem';

export default createBemHook({
  elementSeparator: '-', // Instead of default '__'
  modifierSeparator: '_' // Instead of default '--'
});

// Component.tsx
import useBem from './utils/bem';

const Component = () => {
  const bem = useBem('block');
  bem('element', 'modifier') // -> "block-element block-element_modifier"
};
```

### Type Safety

The hook exports types for use in component props:

```tsx
import { BemFunction } from 'use-bem';

interface Props {
  bemClassName: BemFunction;
  // other props...
}

const SubComponent = ({ bemClassName }: Props) => {
  return <div className={bemClassName('element', 'modifier')}>...</div>;
};
```

## Notes

- The hook automatically detects if it's running on the client side and applies memoization only when appropriate
- Invalid characters in block, element, or modifier names will throw errors
- Spaces in names are not allowed (use arrays or objects for multiple modifiers)

## Example

### Usage

```tsx
import useBem from "use-bem";

const Component = () => {
  const bem = useBem("block");

  return (
    <div className={bem()}>
      <div className={bem("element")}>Element</div>
      <div className={bem("element", "modifier")}>Element with Modifier</div>
    </div>
  );
};
```

### Result

```html
<div class="block">
  <div class="block__element">Element</div>
  <div class="block__element block__element--modifier">
    Element with Modifier
  </div>
</div>
```

## In-Depth Example: Tabs Component

### Implementation

```tsx
import React, { useState } from "react";
import useBem from "use-bem";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  initialActiveTab?: string;
  vertical?: boolean;
}

const Tabs: React.FC<TabsProps> = ({ tabs, initialActiveTab, vertical }) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab || tabs[0].id);
  const bem = useBem("tabs");

  return (
    <div className={bem(undefined, vertical ? "vertical" : undefined)}>
      <div className={bem("header")}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={bem("tab", activeTab === tab.id ? "active" : undefined)}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={bem("content")}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={bem("panel", activeTab === tab.id ? "active" : "hidden")}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
```

### Usage

```tsx
import React from "react";
import Tabs from "./Tabs";

const App: React.FC = () => {
  const tabs = [
    { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
    { id: "tab2", label: "Tab 2", content: <div>Content 2</div> },
    { id: "tab3", label: "Tab 3", content: <div>Content 3</div> },
  ];

  return (
    <div>
      <h1>Horizontal Tabs</h1>
      <Tabs tabs={tabs} />

      <h1>Vertical Tabs</h1>
      <Tabs tabs={tabs} vertical />
    </div>
  );
};

export default App;
```

### Result (Horizontal Tabs)

```html
<div class="tabs">
  <div class="tabs__header">
    <button class="tabs__tab tabs__tab--active">Tab 1</button>
    <button class="tabs__tab">Tab 2</button>
    <button class="tabs__tab">Tab 3</button>
  </div>
  <div class="tabs__content">
    <div class="tabs__panel tabs__panel--active">Content 1</div>
    <div class="tabs__panel tabs__panel--hidden">Content 2</div>
    <div class="tabs__panel tabs__panel--hidden">Content 3</div>
  </div>
</div>
```

### Result (Vertical Tabs)

```html
<div class="tabs tabs--vertical">
  <div class="tabs__header">
    <button class="tabs__tab tabs__tab--active">Tab 1</button>
    <button class="tabs__tab">Tab 2</button>
    <button class="tabs__tab">Tab 3</button>
  </div>
  <div class="tabs__content">
    <div class="tabs__panel tabs__panel--active">Content 1</div>
    <div class="tabs__panel tabs__panel--hidden">Content 2</div>
    <div class="tabs__panel tabs__panel--hidden">Content 3</div>
  </div>
</div>
```

## API

### useBem

```typescript
useBem(block: string): BemFunction
```

**Parameters**

- `block` (`string`): The BEM block name.

**Returns**

- `BemFunction`: A function to generate BEM class names.

### BemFunction

```typescript
type BemFunction = (
  element?: string,
  modifier?: string | string[] | Record<string, boolean>
) => string;
```

**Parameters**

- `element` (`string`): The BEM element name.
- `modifier`: One of the following:
  - `string`: A single modifier name
  - `string[]`: Multiple modifier names
  - `Record<string, boolean>`: Object with modifier names as keys and boolean flags as values

**Returns**

- `className` (`string`): The formatted BEM class name.

### createBemHook

```typescript
interface BemConfig {
  elementSeparator?: string; // Default: '__'
  modifierSeparator?: string; // Default: '--'
}

createBemHook(config?: BemConfig): (block: string) => BemFunction
```

**Parameters**

- `config` (`BemConfig`): Optional configuration object to customize separators

**Returns**

- A custom `useBem` hook with the specified configuration

## Examples

### Basic Usage

```tsx
const bem = useBem('button');

// Block
bem() // -> "button"

// Element
bem('icon') // -> "button__icon"

// Element with modifier
bem('icon', 'large') // -> "button__icon button__icon--large"

// Element with multiple modifiers (array)
bem('icon', ['large', 'primary']) // -> "button__icon button__icon--large button__icon--primary"

// Element with conditional modifiers (object)
bem('icon', {
  large: true,
  primary: false,
  disabled: true
}) // -> "button__icon button__icon--large button__icon--disabled"
```

## License

MIT
