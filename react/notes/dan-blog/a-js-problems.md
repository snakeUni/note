# A JS Problems - answer/explain

本篇主要是来自 Dan 的 [twitter](https://twitter.com/dan_abramov/status/1492880870499360769)，翻译全部来自 google 翻译。

## [what is "this"](https://twitter.com/dan_abramov/status/1492897309662887937)

it’s like a hidden argument to your function. calls with dot, like obj.fn(), pass the part before the dot (obj) as this. calls without a dot, like fn(), don’t pass any this. if you didn’t pass any this, it’s set to a default (undefined in strict mode, window in loose mode).

> 它就像你的函数的一个隐藏参数。带点的调用，如 obj.fn()，将点 (obj) 之前的部分作为 this 传递。没有点的调用，如 fn()，不传递任何 this。如果你没有传递任何这个，它被设置为默认值（在严格模式下未定义，在松散模式下为 window）。

### 补充阅读

- _[this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)_
- _[深入理解 js this 绑定 ( 无需死记硬背，尾部有总结和面试题解析 )](https://segmentfault.com/a/1190000011194676)_
- _[面试官问：JS 的 this 指向](https://segmentfault.com/a/1190000017510043)_
- _[【建议 👍】再来 40 道 this 面试题酸爽继续(1.2w 字用手整理)](https://juejin.cn/post/6844904083707396109)_

## [what are closures](https://twitter.com/dan_abramov/status/1492888036098678786)

functions can read or write variables “outside” of them. this works not only with top level variables, but with local variables too (from nested functions). that’s called closures.

> 函数可以在它们“外部”读取或写入变量。这不仅适用于顶级变量，也适用于局部变量（来自嵌套函数）。这就是所谓的闭包。

### 补充阅读

```tsx
let searchQuery = ...
let results = items.filter(item => item.startsWith(searchQuery))

without closures this wouldn’t work because you wouldn’t be able to use searchQuery from the nested function. that’s what a closure is
```

- _[闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)_

## [what are generators](https://twitter.com/dan_abramov/status/1492902276150837251)

generators let your function return multiple values. not necessarily immediately — the caller decides when to ask for the next one. useful to describe operations where you can “ask for more”, like processing a long list or deciding each next step based on user input

> 生成器让您的函数返回多个值。不一定立即 - 呼叫者决定何时要求下一个。用于描述您可以“要求更多”的操作，例如处理长列表或根据用户输入决定每个下一步

### 补充阅读

- _[迭代器和生成器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)_

## [what is currying](https://twitter.com/dan_abramov/status/1492884092391727109)

imagine functions only take one argument. how would we pass many? one way is to pass an object: ({ a, b, c }) => … but we could also turn our function into a matryoshka of many functions where each takes one arg: (a) => (b) => (c) => … that’s currying. not very useful in js.

> 想象函数只接受一个参数。我们怎么会通过很多？一种方法是传递一个对象： ({ a, b, c }) => ... 但我们也可以将我们的函数变成一个包含许多函数的套娃，其中每个函数都有一个 arg： (a) => (b) => ( c) => ...那是柯里化。在 js 中不是很有用。

## [what is bind()](https://twitter.com/dan_abramov/status/1492928546490232835)

"this" is a hidden argument to your function. "bind" wraps a function with the "this" you provide so that you don’t need to remember to pass the correct "this" every time

> “this”是您的函数的隐藏参数。 "bind" 用你提供的 "this" 包装一个函数，这样你就不需要记住每次都传递正确的 "this"

### 补充阅读

- _[Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)_
- _[this、apply、call、bind](https://juejin.cn/post/6844903496253177863)_
- _[JS 中的 call、apply、bind 方法详解](https://segmentfault.com/a/1190000018270750)_

## [what are monads](https://twitter.com/dan_abramov/status/1492910191658086403)

it’s an abstraction but a very generic one so hard to describe. i’d describe it as “wrapper for a value which lets you apply operations on that value, producing more such wrappers”. promise then(), if we skip minor pedantic distinctions, are an example of that.

> 这是一种抽象，但非常通用，很难描述。我将其描述为“一个值的包装器，它允许您对该值应用操作，产生更多这样的包装器”。如果我们跳过轻微的迂腐区别，promise then() 就是一个例子。

### 补充阅读

the reason people from functional languages get excited about them is because they usually have special syntax for applying monads that turns ugly code into pretty code. similar to promise .then() chains vs async/await. except monads are more generic and cover other use cases

## [what is event loop](https://twitter.com/dan_abramov/status/1492943677123178504)

event loop is a set of rules for how the runtime (browser / Node) decides what code to run when it has finished running the current code. for example “okay we’ve exited all functions, so now, let’s run expired timeouts”. that includes code after “await” if the thing has resolved

> 事件循环是一组规则，用于运行时（浏览器/节点）在运行完当前代码后如何决定运行什么代码。例如“好的，我们已经退出了所有函数，所以现在，让我们运行过期的超时”。如果事情已经解决，则包括“等待”之后的代码

### 补充阅读

- _[并发模型与事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)_
- _[详解 JavaScript 中的 Event Loop（事件循环）机制](https://zhuanlan.zhihu.com/p/33058983)_
- _[The Node.js Event Loop, Timers, and process.nextTick()](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)_

## [when to use classes instead of factory functions](https://twitter.com/dan_abramov/status/1492929669410217993)

if you want people to extend your classes (to fill in some functionality) then it seems like it’s easier to do this with actual classes.

> 如果您希望人们扩展您的类（以填充某些功能），那么使用实际类似乎更容易做到这一点。

## [questions about “vdom”](https://twitter.com/dan_abramov/status/1492918879059955723)

i think the community should stop using “vdom” as a term because people mean completely different ideas by it, and it really has nothing to do with the dom. i can’t answer your question because i don’t know what you mean by vdom

> 我认为社区应该停止使用“vdom”作为一个术语，因为人们用它来表达完全不同的想法，而且它真的与 dom 无关。我无法回答您的问题，因为我不知道您所说的 vdom 是什么意思

## [var vs let vs const](https://twitter.com/dan_abramov/status/1492928804288925708)

var is useless and we can pretend it doesn’t exist. out of let/const, use the one your colleagues don’t hate

> var 是无用的，我们可以假装它不存在。在 let/const 之外，使用你的同事不讨厌的那个

### 补充阅读

- _[let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)_
- _[var、let、const 区别？](https://www.jianshu.com/p/4e9cd99ecbf5)_

## [what is hoisting](https://twitter.com/dan_abramov/status/1492890006968578048)

before executing your code in the order you wrote it, javascript “pulls up” two types of declarations:

function bla() {}
var bla

to the top of the containing function (or file if you’re at top level). this lets yiu call a function declared this way even if it’s defined below.

> 在按照您编写代码的顺序执行代码之前，javascript“拉起”两种类型的声明： `function bla() {} var bla` 到包含函数的顶部（或文件，如果你在顶层）。这让 yiu 调用以这种方式声明的函数，即使它在下面定义。

### 补充阅读

- _[Hoisting（变量提升）](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)_

## [use cases for WeakMap/WeakSet](https://twitter.com/dan_abramov/status/1492898353167884288)

associate some information with an object i don’t own. like a memoization cache. weakmap is good for this because it doesn’t hold onto it, so i’m not causing a memory leak. the tradeoff is i can’t iterate over the list of objects for which i hold information.

> 将一些信息与我不拥有的对象相关联。就像一个记忆缓存。 weakmap 对此有好处，因为它不会保留它，所以我不会导致内存泄漏。权衡是我不能遍历我持有信息的对象列表。

### 补充阅读

- _[WeakMap and WeakSet](https://javascript.info/weakmap-weakset)_
- _[WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)_
- _[第 4 题：介绍下 Set、Map、WeakSet 和 WeakMap 的区别？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/6)_
- _[Set 和 Map 数据结构](https://es6.ruanyifeng.com/#docs/set-map)_
