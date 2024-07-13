# use-bem

A React hook for generating BEM class names.

## Installation

```bash
pnpm install use-bem
# or
yarn add use-bem
# or
npm install use-bem
```

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
type BemFunction = (element?: string, modifier?: string | string[]) => string;
```

**Parameters**

- `element` (`string`): The BEM element name.
- `modifier` (`string` | `string[]`): The BEM modifier name(s).

**Returns**

- `className` (`string`): The formatted BEM class name.

## License

MIT
