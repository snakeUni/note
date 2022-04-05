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
