# React Hack

在写 React 代码的时候经常遇到的一个场景是**跨组件通信**，跨组件通信有多种处理办法，常见的办法有

- 状态提升，把状态提升到两个组件对应的父组件中。
- 使用 context 上下文来处理状态。
- 使用 `useImperativeHandle` 暴露相应的方法出来。

前两个方法都是常见的方法，第三个方法不常见，这次主要是针对第三种方法做的 hack 技巧。

使用第三种方法的常规做法是:

```tsx
// 需要给组件的第二个参数传递 ref
function A(props, ref) {
  useImperativeHandle(ref, () => ({
    // 暴露出 setValue 方法，也可以暴露出其他的方法
    setValue: () => {}
  }))
}

// 使用 forwardRef 包裹
export default React.forwardRef(A)

// B 组件
function B() {
  const ref = useRef()

  // 使用 ref
  return (
    <div>
      <A ref={ref} />
      <button
        onClick={() => {
          // 调用 setValue
          ref.current.setValue('')
        }}
      >
        setValue
      </button>
    </div>
  )
}
```

使用 **useImperativeHandle** 暴露出方法，同时使用 **forwardRef** 对组件进行包裹，对使用该组件的地方传递 ref 到该组件即可。

还有一种 hack 技巧，可以不用每次都声明 ref(慎用)

```tsx
const ref = React.createRef()

// 需要给组件的第二个参数传递 ref
function A(props) {
  useImperativeHandle(ref, () => ({
    // 暴露出 setValue 方法，也可以暴露出其他的方法
    setValue: () => {}
  }))
}

// 使用 forwardRef 包裹
export default A

// B 组件
function B() {
  // 使用 createRef 创建的 ref
  return (
    <div>
      <A />
      <button
        onClick={() => {
          // 调用 setValue
          ref.current.setValue('')
        }}
      >
        setValue
      </button>
    </div>
  )
}
```

通过调用 **createRef** 来创建 ref，使用的地方导入这个 ref 即可。可以参考[例子](https://codesandbox.io/s/keen-wave-kcoxh)
