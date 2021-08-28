# 对 Dan 的博客以及一些 twitter 看完的分析以及侧重点

希望其他人在阅读的时候能够直接提取中心点, 了解 Dan 对 React 的深层次理解。

- [How Does setState Know What to Do?](https://overreacted.io/how-does-setstate-know-what-to-do/)

setState 如何知道该做什么？部分原话来自 Dan 的博客

---

当你在组件中调用 setState 的时候，你认为发生了些什么？

```tsx
import React from 'react'
import ReactDOM from 'react-dom'

class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = { clicked: false }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    // here
    this.setState({ clicked: true })
  }
  render() {
    if (this.state.clicked) {
      return <h1>Thanks</h1>
    }
    return <button onClick={this.handleClick}>Click me!</button>
  }
}

ReactDOM.render(<Button />, document.getElementById('container'))
```

当然是：React 根据下一个状态`{clicked：true}`重新渲染组件，同时更新 DOM 以匹配返回的`<h1>Thanks</ h1>`元素。

更新 DOM 听起来像是 React DOM 的职责所在。但是我们调用的是 `this.setState()`，而没有调用  任何来自 React DOM 的东西。 而且我们组件的父类 React.Component 也是在 React 本身定义的。

所以存在于 `React.Component` 内部的 `setState()` 是如何更新 DOM 的呢？

---

我们或许会认为：`React.Component` 类包含了 DOM 更新的逻辑。

但是如果是这样的话，`this.setState()` 又如何能在其他环境下使用呢？举个例子，React Native app 中的组件也是继承自 `React.Component`。他们依然可以像我们在上面做的那样调用 `this.setState()`，而且 React Native 渲染的是安卓和 iOS 原生的界面而不是 DOM。

如果你曾使用过一些渲染器像 [React ART](https://github.com/facebook/react/tree/master/packages/react-art)，你也许也知道在一个页面中我们是可以使用多个渲染器的。（举个例子，ART 组件在 React DOM 树的内部起作用。）这使得全局标志或变量无法维持。

因此，`React.Component` 以某种未知的方式将处理状态`（state）`更新的任务委托给了特定平台的代码。在我们理解这些是如何发生的之前，让我们深挖一下包（packages）是如何分离的以及为什么这样分离。

---

有一个很常见的误解就是 React“引擎”是存在于 `react` 包里面的。 然而事实并非如此。

实际上从 [React 0.14](https://reactjs.org/blog/2015/07/03/react-v0.14-beta-1.html#two-packages) 我们将代码拆分成多个包以来，react 包故意只暴露一些定义组件的 API。绝大多数 React 的  实现都存在于“渲染器（renderers）”中

`react-dom`、`react-dom/server`、 `react-native`、 `react-test-renderer`、 `react-art` 都是常见的渲染器（当然你也可以[创建属于你的渲染器](https://github.com/facebook/react/blob/master/packages/react-reconciler/README.md#practical-examples)）。

 这就是为什么不管你的目标平台是什么，react 包都是可用的。从 react 包中导出的一切，比如 `React.Component`、`React.createElement`、 `React.Children` 和（最终的）[Hooks](https://reactjs.org/docs/hooks-intro.html)，都是独立于目标平台的。无论你是运行 React DOM，还是 React DOM Server,或是 React Native，你的组件都可以使用同样的方式导入和使用。

相比之下，渲染器包  暴露的都是特定平台的 API，比如说：`ReactDOM.render()`，可以让你将 React 层次结构（hierarchy）挂载进一个 DOM 节点。每一种渲染器都提供了类似的 API。理想状况下，绝大多数组件都不应该从渲染器中导入任何东西。只有这样，组件才会更加灵活。

和大多数人现在想的一样，**React “引擎”就是存在于各个渲染器的内部**。很多渲染器包含一份  同样代码的复制 —— 我们称为[“协调器”(“reconciler”)](https://github.com/facebook/react/tree/master/packages/react-reconciler)。[构建步骤(build step)](https://reactjs.org/blog/2017/12/15/improving-the-repository-infrastructure.html#migrating-to-google-closure-compiler)将协调器代码和渲染器代码  平滑地整合成一个高度优化的捆绑包（bundle）以获得更高的性能。（代码复制通常来说不利于控制捆绑包的大小，但是  绝大多数 React 用户同一时间只会选用一个渲染器，比如说 react-dom。）

这里要注意的是： `react` 包仅仅是让你使用  React 的特性，但是它完全不知道这些特性是如何实现的。而渲染器包(react-dom、react-native 等)提供了 React 特性  的实现以及平台特定的逻辑。这其中的有些代码是共享的(“协调  器”)，但是这就涉及到各个渲染器的实现细节了。

---

现在我们知道为什么当我们想使用新特性时，`react` 和 `react-dom` 都需要被更新。举个例子，当 React 16.3 添加了 Context API，`React.createContext()`API 会被 React 包暴露出来。

但是 `React.createContext()` 其实并没有实现 context。因为在 React DOM 和 React DOM Server 中同样一个 API 应当有不同的实现。所以 `createContext()`只返回了一些普通对象：

```tsx
// 简化版代码
function createContext(defaultValue) {
  let context = {
    _currentValue: defaultValue,
    Provider: null,
    Consumer: null
  }
  context.Provider = {
    $$typeof: Symbol.for('react.provider'),
    _context: context
  }
  context.Consumer = {
    $$typeof: Symbol.for('react.context'),
    _context: context
  }
  return context
}
```

当你在代码中使用 `<MyContext.Provider>` 或 `<MyContext.Consumer>` 的时候， 是渲染器决定如何处理这些接口。React DOM 也许用某种方式追踪 context 的值，但是 React DOM Server 用的可能是另一种不同的方式。

---

`React.Component` 中的 `setState()`如何与正确的渲染器“对话”？

**答案是：每个渲染器都在已创建的类上设置了一个特殊的字段**。这个字段叫做 `updater`。这并不是你要设置的的东西——而是，React DOM、React DOM Server 或 React Native 在创建完你的类的实例之后会立即设置的东西：

```tsx
// React DOM 内部
const inst = new YourComponent()
inst.props = props
inst.updater = ReactDOMUpdater

// React DOM Server 内部
const inst = new YourComponent()
inst.props = props
inst.updater = ReactDOMServerUpdater

// React Native 内部
const inst = new YourComponent()
inst.props = props
inst.updater = ReactNativeUpdater
```

查看 [React.Component 中 setState 的实现](https://github.com/facebook/react/blob/ce43a8cd07c355647922480977b46713bd51883e/packages/react/src/ReactBaseClasses.js#L58-L67)， setState 所做的一切就是委托渲染器创建这个组件的实例：

```tsx
// 适当简化的代码
setState(partialState, callback) {
  // 使用`updater`字段回应渲染器！
  this.updater.enqueueSetState(this, partialState, callback);
}
```

React DOM Server [也许想](https://github.com/facebook/react/blob/ce43a8cd07c355647922480977b46713bd51883e/packages/react-dom/src/server/ReactPartialRenderer.js#L442-L448) 忽略一个状态更新并且警告你，而 React DOM 与 React Native 却想要让他们协调器（reconciler）的副本[处理它](https://github.com/facebook/react/blob/ce43a8cd07c355647922480977b46713bd51883e/packages/react-reconciler/src/ReactFiberClassComponent.js#L190-L207)。

这就是 this.setState()`尽管定义在 React 包中，却能够更新 DOM 的原因。它读取由 React DOM 设置`的 this.updater，让 React DOM 安排并处理更新。

---

现在关于类的部分我们已经知道了，那关于 Hooks 的呢？

当人们第一次看见[Hooks proposal API](https://reactjs.org/docs/hooks-intro.html)， 他们可能经常会想： useState 是怎么 “知道要做什么”的？然后假设它比那些包含 this.setState()的 React.Component 类更“神奇”。

但是正如我们今天所看到的，基类中 `setState()`的执行一直以来都是一种错觉。它除了将调用转发给当前的渲染器外，什么也没做 。useState Hook [也是做了同样的事情](https://github.com/facebook/react/blob/ce43a8cd07c355647922480977b46713bd51883e/packages/react/src/ReactHooks.js#L55-L56)。

**Hooks**使用了一个 **“dispatcher”** 对象，代替了 `updater` 字段。当你调用 React.useState()、React.useEffect()、 或者其他内置的 Hook 时，这些调用被转发给了当前的 dispatcher

```tsx
// React内部(适当简化)
const React = {
  // 真实属性隐藏的比较深，看你能不能找到它！
  __currentDispatcher: null,

  useState(initialState) {
    return React.__currentDispatcher.useState(initialState)
  },

  useEffect(initialState) {
    return React.__currentDispatcher.useEffect(initialState)
  }
  // ...
}
```

各个渲染器会在渲染你的组件之前设置 dispatcher：

```tsx
// React DOM 内部
const prevDispatcher = React.__currentDispatcher
React.__currentDispatcher = ReactDOMDispatcher
let result
try {
  result = YourComponent(props)
} finally {
  // 恢复原状
  React.__currentDispatcher = prevDispatcher
}
```

举个例子， React DOM Server 的实现是在  [这里](https://github.com/facebook/react/blob/ce43a8cd07c355647922480977b46713bd51883e/packages/react-dom/src/server/ReactPartialRendererHooks.js#L340-L354)，还有就是 React DOM 和 React Native 共享的协调器的实现在[这里](https://github.com/facebook/react/blob/ce43a8cd07c355647922480977b46713bd51883e/packages/react-reconciler/src/ReactFiberHooks.js)。

在高级工具用例中，你可以在技术上覆盖 dispatcher，尽管我们不鼓励这种操作。（对于`__currentDispatcher` 这个名字我撒谎了，但是你可以在 React 仓库中找到真实的名字。） 比如说， React DevTools 将会使用  [一个专门定制的 dispatcher](https://github.com/facebook/react/blob/ce43a8cd07c355647922480977b46713bd51883e/packages/react-debug-tools/src/ReactDebugHooks.js#L203-L214) 通过捕获 JavaScript 堆栈跟踪来观察 Hooks 树。请勿模仿。

`updater`字段和`__currentDispatcher`对象都是称为`依赖注入`的通用编程原则的形式。在这两种情况下，渲染器将诸如 setState 之类的功能的实现“注入”到通用的 React 包中，以使组件更具声明性。

使用 React 时，你无需考虑这其中的原理。我们希望 React 用户花更多时间考虑他们的应用程序代码，而不是像依赖注入这样的抽象概念。但是如果你想知道 `this.setState()`或 `useState()` 是如何知道该做什么的，我希望这篇文章会有所帮助。

## 扩展

- [Automatic batching for fewer renders in React 18](https://github.com/reactwg/react-18/discussions/21)

在 react18 中对 setState 做出了改善。现在无论是否在 React 的合成事件中都能做到 `batching`

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

如果不想使用 Automatic batching, 则可以使用 `ReactDOM.flushSync()`

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
