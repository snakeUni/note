# Context

在使用 React Context 的时候遇到的问题就是 context 是无法 `bail out`，所以只要使用 `context` 的地方都会被重新渲染，比如

```js
const context = React.createContext()

const [count, setCount] = useState(0)

<context.Provider value={{ count, setCount }}>
  {children}
</context.Provider>

const A = () => {
  const { count } = React.useContext(context)
}
```

这是 hook 的 context 的常见用法，但是只用使用了 context 那么这个组件在 `Provider` 渲染的时候就一定会造成渲染，那么当存在多个这样组件的时候，修改顶部的
值必然也会造成其他组件的 `render`, 这个对于很多组件来说是没有必要的，太多的渲染肯定会造成一定的性能问题的，所以如何解决这样的问题呢？？

肯定有人这样说，把 context 的值转换成 `props` 在传递给子组件，这个是一种方式。比如下面的例子

```js
const A = () => {
  const { state } = useContext(context);
  return <XXX {...state} />;
};
```

那此时 A 组件仍然会重新渲染，但是对于时间消耗长的都在 `XXX` 组件中了，对于 `XXX` 组件只有 `props` 或者内部的 `state` 发生变化才会渲染，所以这样做在一定的程度上提升了性能，但是该 `render` 的组件仍然会 `render`, 比如 A 组件仍然每次都会 `render`

有没有其他的方式可以解决呢？在 `React-Redux` 中，内部做了类似观察者模式的方式，采取订阅的方式进行更新。具体内部实现可以自行看代码，下面贴一些对于这块知识点比较重要的参考资料

- [Why calculateChangedBits = () => 0](https://github.com/dai-shi/reactive-react-redux/issues/29)
- [reactive-react-redux](https://github.com/dai-shi/reactive-react-redux)
- [changedBits 源码](https://github.com/facebook/react/blob/9b0bd43550206e04bfe9ca695e5981eff0e2d03f/packages/react-reconciler/src/ReactFiberBeginWork.js#L2304)
- [Provide more ways to bail out inside Hooks](https://github.com/facebook/react/issues/14110)
- [Preventing rerenders with React.memo and useContext hook.](https://github.com/facebook/react/issues/15156)
- [useContext derivation performance issue ](https://github.com/reactjs/rfcs/issues/87)
- [React-Redux Roadmap: v6, Context, Subscriptions, and Hooks](https://github.com/reduxjs/react-redux/issues/1177)
- [Accept calculateChangedBits as a prop on Context.Providers](https://github.com/reactjs/rfcs/pull/60)
- [Bitmasks and the new React Context API](https://hph.is/coding/bitmasks-react-context)
- [Investigate use of context + observedBits for performance optimization](https://github.com/reduxjs/react-redux/issues/1018)
