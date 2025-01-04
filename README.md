
# 🐻 Zustand - State Management Simplified

Zustand is a small, fast, and scalable state-management library for React applications. It provides a simple and flexible API for managing global and local states.

---

## 🌟 Key Features

- **Minimal boilerplate**: Write less code to manage state.
- **No Context API needed**: Avoid prop drilling with simpler global state management.
- **Scalable**: Suitable for small apps and large-scale production apps.
- **Flexible API**: Access state anywhere and in any way.
- **Middleware Support**: Includes `devtools` for debugging, `persist` for localStorage, etc.
- **React Native**: Fully compatible.

---

## 📦 Installation

Install Zustand via npm or yarn:

```bash
# npm
npm install zustand

# yarn
yarn add zustand
```

For middleware support:

```bash
npm install zustand/middleware
```

---

## 🛠️ Basic Setup

### Create a Store

```javascript
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0, // Initial state
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useStore;
```

### Use the Store in Components

```javascript
import React from 'react';
import useStore from './store';

const Counter = () => {
  const { count, increment, decrement } = useStore((state) => ({
    count: state.count,
    increment: state.increment,
    decrement: state.decrement,
  }));

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
```

---

## 🔗 State Selectors

Optimize re-renders by selecting only specific parts of the state:

```javascript
const count = useStore((state) => state.count);
const increment = useStore((state) => state.increment);
```

---

## 🧰 Advanced Features

### 1. **Middleware**

#### **Persist State**

Persist your store to `localStorage` or `sessionStorage`.

```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    { name: 'counter-storage' } // Key for localStorage
  )
);
```

#### **Devtools**

Debug your store with Redux DevTools.

```javascript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
  }))
);
```

### 2. **Action Middleware**

Customize how actions are processed using middleware.

```javascript
import { create } from 'zustand';

const useStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}));
```

Add middleware:

```javascript
import { create } from 'zustand';

const useStore = create((set, get) => ({
  items: [],
  addItem: (item) => {
    console.log('Adding item:', item);
    set((state) => ({ items: [...state.items, item] }));
  },
}));
```

---

## 🌀 Zustand Patterns

### 1. **Dynamic Slice Stores**

Separate slices for modularity:

```javascript
import { create } from 'zustand';

const counterSlice = (set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
});

const userSlice = (set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
});

const useStore = create((set) => ({
  ...counterSlice(set),
  ...userSlice(set),
}));
```

### 2. **Immer Integration**

Integrate `immer` for immutable state updates:

```javascript
import { create } from 'zustand';
import produce from 'immer';

const useStore = create((set) => ({
  todos: [],
  addTodo: (todo) =>
    set(
      produce((draft) => {
        draft.todos.push(todo);
      })
    ),
}));
```

### 3. **React Native Async Storage**

For React Native, use `AsyncStorage` for persistence:

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    { name: 'counter', getStorage: () => AsyncStorage }
  )
);
```

---

## 🐾 Testing with Zustand

Use Zustand stores in tests by mocking or setting initial states:

```javascript
import { renderHook, act } from '@testing-library/react-hooks';
import { create } from 'zustand';

const useTestStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

test('increments count', () => {
  const { result } = renderHook(() => useTestStore());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

---

## 🏗️ Full Example

### Counter App with Zustand

```javascript
import React from 'react';
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

const Counter = () => {
  const { count, increment, decrement } = useStore();
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
```

---

## 📚 Resources

- [Official Zustand Docs](https://docs.pmnd.rs/zustand)
- [Zustand GitHub Repository](https://github.com/pmndrs/zustand)
- [Redux vs Zustand](https://dev.to/kvng_zeez/redux-vs-zustand-a-modern-state-management-library-534h)

---
