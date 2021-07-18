# 一次拖动问题的思考

之前为自己的业务封装了 useDrag 的自定义拖动的 hook, 在 pc 上是完美运行的。但是后来移动端的同学也要使用，移动端同学使用后发现在拖动元素时，元素下的背景也会拖动了。这在移动端也就是
滑动穿透。

看一下之前的写法

```jsx
useEffect(() => {
  const handleDown = () => {
    // 可拖动的节点
    if (nodeRef.current) {
      nodeRef.current.addEventListener('touchmove', handleMove, {
        passive: false
      })
    }
  }

  if (nodeRef.current) {
    nodeRef.current.addEventListener('touchstart', handleDown, {
      passive: false
    })
  }
}, [])

const handleMove = e => {
  e.preventDefault()

  // 其他逻辑
  ...etc
}
```

在按下手指的时候加上 `touchmove` 事件。但是这样在移动端仍然是有问题的，为了解决问题，第一个版本是在 `touchstart` 时也禁用掉默认事件。

```jsx
const handleDown = e => {
  e.preventDefault()
  // 可拖动的节点
  if (nodeRef.current) {
    nodeRef.current.addEventListener('touchmove', handleMove, {
      passive: false
    })
  }
}
```

这样在移动端是没有问题了，在移动元素的时候，底部也不会跟随移动。但是移动端的同学想要在可拖动的元素上增加一个 `click` 事件。

```jsx
function Demo() {
  const getNode = useDrag()

  return (
    <div ref={getNode} onClick={() => console.log('click')}>
      拖动元素
    </div>
  )
}
```

移动端同学发现这个点击事件无法触发，因为 useDrag 在 `touchstart` 的事件中调用了 `event.preventDefault()`，因此这就导致了 click 事件失效。既然失效，那又不能去掉(最初的想法)
`event.preventDefault()`，那就模拟一个 click 事件。在 useDrag 中就多了这样的一串代码。

```jsx
const handleTouchEnd = () => {
  props.onClick?.()
}
```

这是一个 hack 的手段解决了 click 问题。后来移动端同学又遇到了一个场景就是可拖动的元素上还有其他的点击事件，这样其他的点击事件也无法触发了。

```jsx
function Demo() {
  const getNode = useDrag()

  return (
    <div ref={getNode} onClick={() => console.log('click')}>
      <div onClick={() => console.log('click2')}>可点击元素</div>
      拖动元素
    </div>
  )
}
```

那么该如何解决这个问题呢？

再次回头看之前的代码，现在去掉 `touchstart` 事件中的 `event.preventDefault()`, 又恢复到了之前背景跟着元素一起滚动的情况了。看起来是在 touchmove 的时候，内部的 `event.preventDefault()` 并没有生效，但是为什么没有生效呢？难道是事件注册的时机晚了？

基于上面的分析，决定把 `touchmove` 提前注册

```jsx
useEffect(() => {
  const handleDown = () => {
    // 可拖动的节点
    if (nodeRef.current) {
      nodeRef.current.addEventListener('touchend', handleMove, {
        passive: false
      })
    }
  }

  if (nodeRef.current) {
    nodeRef.current.addEventListener('touchstart', handleDown, {
      passive: false
    })
    nodeRef.current.addEventListener('touchmove', handleMove, {
      passive: false
    })
  }
}, [])

const handleMove = e => {
  e.preventDefault()

  // 其他逻辑
  ...etc
}
```

再次运行发现上述的问题就解决了，并且点击事件也没有问题了。

我把这个消息告诉给移动端的同学可以自定义 click 事件了，可是过了几天后，pc 端的同学来反映，为啥在拖动元素结束的时候也会触发 click 事件呢？

这就比较奇怪了，移动端在拖动的过程中不会触发，为啥 pc 会触发呢？因为 pc 的监听器是加在 window 上，而移动端是加在拖动的元素上。因此在 pc 端拖动送来鼠标的
时候仍然会触发 click 事件。

于是我去看了下比较出名的开源库 [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) 的做法，他们是在拖动的过程中给元素加上
`point-events: none` 来禁止点击事件，拖动结束在把这个属性给删掉。那修改下代码

```jsx
const setPointEvent = pointerEvents => {
  if (node.current) {
    node.current.style.pointerEvents = pointerEvents
  }
}

const handleMove = e => {
  e.preventDefault()

  setPointEvent('none')

  // 其他逻辑
  ...etc
}

const handleEnd = () => {
  setPointEvent('initial')
}
```

至此移动端和 pc 端的拖动问题都已经解决了。
