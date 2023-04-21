# RSC

## 相关链接

[ReactFlightClient.js#L504](https://github.com/facebook/react/blob/main/packages/react-client/src/ReactFlightClient.js#L504) parseModelString 函数写了每一个前缀的作用，比如 $，@，S 等等。

## 一些解释

### Dan 在 twitter 上的例子

有这样一段代码

```tsx
function Note({ note }) {
  return (
    <Toggle>
      <Details note={note} />
    </Toggle>
}
```

`Toggle` 是唯一的一个客户端组件，它有一个 isOn 的状态，初始化为 false，返回 `<>{isOn ? children : null}</>`

从 Dan 描述的场景，大概写下 Toggle 组件

```tsx
function Toggle({ children }) {
  const [isOn, setIsOn] = useState(false)

  return <>{isOn ? children : null}</>
}
```

如果此时有个按钮点击调用 `setIsOn(true)` 会发生什么？

1. `Details` 组件被请求？
2. `<Details>` 组件立即出现？

现在 `isOn` 的值为 true，你已经编辑了 note 并告诉路由器“刷新”路由。这会重新获取此路由的 RSC 树，并且您的 Note 服务器组件会收到一个带有最新数据库内容的 note 属性。那么

1. Toggle 的状态会被重置？(yes or no)
2. `Details` 展示最新的内容？(yes or no)

一个小转折

```tsx
<Layout left={<Sidebar />} right={<Content />} />
```

都是服务器组件。但现在您想向布局添加一些状态，例如列宽，它会随着鼠标拖动而改变。 你能让 Layout 成为 Client 组件吗？如果是，拖动会发生什么？

1. no, 不被允许
2. 他们在拖拽时都会被重新请求
3. 拖拽时不会重新请求

可以考虑下，上面三种情况，你的答案分别是什么。

---

【问题 1 答案】

`Details` 立即出现。所有 RSC 都在服务器上一次性运行——没有来回（除非你明确地进行路由器刷新或导航）。所以从 Toggle 客户端组件的角度来看，children prop 是 Details 的渲染*输出*。

【问题 2 答案】

客户端状态不会在重新请求时重置。这就像正常的 React 一样工作。如果相同的东西在同一个地方呈现——它的状态在更新期间被保留。没有理由摧毁它。但您*确实*看到了新数据。切换得到新的 children。

【问题 3 答案】

拖动时没有重新请求。 （一般情况下，RSC 树不会重新获取，除非你要求路由器这样做。）从 Layout 客户端组件的角度来看，它的 left 和 right 属性是 Sidebar 和 Content 的 _render output_。所以它一直显示那些。

你可能想知道——它是如何知道渲染 `<Sidebar />` 和 `<Content />` 的？ JSX 急切地调用该他们吗？不完全的。只是当我们尝试渲染 `<Layout>` （在客户端上运行）时，我们序列化了它的 props。在序列化期间，如果我们发现一些 JSX，我们会运行它。
