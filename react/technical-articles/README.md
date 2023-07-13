# React 官方文档

- [react](https://github.com/facebook/react)
- [reactjs.org](https://reactjs.org/)
- [react blog](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html)
- [first-class-support-for-promises](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md) React 新的提议

## React 相关作者以及 twitter

- [Dan](https://twitter.com/dan_abramov)
  - [Overreacted](https://overreacted.io/)
  - [whatthefuck.is](https://whatthefuck.is/)
- [Sebastian Markbåge](https://twitter.com/sebmarkbage)
- [Brian Vaughn](https://twitter.com/brian_d_vaughn)
- [Andrew Clark](https://twitter.com/acdlite)
- [Dominic Gannaway](https://twitter.com/trueadm)
- [Sophie Alpert](https://twitter.com/sophiebits) react 前成员
- [Kent C. Dodds](https://twitter.com/kentcdodds) 非 React 成员但是非常熟悉 React
- [Ryan Florence](https://twitter.com/ryanflorence) react router 和 Remix 的作者
- [MICHAEL JACKSON](https://twitter.com/mjackson) react router 和 Remix 的作者

## 必看原理解析

- [对 JS 及 React 的一些讨论/记录的思考-记录了很多 React 团队的相关，值得一看](https://zhuanlan.zhihu.com/p/374450428)
- [inside-fiber-in-depth](https://medium.com/react-in-depth/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react-e1c04700ef6e)
- [[译]深入 React fiber 架构及源码](https://zhuanlan.zhihu.com/p/57346388) 上一篇的翻译
- [[译]深入 React fiber 链表和 DFS](https://zhuanlan.zhihu.com/p/57856350) 另外一篇的翻译
- [In-depth explanation of state and props update in React](https://medium.com/react-in-depth/in-depth-explanation-of-state-and-props-update-in-react-51ab94563311)
- [everything-i-know-about-react-i-learned-from-twitter 必读](https://speakerdeck.com/jenncreighton/everything-i-know-about-react-i-learned-from-twitter)
- [The most important lessons I’ve learned after a year of working with React](https://medium.freecodecamp.org/mindset-lessons-from-a-year-with-react-1de862421981)
- [Scheduling in React 必读](https://philippspiess.com/scheduling-in-react/)
- [React Fiber Deep Dive with Dan Abramov](https://www.youtube.com/watch?v=aS41Y_eyNrU&app=desktop)
- [react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)
- [Didact Fiber: Incremental reconciliation](https://engineering.hexacta.com/didact-fiber-incremental-reconciliation-b2fe028dcaec)
- [Why is React doing this?](https://gist.github.com/sebmarkbage/a5ef436427437a98408672108df01919)
- [build-your-own-react](https://pomb.us/build-your-own-react/)
- [React hooks: The Death of classes and lifecycles?](https://blog.usejournal.com/react-hooks-death-of-classes-and-lifecycles-c8db5956558c)
- [How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data/)
- [Dancing between state and effects - a real-world use case](https://github.com/facebook/react/issues/15240)
- [Using Firebase with React Hooks](https://benmcmahen.com/using-firebase-with-react-hooks/)
- [深入剖析 React Concurrent](https://zhuanlan.zhihu.com/p/60307571) 写的非常棒的一篇文章。

## 其他

- [How to use React.lazy and Suspense for components lazy loading](https://medium.freecodecamp.org/how-to-use-react-lazy-and-suspense-for-components-lazy-loading-8d420ecac58)
- [Cache your React event listeners to improve performance.](https://hackernoon.com/cache-your-react-event-listeners-to-improve-performance-37bda57ac965)
- [React hooks: get the current state, back to the future](https://dev.to/scastiel/react-hooks-get-the-current-state-back-to-the-future-3op2)
- [Hooks, State, Closures, and useReducer](https://adamrackis.dev/state-and-use-reducer/)
- [Dilemmas With React Hooks - Part 1: States And Reducers](https://yearn2learn.netlify.com/dilemmas-with-react-hooks-1)
- [Getting Started with React - An Overview and Walkthrough](https://www.taniarascia.com/getting-started-with-react/)

## React SSR

- [Learning to Appreciate React Server Components](https://dev.to/this-is-learning/learning-to-appreciate-react-server-components-49ka) 作者讲述了对目前 `RSC` 的看法，以及很早 [marko](https://markojs.com/) 已经实现了类似的功能。
- [Making Instagram.com faster: Part 2](https://instagram-engineering.com/making-instagram-com-faster-part-2-f350c8fba0d4) 讲述了 instagram 是如何改造页面的(主要是 server 端配合 browser)，使页面速度变快，并且介绍了 facebook 的做法，非常值得看。[其他的部分](https://medium.com/@mr_sharpoblunto)也很不错。、
- [BigPipe: Pipelining web pages for high performance](https://engineering.fb.com/2010/06/04/web/bigpipe-pipelining-web-pages-for-high-performance/) facebook 对网站优化实现的技术，类似于分块的流，也是比较值得看的。
- [Chunked transfer encoding](https://en.wikipedia.org/wiki/Chunked_transfer_encoding) 流式传输的一种方式，把流分成多块，在 http1 中已经支持，目前很多 ssr 框架都已经支持，目的就是为了快速渲染出头部内容，在头部中的 `link` 以及 `script` 快速加载，而不必等待完成的 html 渲染完成。从而加快可交互的速度。
- [Async Fragments: Rediscovering Progressive HTML Rendering with Marko](https://tech.ebayinc.com/engineering/async-fragments-rediscovering-progressive-html-rendering-with-marko/) 讲述了如何实现流式的渲染即使不使用 `expressjs`以及渐进式相比于非渐进式的好处，与 facebook 的 [bigpipe](https://engineering.fb.com/2010/06/04/web/bigpipe-pipelining-web-pages-for-high-performance/) 都很相似。可以直接查看[在线例子](https://marko-progressive-rendering.herokuapp.com/?renderMode=progressive-out-of-order&jsLocation=middle)
- [React Server Component width Dan](https://dev.to/swyx/an-annotated-guide-to-the-react-server-components-demo-2a83#2021-architecture-qampa-notes)
- [Upgrading Next.js for instant performance improvements](https://vercel.com/blog/upgrading-nextjs-for-instant-performance-improvements) 最新的 Next 是如何做到性能极致的。
- [remixing-react-router](https://remix.run/blog/remixing-react-router) remix 如何与 router 结合。

## RSC

- [RSC From Scratch. Part 1: Server Components](https://github.com/reactwg/server-components/discussions/5)
