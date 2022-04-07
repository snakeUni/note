# Question

## React 的 Diff 算法？

关于 React 的 Diff 算法有几篇文章将的很好，其中两篇一个是 React 作者写的，一个是官网，通过这几篇可以知道 React 是如何做 Diff 的。

- [React 源码剖析系列 － 不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379)
- [将 React 作为 UI 运行时(重要，强烈推荐)](https://overreacted.io/zh-hans/react-as-a-ui-runtime/)
- [Preserving and Resetting State(重要，强烈推荐)](https://beta.reactjs.org/learn/preserving-and-resetting-state)

相关的内部规则：

如果相同的元素类型在同一个地方先后出现两次，React 会重用已有的[宿主实例](https://overreacted.io/zh-hans/react-as-a-ui-runtime/#%E5%AE%BF%E4%B8%BB%E5%AE%9E%E4%BE%8B)。同样的启发式方法也适用于子树。例如，当我们在 `<dialog>` 中新增两个 `<button>` ，React 会先决定是否要重用 `<dialog>` ，然后为每一个子元素重复这个决定步骤。

列表情况比较特殊，如果列表被重新排序了，，`React` 只会看到所有的 p 以及里面的 input 拥有相同的类型，并不知道该如何移动它们。（在 React 看来，虽然这些商品本身改变了，但是它们的顺序并没有改变。）

所以 React 会对这十个商品进行类似如下的重排序：

```ts
for (let i = 0; i < 10; i++) {
  let pNode = formNode.childNodes[i]
  let textNode = pNode.firstChild
  textNode.textContent = 'You bought ' + items[i].name
}
```

React 只会对其中的每个元素进行更新而不是将其重新排序。这样做会造成性能上的问题和潜在的 bug 。_例如，当商品列表的顺序改变时，原本在第一个输入框的内容仍然会存在于现在的第一个输入框中 — 尽管事实上在商品列表里它应该代表着其他的商品！（这就是所谓的串行）_

这就是为什么每次当输出中包含元素数组时，React 都会让你指定一个叫做 key 的属性。需要注意的是 key 只与特定的父亲 React 元素相关联。React 并不会去匹配父元素不同但 key 相同的子元素。（React 并没有惯用的支持对在不重新创建元素的情况下让宿主实例在不同的父元素之间移动。）

> Fibers 是局部状态真正存在的地方。当状态被更新后，React 将其下面的 Fibers 标记为需要进行协调，之后便会调用这些组件。

## 微前端的工作原理？

微前端是解决巨石应用而出的一门技术。类似于后端的微服务技术。微服务把整个应用拆分一个一个小的服务，服务之前互相不干扰，独立部署。微前端实际上也是类似的技术，将整个大的应用拆分为一个一个小的应用。通过主容器去加载每一个子应用。子应用不用区分技术栈，无论是 React 应用还是 Vue 应用都可以。通过主容器加载子容器的 `html` 文件，然后解析出相应的 `js`，`css` 链接。如果是内联的则通过 `<style>` 的形式插入。如果不是则可以用过 `fetch` 去请求对应的资源。当然不同的框架各自的方式是不一样的。有的框架仍然在使用 `iframe` 的形式，比如腾讯的一个微前端框架就是如此。目前微前端的框架有很多。具体想知道每个框架的作用，可以参考以下。如果是内部自己做的话，完全可以不用去解析 html，而是直接把相关的 js 和 css 链接放在一个 `manifest.json` 文件中，在加载对应子目录的时候加载相应的 js 和 css 即可。

- [micro-frontends](https://github.com/neuland/micro-frontends)
- [micro-app](https://github.com/micro-zoe/micro-app)
- [garfish](https://github.com/modern-js-dev/garfish)
- [qiankun](https://github.com/umijs/qiankun)

## http2 和 http1 的区别

http2 特点：

- 有效压缩 HTTP 标头字段将协议开销降至最低。
- 增加对请求优先级和服务器推送的支持。
- (核心)新的二进制分帧层。

HTTP/2 将 HTTP 协议通信分解为二进制编码帧的交换，这些帧对应着特定数据流中的消息。所有这些都在一个 TCP 连接内复用。 这是 HTTP/2 协议所有其他功能和性能优化的基础。

在 HTTP/1.x 中，如果客户端要想发起多个并行请求以提升性能，则必须使用多个 TCP 连接。Http2 则不同

将 HTTP 消息分解为独立的帧，交错发送，然后在另一端重新组装是 HTTP 2 最重要的一项增强。事实上，这个机制会在整个网络技术栈中引发一系列连锁反应，从而带来巨大的性能提升，让我们可以:

- 并行交错地发送多个请求，请求之间互不影响。
- 并行交错地发送多个响应，响应之间互不干扰。
- 使用一个连接并行发送多个请求和响应。
- 不必再为绕过 HTTP/1.x 限制而做很多工作（请参阅针对 HTTP/1.x 进行优化，例如级联文件、image sprites 和域名分片。
- 消除不必要的延迟和提高现有网络容量的利用率，从而减少页面加载时间。
- 等等…

HTTP/2 中的新二进制分帧层解决了 HTTP/1.x 中存在的队首阻塞问题，也消除了并行处理和发送请求及响应时对多个连接的依赖。 结果，应用速度更快、开发更简单、部署成本更低。

有了新的分帧机制后，HTTP/2 不再依赖多个 TCP 连接去并行复用数据流；每个数据流都拆分成很多帧，而这些帧可以交错，还可以分别设定优先级。 因此，所有 HTTP/2

大多数 HTTP 传输都是短暂且急促的，而 TCP 则针对长时间的批量数据传输进行了优化。 通过重用相同的连接，HTTP/2 既可以更有效地利用每个 TCP 连接，也可以显著降低整体协议开销。 不仅如此，使用更少的连接还可以减少占用的内存和处理空间，也可以缩短完整连接路径（即，客户端、可信中介和源服务器之间的路径） 这降低了整体运行成本并提高了网络利用率和容量。 因此，迁移到 HTTP/2 不仅可以减少网络延迟，还有助于提高通量和降低运行成本。

### 相关文章

- [一文读懂 HTTP/2 特性](https://zhuanlan.zhihu.com/p/26559480)
- [HTTP/2 简介](https://developers.google.com/web/fundamentals/performance/http2?hl=zh-cn)

## 原型链

[JS 中 \_\_proto\_\_ 和 prototype 存在的意义是什么？](https://www.zhihu.com/question/56770432/answer/315342130) 这个回答的非常好。

```text
prototype 指向一块内存，这个内存里面有共用属性

__proto__ 指向同一块内存

prototype 和 __proto__ 的不同点在于

prototype 是构造函数的属性(构造函数也是对象，因此构造函数也有 __proto__ 属性)，而 __proto__ 是对象的属性
```

## webpack, rollup 的区别
