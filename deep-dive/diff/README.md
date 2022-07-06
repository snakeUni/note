# React Diff And Vue Diff

深入解析 React Diff 以及 Vue Diff 的相关算法。

## React Diff

React Diff 的文章有很多，一些不错的文章都放在了下面。如果想根据源码一行一行解读的可以看 [React 源码揭秘 3 Diff 算法详解](https://juejin.cn/post/6844904167472005134)。这篇文章里的代码和 React 最新的 Diff 代码相差不大。本质上通过一个例子就可以完全了解目前 React 的 Diff。

```text
old abcd
new adbc

---

=== 第一轮遍历开始 ===

对比 old 和 new 的，此时 a 的 old 和 new 的 key 是相同的，可以复用， lastPlacedIndex = 0

继续遍历...

b(old) vs d(new)

key 发生改变，不能复用，跳出第一轮遍历。此时 lastPlacedIndex = 0

=== 第一轮遍历结束 ===

=== 第二轮遍历开始 ===

newIdx 从 1 开始，因此可以假设 newChildren为 dbc，oldFiber = bcd

将 oldFiber(bcd) 保存到 map 中，key 为 fiber 的 key，值为 fiber。可参考 mapRemainingChildren

继续遍历剩余的 newChildren

key === d 在 oldFiber 中存在。

const oldIndex = d(old).index // 在 old 中 d 的 index = 3
比较 oldIndex 与 lastPlacedIndex 如果 oldIndex < lastPlacedIndex 代表该节点需要向右移动，保持 lastPlacedIndex 不变，否则将 oldIndex 赋值给 lastPlacedIndex 即 lastPlacedIndex = oldIndex(源码中是返回 oldIndex)

在本例子中，oldIndex = 3, lastPlacedIndex = 0, 因此 oldIndex > lastPlacedIndex，d 保持不变，并设置 lastPlacedIndex = 3

继续遍历剩余的 newChildren

// 当前 oldFiber = bc，newChildren = bc
key === b 在 oldFiber 中存在，此时 oldIndex = b(old).index = 1
oldIndex < lastPlacedIndex 因此需要向右移动, lastPlacedIndex 保持不变

继续遍历剩余的 newChildren
key === c 在 oldFiber 中存在，此时 oldIndex = c(old).index = 2
oldIndex < lastPlacedIndex 因此需要向右移动

=== 第二轮遍历结束 ===

最终 bc 两个节点需要移动
```

## 相关文章

- [React 源码揭秘 3 Diff 算法详解](https://juejin.cn/post/6844904167472005134)
- [源码](https://github.com/facebook/react/blob/bd081376665f5f081dcf4bf72f06b7e563c8046d/packages/react-reconciler/src/ReactChildFiber.new.js#L736)
- [源码解析](https://github.com/BetaSu/big-react/blob/master/packages/react-reconciler/ReactChildFiber.js#L265)
- [为什么 React 的 Diff 算法不采用 Vue 的双端对比算法？](https://juejin.cn/post/7116141318853623839)
- [解析 Vue3.0 的 dom-diff 核心算法——最长递增子序列](https://kinyaying.github.io/%E8%A7%A3%E6%9E%90Vue3.0%E7%9A%84dom-diff%E6%A0%B8%E5%BF%83%E7%AE%97%E6%B3%95%E2%80%94%E2%80%94%E6%9C%80%E9%95%BF%E9%80%92%E5%A2%9E%E5%AD%90%E5%BA%8F%E5%88%97/)
- [vue diff 源码](https://github.com/vuejs/core/blob/540e26f49c09edf09b6a60ac2a978fdec52686bf/packages/runtime-core/src/renderer.ts#L2353-L2392)
