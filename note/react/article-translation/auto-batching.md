# Automatic batching for fewer renders in React 18

本文只是对原文的简单翻译，可能会有所出入，详细可以[查看原文](https://github.com/reactwg/react-18/discussions/21)

## Overview

React 18 通过默认执行更多批处理来增加开箱即用的性能改进，无需在应用程序或库代码中手动批量更新。这篇文章将解释什么是批处理，它以前是如何工作的，以及发生了什么变化。

## What is batching?

批处理是 React 将多个状态更新分组到单个重新渲染中以获得更好的性能。

例如，如果你在同一个点击事件中有两个状态更新，React 总是将它们分批处理到一个重新渲染中。如果你运行以下代码，你会看到每次点击时，React 只执行一次渲染，尽管你设置了两次状态：

```tsx
function App() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  function handleClick() {
    setCount(c => c + 1) // Does not re-render yet
    setFlag(f => !f) // Does not re-render yet
    // React will only re-render once at the end (that's batching!)
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? 'blue' : 'black' }}>{count}</h1>
    </div>
  )
}
```

- ✅ [Demo: React 17 batches inside event handlers](https://codesandbox.io/s/spring-water-929i6?file=/src/index.js). (Notice one render per click in the console.)

这对性能非常有用，因为它**避免了不必要的重新渲染**。它还可以防止您的组件呈现仅更新一个状态变量的“半完成”状态，这可能会导致错误。这可能会提醒您，当您选择第一道菜时，餐厅服务员不会跑到厨房，而是等您完成订单。

然而，React 关于何时批量更新并不一致。例如，如果你需要获取数据，然后在上面的 `handleClick` 中更新 `state`，那么 React 不会批量更新，而是执行两次独立的更新。

这是因为 React 过去只在浏览器事件（如点击）中批量更新，但这里我们在事件已经处理后更新状态（在 fetch 回调中）：

```tsx
function App() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  function handleClick() {
    fetchSomething().then(() => {
      // React 17 and earlier does NOT batch these because
      // they run *after* the event in a callback, not *during* it
      setCount(c => c + 1) // Causes a re-render
      setFlag(f => !f) // Causes a re-render
    })
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? 'blue' : 'black' }}>{count}</h1>
    </div>
  )
}
```

🟡 [Demo: React 17 does NOT batch outside event handlers](https://codesandbox.io/s/trusting-khayyam-cn5ct?file=/src/index.js). (Notice two renders per click in the console.)

在 React 18 之前，我们只在 React 事件处理程序期间批量更新。默认情况下，React 中不会对 promise、setTimeout、原生事件处理程序或任何其他事件中的更新进行批处理。

## What is automatic batching?

从带有 [createRoot](https://github.com/reactwg/react-18/discussions/5) 的 React 18 开始，所有更新都将自动批处理，无论它们来自何处。

这意味着 timeouts, promise,原生事件处理程序或任何其他事件内的更新将以与 React 事件内的更新相同的方式进行批处理。我们希望这会导致更少的渲染工作，从而在您的应用程序中获得更好的性能：

```tsx
function App() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  function handleClick() {
    fetchSomething().then(() => {
      // React 18 and later DOES batch these:
      setCount(c => c + 1)
      setFlag(f => !f)
      // React will only re-render once at the end (that's batching!)
    })
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? 'blue' : 'black' }}>{count}</h1>
    </div>
  )
}
```

- ✅ [Demo: React 18 with `createRoot` batches even outside event handlers!](https://codesandbox.io/s/morning-sun-lgz88?file=/src/index.js) (Notice one render per click in the console!)
- 🟡 [Demo: React 18 with legacy `render` keeps the old behavior](https://codesandbox.io/s/jolly-benz-hb1zx?file=/src/index.js) (Notice two renders per click in the console.)

无论更新发生在何处，React 都会自动批量更新，因此：

```tsx
function handleClick() {
  setCount(c => c + 1)
  setFlag(f => !f)
  // React will only re-render once at the end (that's batching!)
}
```

行为与此相同：

```tsx
setTimeout(() => {
  setCount(c => c + 1)
  setFlag(f => !f)
  // React will only re-render once at the end (that's batching!)
}, 1000)
```

行为与此相同：

```tsx
fetch(/*...*/).then(() => {
  setCount(c => c + 1)
  setFlag(f => !f)
  // React will only re-render once at the end (that's batching!)
})
```

行为与此相同：

```tsx
elm.addEventListener('click', () => {
  setCount(c => c + 1)
  setFlag(f => !f)
  // React will only re-render once at the end (that's batching!)
})
```

> 注意：React 仅在通常安全的情况下才批量更新。例如，React 确保**对于每个用户启动的事件（如单击或按键），DOM 在下一个事件之前完全更新**。例如，这可确保在提交时禁用的表单不能被提交两次。

## What if I don’t want to batch?

通常，批处理是安全的，但某些代码可能依赖于在状态更改后立即从 DOM 中读取某些内容。对于这些用例，您可以使用 `ReactDOM.flushSync()` 选择退出批处理：

```tsx
import { flushSync } from 'react-dom' // Note: react-dom, not react

function handleClick() {
  flushSync(() => {
    setCounter(c => c + 1)
  })
  // React has updated the DOM by now
  flushSync(() => {
    setFlag(f => !f)
  })
  // React has updated the DOM by now
}
```

我们不希望这很常见。

## Does this break anything for Hooks?

如果您使用 Hooks，我们希望自动批处理在绝大多数情况下都能“正常工作”。 （如果没有，请告诉我们！）

## Does this break anything for Classes?

请记住，React 事件处理程序中的更新始终是批处理的，因此对于这些更新，没有任何更改。

在类组件中存在一个边缘情况，这可能是一个问题。

类组件有一个实现的怪癖，它可以同步读取事件内部的状态更新。这意味着您将能够在调用 `setState` 之间读取 `this.state`：

```tsx
handleClick = () => {
  setTimeout(() => {
    this.setState(({ count }) => ({ count: count + 1 }))

    // { count: 1, flag: false }
    console.log(this.state)

    this.setState(({ flag }) => ({ flag: !flag }))
  })
}
```

在 React 18 中，情况不再如此。由于即使在 setTimeout 中的所有更新都是批处理的，因此 React 不会同步渲染第一个 setState 的结果——渲染发生在下一个浏览器 tick 中。所以渲染还没有发生：

```tsx
handleClick = () => {
  setTimeout(() => {
    this.setState(({ count }) => ({ count: count + 1 }))

    // { count: 0, flag: false }
    console.log(this.state)

    this.setState(({ flag }) => ({ flag: !flag }))
  })
}
```

See [sandbox](https://codesandbox.io/s/interesting-rain-hkjqw?file=/src/App.js).

如果这是升级到 React 18 的障碍，您可以使用 `ReactDOM.flushSync` 强制更新，但我们建议谨慎使用：

```tsx
handleClick = () => {
  setTimeout(() => {
    ReactDOM.flushSync(() => {
      this.setState(({ count }) => ({ count: count + 1 }))
    })

    // { count: 1, flag: false }
    console.log(this.state)

    this.setState(({ flag }) => ({ flag: !flag }))
  })
}
```

See [sandbox](https://codesandbox.io/s/hopeful-minsky-99m7u?file=/src/App.js).

这个问题不会影响带有 Hooks 的函数组件，因为设置 state 不会更新 `useState` 中的现有变量：

```tsx
function handleClick() {
  setTimeout(() => {
    console.log(count); // 0
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
    console.log(count); // 0
  }, 1000)

```

虽然当您采用 Hooks 时这种行为可能令人惊讶，但它为自动批处理铺平了道路。

## What about `unstable_batchedUpdates`?

一些 React 库使用这个未记录的 API 来强制对事件处理程序之外的 `setState` 进行批处理：

```tsx
import { unstable_batchedUpdates } from 'react-dom'

unstable_batchedUpdates(() => {
  setCount(c => c + 1)
  setFlag(f => !f)
})
```

这个 API 在 18 中仍然存在，但不再需要它了，因为批处理是自动发生的。我们不会在 18 中删除它，尽管在流行的库不再依赖于它的存在之后，它可能会在未来的主要版本中被删除。
