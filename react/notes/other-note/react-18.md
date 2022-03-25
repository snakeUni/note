# React-18 发布有感

## 相关文章

- [React 18 就要来了，来看看发布计划](https://zhuanlan.zhihu.com/p/379072979) 黄玄大佬发布的一些有感
- [reactwg-react18](https://github.com/reactwg/react-18/discussions)

## css

1. [suffixable opaque identifiers](https://github.com/reactjs/rfcs/pull/32#discussion_r419501533)
2. [opaque identifier lists](https://github.com/facebook/react/issues/18594)
3. [Bug: Can't hydrate useOpaqueIdentifier generated object in another component](https://github.com/facebook/react/issues/20127) (though I haven't checked back if this still repros, writing a test now)

## ssr

- [Upgrading to React 18 on the server](https://github.com/reactwg/react-18/discussions/22)
- [New Suspense SSR Architecture in React 18](https://github.com/reactwg/react-18/discussions/37) 讲述了目前的 ssr 有哪些问题。

`renderToString` to `pipeToNodeWritable` to unlock the new features. [check demo](https://codesandbox.io/s/github/facebook/react/tree/master/fixtures/ssr2?file=/server/render.js)

```ts
import { pipeToNodeWritable } from 'react-dom/unstable-fizz'
```

`Suspense` 会有所改变，因为在 react17 中使用 Suspense 在 server 端会报错，但是在 react18 中做了特殊的处理，在服务端会渲染 Suspense 的 `fallback`,
并且在客户端 js 加载后立即渲染 `Suspense` 中的内容。

[Behavioral changes to Suspense in React 18](https://github.com/reactwg/react-18/discussions/7)

下面是一些例子

- [Suspense 在 17 中的例子](https://codesandbox.io/s/keen-banach-nzut8?file=/src/App.js)
- [Suspense 在 18 中的例子](https://codesandbox.io/s/romantic-architecture-ht3qi?file=/src/fakeApi.js)

目前 Suspense 还没有集成 fetch ，但是可以使用内部提供的 react-fetch 也可以使用已有的 cache 封装自己的 fetch。

`Suspense` 的心智模型就像 `try catch` 一样，嵌套会被内部的优先捕捉到。

> The nested <Suspense> is how you opt into them being cascading! If you don't want them to cascade, then remove the inner one altogether: https://codesandbox.io/s/recursing-mclaren-1ireo?file=/src/index.js

The mental model is the same as try / catch. If you don't want a nested error handler, remove it, and let the outer one handle it.

- [react-fetch example](https://codesandbox.io/s/zealous-cloud-2mxfe?file=/src/App.js)
- [Cache](https://github.com/reactwg/react-18/discussions/25)

## autoBatch

[autoBatch](https://github.com/reactwg/react-18/discussions/21) 包含了最新的调度逻辑

## QA

- [concurrent 是如何工作的](https://github.com/reactwg/react-18/discussions/27) 讲的非常棒

## 其他记录

React18 的发布支持了最新的 [SuspenseSSR](https://github.com/reactwg/react-18/discussions/37) 用来实现渐进式的 ssr 分片。

支持了 [automatic batching](https://github.com/reactwg/react-18/discussions/21) React 18 则会对任何来源的 setState 做尽可能多的 batching。

支持了[渐进式的升级](https://reactjs.org/blog/2021/06/08/the-plan-for-react-18.html)

### createRoot

[createRoot Discussions](https://github.com/reactwg/react-18/discussions/5)

#### What are the differences?

There are a few reasons we changed the API.

First, this fixes some of the ergonomics of the API when running updates. As shown above, in the legacy API, you need to continue to pass the container into render, even though it never changes. This also mean that we don’t need to store the root on the DOM node, though we still do that today.

Second, this change allows us to remove the hydrate method and replace with with an option on the root; and remove the render callback, which does not make sense in a world with partial hydration.
