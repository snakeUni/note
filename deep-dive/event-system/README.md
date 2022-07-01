# Event System

事件系统，业务开发中只要需要与用户进行交互，那么事件是必不可少的，dom 中存在很多事件，比如 `click`，`scroll`，`focus` 等等。我们将深入事件系统中，以及事件中常用的一些操作比如 `preventDefault` 和 `stopPropagation`。同时了解事件分发，以及 `capturing` 和 `bubbling`。本文将会有大量的例子。

## capturing and bubbling

dom 是一个 tree 模型，当事件进行传播的时候会沿着 dom 的结构进行传播。

事件对象被分派到 event target，但是开始分派之前，必须首先确定事件对象的传播路径。下面这张图呈现出了 event flow。

![event-flow](./eventflow.svg)

[事件传播路径](https://www.w3.org/TR/DOM-Level-3-Events/#propagation-path)是事件通过的当前事件目标的有序列表。这个传播路径反映了文档的层次树结构。列表中的最后一项是 event target，列表中前面的项称为目标的祖先，紧接在前面的项称为目标的父项。

一旦确定了传播路径，事件对象就会经过一个或多个事件阶段。共有三个事件阶段：[capture phase](https://www.w3.org/TR/DOM-Level-3-Events/#capture-phase)，[target phase](https://www.w3.org/TR/DOM-Level-3-Events/#target-phase) 和 [bubble phase](https://www.w3.org/TR/DOM-Level-3-Events/#bubble-phase)。如果不支持某个阶段，或者事件对象的传播已停止，则该阶段将被跳过。例如，如果将 `bubble` 属性设置为 false， 则将跳过 bubble 阶段，如果在调度之前调用了 `stopPropagation`，则将跳过所有阶段。事件对象将会完成如下三个阶段：

- **capture 阶段**：事件对象通过目标的祖先从 window 传播到目标的父级。此阶段也称为捕获阶段。
- **target 阶段**：事件对象到达事件对象的事件目标。此阶段称为目标阶段。如果事件类型表明事件没有冒泡，则事件对象将在此阶段完成后停止。
- **bubble 阶段**：事件对象以相反的顺序通过目标的祖先传播，从目标的父级开始，到 window 结束。此阶段也称为冒泡阶段。

假设存在这样一个 html 片段

```html
<html>
  <body>
    <div id="A">
      <div id="B">
        <div id="C"></div>
      </div>
    </div>
  </body>
</html>
```

给 C 增加一个监听器，第三个参数为 true 代表开启了捕获。

```js
document.getElementById('C').addEventListener(
  'click',
  function (e) {
    console.log('#C was clicked')
  },
  true
)
```

当用户点击 C 的时候，捕获阶段的分发流是

`window` => `document` => `html` => `body` => ... => `目标对象的父`

target 阶段就是目标对象

冒泡阶段的事件流是

`目标对象父` => ... => `body` => `html` => `document` => `window`

使用一个具体的例子来看看总体效果，[查看例子的代码](./demo/bubbling-capturing.html)

html 片段

```html
<html>
  <body>
    <div id="A">
      <div id="B">
        <div id="C"></div>
      </div>
    </div>
  </body>
</html>
```

js 片段

```js
// 捕获阶段
document.addEventListener(
  'click',
  function (e) {
    console.log('click on document in capturing phase')
  },
  true
)
// document.documentElement == <html>
document.documentElement.addEventListener(
  'click',
  function (e) {
    console.log('click on <html> in capturing phase')
  },
  true
)
document.body.addEventListener(
  'click',
  function (e) {
    console.log('click on <body> in capturing phase')
  },
  true
)
document.getElementById('A').addEventListener(
  'click',
  function (e) {
    console.log('click on #A in capturing phase')
  },
  true
)
document.getElementById('B').addEventListener(
  'click',
  function (e) {
    e.stopPropagation()
    console.log('click on #B in capturing phase')
  },
  true
)
document.getElementById('C').addEventListener(
  'click',
  function (e) {
    console.log('click on #C in capturing phase')
  },
  true
)

// 冒泡阶段
document.addEventListener(
  'click',
  function (e) {
    console.log('click on document in bubbling phase')
  },
  false
)
// document.documentElement == <html>
document.documentElement.addEventListener(
  'click',
  function (e) {
    console.log('click on <html> in bubbling phase')
  },
  false
)
document.body.addEventListener(
  'click',
  function (e) {
    console.log('click on <body> in bubbling phase')
  },
  false
)
document.getElementById('A').addEventListener(
  'click',
  function (e) {
    console.log('click on #A in bubbling phase')
  },
  false
)
document.getElementById('B').addEventListener(
  'click',
  function (e) {
    console.log('click on #B in bubbling phase')
  },
  false
)
document.getElementById('C').addEventListener(
  'click',
  function (e) {
    console.log('click on #C in bubbling phase')
  },
  false
)
```

console 的输出取决于点击哪个元素。如果点击 C 元素，将会看到如下输出

```js
click on document in capturing phase
click on <html> in capturing phase
click on <body> in capturing phase
click on #A in capturing phase
click on #B in capturing phase
click on #C in capturing phase
click on #C in bubbling phase
click on #B in bubbling phase
click on #A in bubbling phase
click on <body> in bubbling phase
click on <html> in bubbling phase
click on document in bubbling phase
```

也可以其他元素，比如点击 A 元素，将会看到如下输出

```js
click on document in capturing phase
click on <html> in capturing phase
click on <body> in capturing phase
click on #A in capturing phase
click on #A in bubbling phase
click on <body> in bubbling phase
click on <html> in bubbling phase
click on document in bubbling phase
```

## event.stopPropagation()

当调用它时，从那时起，事件将停止传播到它本来会传播到的任何元素。这适用于两个方向(捕获和冒泡)。因此，如果您在捕获阶段的任何地方调用 `stopPropagation`，事件将永远不会到达目标阶段或冒泡阶段。如果在冒泡阶段调用它，它以及经历了捕获阶段，但它会从你调用它的点组织冒泡。

用上述相同的例子，在 B 元素的捕获阶段调用 `stopPropagation`

```js
document.getElementById('B').addEventListener(
  'click',
  function (e) {
    // 阻止事件传播
    e.stopPropagation()
    console.log('click on #B in bubbling phase')
  },
  false
)
```

此时点击 C 元素，输出如下

```js
click on document in capturing phase
click on <html> in capturing phase
click on <body> in capturing phase
click on #A in capturing phase
click on #B in capturing phase
```

可以看出到达 B 元素的捕获阶段就停止了。

如果在 A 元素的冒泡阶段调用 `stopPropagation` 会如何呢? 修改代码

```js
document.getElementById('A').addEventListener(
  'click',
  function (e) {
    e.stopPropagation()
    console.log('click on #A in bubbling phase')
  },
  false
)
```

点击 C 元素，输出如下

```js
click on document in capturing phase
click on <html> in capturing phase
click on <body> in capturing phase
click on #A in capturing phase
click on #B in capturing phase
click on #C in capturing phase
click on #C in bubbling phase
click on #B in bubbling phase
click on #A in bubbling phase
```

可以在冒泡阶段的 A 元素后就停止了冒泡。

## event.stopImmediatePropagation

`stopImmediatePropagation()` 方法阻止监听同一事件的其他事件监听器被调用。[相关例子](./demo/stopImmediatePropagation.html)

如果多个事件监听器被附加到相同元素的相同事件类型上，当此事件触发时，它们会按其被添加的顺序被调用。如果在其中一个事件监听器中执行 `stopImmediatePropagation()` ，那么剩下的事件监听器都不会被调用。

看如下例子

```html
<html>
  <body>
    <div id="A">I am the #A element</div>
  </body>
</html>
```

```js
document.getElementById('A').addEventListener(
  'click',
  function (e) {
    console.log('When #A is clicked, I shall run first!')
  },
  false
)

document.getElementById('A').addEventListener(
  'click',
  function (e) {
    console.log('When #A is clicked, I shall run second!')
    e.stopImmediatePropagation()
  },
  false
)

document.getElementById('A').addEventListener(
  'click',
  function (e) {
    console.log(
      'When #A is clicked, I would have run third, if not for stopImmediatePropagation'
    )
  },
  false
)
```

给 A 元素的点击事件增加了 3 个监听器，但是在第二个监听器出调用了 `stopImmediatePropagation`，点击 A 元素，输出如下

```js
When #A is clicked, I shall run first!
When #A is clicked, I shall run second!
```

可以看出第三次的监听器并没有执行。并且永远不会被执行，因为在第二次的内部调用了 `stopImmediatePropagation`

## event.preventDefault()

顾名思义就是阻止默认行为。这个不是很好理解，一般什么样的元素会存在默认行为呢？

比如使用 `a` 标签，a 标签上有 `href` 属性

```js
<a id="avett" href="https://www.baidu.com">
  bai du
</a>
```

正常点击 `bai du` 会跳转到百度的页面，但是如果增加 `event.preventDefault()` 会如何呢？

```js
document.getElementById('avett').addEventListener(
  'click',
  function (e) {
    e.preventDefault()
    console.log(
      'Maybe we should just play some of their music right here instead?'
    )
  },
  false
)
```

当点击 `bai du` 后，页面并没有发生跳转，而是输出了

```js
Maybe we should just play some of their music right here instead?
```

可以看出 a 标签的默认行为已经被停止了。

其他的默认行为比如 form 的 submit，通过在 button 上增加属性 `type="submit"` 可以默认触发 form 的 `submit` 函数，这种也可以通过调用 `preventDefault()` 函数来禁止掉默认行为。
