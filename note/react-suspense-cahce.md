# React Suspense Cache

使用 React 最新的 Suspense, 则需要使用 [react-fetch](https://github.com/facebook/react/blob/main/packages/react-fetch/index.js), react-fetch 内部集成了 Cache。我们知道 Suspense 内部通过捕捉 promise 来实现相应的逻辑，因为也衍生出了各个库来兼容 Suspense, 比如 [use-asset](https://github.com/pmndrs/use-asset), [use-suspense-fetch](https://github.com/snakeUni/use-suspense-fetch) 等。

但是目前所有的外部库都没办法做到在 `startTransition` 中调用清空缓存的时候，让 Suspense 保留之前的数据。但是 react-fetch 本身是可以做到的。具体的原因
可以参考 [Built-in Suspense Cache](https://github.com/reactwg/react-18/discussions/25)。

[重点是以及几个步骤](https://github.com/reactwg/react-18/discussions/25#discussioncomment-980435)：

Read first from React's cache.

- i.If so, return the value.
- ii.If not, check the backup (module-level) cache to see if there's one there.
  - a.If so, update React's cache and then return the value
  - b.If not, continue loading and then update both caches

react-fetch 思维导图

![](./image/react-fetch.png)
