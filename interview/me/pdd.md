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

- `prototype` 指向一块内存，这个内存里面有共用属性
- `__proto__` 和 `prototype` 指向同一块内存
- `prototype` 是构造函数的属性(构造函数也是对象，因此构造函数也有 `__proto__` 属性)，而 `__proto__` 是对象的属性

可以通过简单例子来看，比如

```ts
function Person() {}

// 构造函数有 prototype，原型上可以挂载很多方法，其中构造函数指向自身。
Person.prototype.constructor === Person

// 实例 Person
const person = new Person()

// 实例话后，对象有 __proto__ 属性，通过 __proto__ 属性来达到链接的作用
person.__proto__ === Person.prototype //因为实例的 __proto__ 和构造函数的 prototype 指向同一处，从而实现方法的集成。

// 同时 Person 构造函数又是对象，因为 Person.__proto__ 继续指向上一层的原型，上一层是对象
Person.prototype.__proto__ === Object.prototype

// 因为对象或者是函数都是通过 __proto__ 属性与上一层的原型进行链接。从而实现原型链。
```

也可以看 React 的一篇文章 [how-does-react-tell-a-class-from-a-function](../../react/notes/dan-blog/how-does-react-tell-a-class-from-a-function.md)

## webpack, rollup 的区别

TODO

## 深度遍历(dfs)和广度遍历(bfs)

[深度优先遍历 和 广度优先遍历](https://juejin.cn/post/6844903807759941646) 这篇文章讲的非常棒，图文的形式来讲解。总结一下

- 深度遍历是通过回溯的形式，可以采取`栈结构`。
- 广度遍历是通过回放的形式，访问过的依然还要访问一遍，可以采取`队列结构`。

## 性能优化

性能优化涉及到很多方面，首先需要了解性能指标，并且从各个指标去优化。具体可以看 [performance](../../performance/notes/performance.md)。

其他手段优化首屏比如使用 SSR。即使是 SSR 也有多种手段来继续优化。

- 优化返回的 html size 大小，越小代表 dom 数量越小，渲染的越快。
- 懒加载，超出屏幕的地方在客户端加载即可。
- 使用流式渲染，可以有效的加快 TTFB，同时可以提前加载一些 js，从而达到 TTI 的加速。
- 渐进式注水，这个比较有难度，但是可以有效的加快 FCP 的时间，但是 LCP 的时间还是要继续等待。
- 内部包统一，避免使用多个版本的包从而导致整体 js 体积增大。

当然也还有一些业务优化的技巧，比如

- 轮播图形式的，只加载第一屏。后续的等到滑动的时候再加载后续的几屏。
- Tab 优化，Tab 可以只加载当前的，当点击下一个 Tab 的时候加载下一个 Tab, 同时再多加载一个 Tab,这样体验也得到了优化。

## get 与 post 的区别

看 [get 与 post 请求的区别是？](https://github.com/BetaSu/fe-hunter/issues/47#issuecomment-1090104352) 就足够了。

## JS 实现并发请求，可以控制请求的数量。并且可以尽快的请求完

```text
实现一个批量请求函数 multiRequest(urls, maxNum)，要求如下：
• 要求最大并发数 maxNum
• 每当有一个请求返回，就留下一个空位，可以增加新的请求
• 所有请求完成后，结果按照 urls 里面的顺序依次打出
```

有题目可知几个重点，并发请求，并且有个数限制和按照次序依次打出，即使后面的先请求完也不能先打印出。列集中方式实现

示例 1：通过递归的形式。所有请求完成后，结果按照 urls 里面的顺序依次打出

```ts
function multiRequest(urls, maxNum) {
  let length = urls.length
  const result = new Array(len).fill(false)
  let count = 0

  return new Promise((resolve, reject) => {
    while (count < maxNum) {
      next()
    }

    function next() {
      let current = count++

      if (current >= length) {
        // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
        !result.includes(false) && resolve(result)
        return
      }
      const url = urls[current]

      fetch(url)
        .then(res => {
          result[current] = res

          if (current < length) {
            next()
          }
        })
        .catch(error => {
          result[current] = error

          if (current < length) {
            next()
          }
        })
    }
  })
}
```

示例 2.1：通过循环的形式。使用 async await

```ts
async function multiRequest(urls, maxNum) {
  const ret = []
  const executing = [] // 存储正在执行的异步任务

  for (const item of urls) {
    const p = fetch(urls)
    ret.push(p)

    if (maxNum <= urls.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)

      // 利用 await 的功能
      if (executing.length >= maxNum) {
        await Promise.race(executing)
      }
    }
  }

  return Promise.all(ret)
}
```

示例 2.1：通过递归的的形式。使用队列的形式，完成就出列。

```ts
function multiRequest(urls, maxNum) {
  let i = 0
  const ret = []
  const executing = []

  const enqueue = () => {
    if (i === urls.length) {
      return Promise.resolve()
    }

    const item = urls[i++]
    const p = fetch(item)
    ret.push(p)

    let r = Promise.resolve()

    if (maxNum <= urls.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)

      if (executing.length >= maxNum) {
        r = Promise.race(executing)
      }
    }

    return r.then(() => enqueue())
  }

  return enqueue().then(() => Promise.all(ret))
}
```

相关文章：

- [JavaScript 中如何实现并发控制？](https://juejin.cn/post/6976028030770610213)
- [字节跳动面试官：请用 JS 实现 AJAX 并发请求控制](https://segmentfault.com/a/1190000038924244)
- [浅析如何实现一个并发请求控制函数并限制并发数](https://www.cnblogs.com/goloving/p/14607625.html)

## 继承的有多少种方式，以及各自的优缺点是啥

基于 class 的继承是原生默认实现了(实际上只是一个语法糖)，那么能否手写一个继承呢？

假设存在这样的一个父类

```ts
// 声明一个类
function Person({ name, age }) {
  this.name = name
  this.age = age
}

// 原型链添加方法
Person.prototype.add = function add(value) {
  this.age += value
}

Person.prototype.log = function log() {
  console.log('name:', this.name, 'age:', this.age)
}
```

### 寄生组合继承(推荐)

**核心：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点**

```tsx
function Male({ name, age }) {
  Person.call(this, { age: age })
  this.name = name
}

// 因为Object.create(Person.prototype)方法返回一个以 Person.prototype 为原型的对象，而不用执行 Person 方法。
Male.prototype = Object.create(Person.prototype)
// 修复原型
Male.prototype.constructor = Male

const male = new Male({ name: '小明', age: 20 })

console.log('male.name:', male.name)
console.log('male.age:', male.age)

male.log()
```

### 组合继承(一般推荐)

**核心：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用**

```tsx
function Male({ name, age }) {
  Person.call(this, { age: age })
  this.name = name
}

Male.prototype = new Person({})

const male = new Male({ name: '小明', age: 20 })

console.log('male.name:', male.name) // "male.name:",  "小明"
console.log('male.age:', male.age) // "male.age:",  20

male.log() // "name:",  "小明",  "age:",  20
console.log('Male.prototype:', Male.prototype.constructor) // 只想的是 person 所以需要修复原型
```

原型修复

```tsx
function Male({ name, age }) {
  Person.call(this, { age: age })
  this.name = name
}

Male.prototype = new Person()
// 原型修复
Male.prototype.constructor = Male

const male = new Male({ name: '小明', age: 20 })
```

缺点：

- 调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）

### 基于原型链的继承(不推荐)

**核心： 将父类的实例作为子类的原型**

```tsx
// 声明一个子类
function Male() {}

Male.prototype = new Person({ name: '小明', age: 20 })

const male = new Male()

console.log('male.name:', male.name) // "male.name:",  "小明"
console.log('male.age:', male.age) // "male.age:",  20

male.log() // "name:",  "小明",  "age:",  20
console.log(male instanceof Person) // true
```

特点：

- 简单，易于实现
- 父类新增原型方法/原型属性，子类都能访问到。

缺点：

- 如果要新增原型属性和方法，必须要在 new Animal()这样的语句之后执行，不能放到构造器中
- 无法实现多继承
- 创建子类实例时，无法向父类构造函数传参(无法像 class 那样)。
- 来自原型对象的引用属性是所有实例共享，修改一处所有的都会被更改。

### 实例继承(不推荐)

**核心：为父类实例添加新特性，作为子类实例返回**

```tsx
function Male({ name, age }: any) {
  const male = new Person({ name, age })
  return male
}
```

但是此时 ts 会报错，所以这种方式不推荐使用。

特点：

- 不限制调用方式，不管是 new 子类()还是子类(),返回的对象具有相同的效果

缺点：

- 实例是父类的实例，不是子类的实例
- 不支持多继承

## Object.create 过程

`Object.create()` 方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`。 （请打开浏览器控制台以查看运行结果。）

比如

```ts
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`)
  }
}

const me = Object.create(person)

me.name = 'Matthew' // "name" is a property set on "me", but not on "person"
me.isHuman = true // inherited properties can be overwritten

me.printIntroduction()
// expected output: "My name is Matthew. Am I human? true"
```

此时 `me.__proto__ = person`

可以自己实现一个 `Object.create`

```ts
function create(proto, propertiesObject) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object: ' + proto)
  } else if (proto === null) {
    throw new Error(
      "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."
    )
  }

  if (typeof propertiesObject !== 'undefined')
    throw new Error(
      "This browser's implementation of Object.create is a shim and doesn't support a second argument."
    )

  function F() {}
  F.prototype = proto
  return new F()
}
```

- [Object.create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

## http 缓存 & 前端缓存

### 前端缓存

前端缓存主要会使用 `localStorage` 以及 `sessionStorage`，这两个的区别是 `localStorage` 会一直保存着信息知道用户主动清楚。会保存到内存中。但是 `sessionStorage` 只作用域当前窗口，关闭后 `sessionStorage` 就会被清除。他们都有大小的限制，大约 `5MB`，这两个统称为 `webStorage`。当这两个都无法满足的时候，通常会使用 `indexDB` 来代替，`indexDB` 没有大小的限制。但是正常情况下，用到 `indexDB` 的地方不是很多，`webStorage` 已经足够使用。但是如果想做离线缓存啥的，数据量特别大的时候可以考虑使用 `indexDB`。

### http 缓存

[http 缓存](../../server/notes/http-cache.md)

## 讲讲 JIT 和 AOT

区别: 主要区别在于是否在“运行时”进行编译.

优劣: AOT 优点： 1.在程序运行前编译,可以避免在运行时的编译性能消耗和内存消耗. 2.可以在程序运行初期就达到最高性能. 3.可以显著的加快程序的启动. AOT 缺点： 1.在程序运行前编译会使程序安装的时间增加. 2.牺牲 Java 的一致性. 3.将提前编译的内容保存会占用更多的外存.

JIT 优点： 1.可以根据当前硬件情况实时编译生成最优机器指令(ps:AOT 也可以做到,在用户使用是使用字节码根据机器情况在做一次编译). 2.可以根据当前程序的运行情况生成最优的机器指令序列. 3.当程序需要支持动态链接时,只能使用 JIT. 4.可以根据进程中内存的实际情况调整代码,使内存能够更充分的利用. JIT 缺点： 1.编译需要占用运行时资源,会导致进程卡顿. 2.由于编译时间需要占用运行时间,对于某些代码的编译优化不能完全支持,需要在程序流畅和编译时间之间做权衡. 3.在编译准备和识别频繁使用的方法需要占用时间,使得初始编译不能达到最高性能.

混合编译: Android N 引入了使用编译+解释+JIT 的混合运行时,以获得安装时间,内存占用,电池消耗和性能之间的最佳折衷. 优点: 即使是大型应用程序的安装时间也减少到几秒钟. 系统更新安装得更快,因为它们不需要优化步骤. 应用程序的 RAM 占用空间较小,在某些情况下降至 50％. 改善了表现. 降低电池消耗.

## 常见的安全问题

[web safe](../../other-note/basic/web-safe.md)

## 跨域问题以及处理方法

## 如何理解 EventLoop

这两篇对事件循环讲的很透彻。

- [Node.js 事件循环](http://nodejs.cn/learn/the-nodejs-event-loop) 将的非常清楚。 因为它阐明了 Node.js 如何做到异步且具有非阻塞的 I/O，所以它基本上阐明了 Node.js 的“杀手级应用”，正是这一点使它成功了。
- [详解 JavaScript 中的 Event Loop（事件循环）机制](https://zhuanlan.zhihu.com/p/33058983)
- [浏览器与 Node 的事件循环(Event Loop)有何区别?](https://zhuanlan.zhihu.com/p/54882306) 详细的讲解了浏览器和 NodeJs Event Loop 的区别。但是文章里的 Node 版本偏低，最新的版本已经与浏览器行为一致。

## 在浏览器中输入 url 到页面展示中间发生了什么

只要知道浏览器的工作原理，也就知道输入 url 到页面展示会发生什么了。

- [渲染页面：浏览器的工作原理](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)
- [浏览器输入 url 到页面展示的全过程](https://juejin.cn/post/7016593221815910408#heading-12)

## 讲出防抖和节流的区别，分别实现

防抖：在事件被触发 n 秒后 , 再次执行回调 ; 如果 n 秒内触发 , 重新计时 ;。通常用于控制按钮点击造成多次请求。

节流：高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。

如何更好的记住这两者的区别呢？

防抖：王者的回城类似防抖机制，可以随时被打断，一旦被打断需要重新回城。

节流：英雄的平 A 操作，平 A 次数的多少取决了攻击速度的快慢。

### debounce 相关实现

`debounce` 实现

```ts
function debounce(fn: () => void, delay) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      })
    }
  }
}
```

`useDebounce` 实现

```ts
function useDebounce(
  fn: (...args: any[]) => void,
  wait: number = 0,
  debounceProps?: { immediate: boolean }
) {
  let timeout = useRef<any>(null)
  const debounced: any = function (...args: Array<any>) {
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      fn.apply(this, args)
      timeout.current = null
    }, wait)
  }

  return debounced
}
```

`useDebounceValue` 实现

```ts
function useDebounceValue<T = any>(value: T, delay: number = 0) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const debounce = useDebounce(() => {
    setDebouncedValue(value)
  }, delay)

  useEffect(() => {
    debounce()
  }, [value])

  return debouncedValue
}
```

### throttle 相关实现

```ts
function throttle(fn: () => void, time: number) {
  let timer = null
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      }, time)
    }
  }
}
```

本次实现是有问题的，因为无法第一次执行，不妨再次改造

```ts
function throttle(fn: () => void, time: number) {
  let timer = null,
    inThrottle = false
  return function () {
    if (!inThrottle) {
      fn.apply(this, arguments)
      inThrottle = true
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, arguments)
          timer = null
        }, time)
      }
    }
  }
}
```

目前第一次就可以执行回调函数了，但是当点击第二次的时候无法在规定的 `time` 内执行，因为执行 `setTimeout` 也是在 `time` 时间后，因此需要一个时间来计时。

```ts
// 针对时间回调执行的开始在 time 内
function throttle(fn: () => void, time: number) {
  let inThrottle = false,
    lastFn = null,
    lastTime = 0

  return function () {
    if (!inThrottle) {
      fn.apply(this, arguments)
      inThrottle = true
      lastTime = Date.now() // 注意这里
    } else {
      clearTimeout(lastFn)

      lastFn.current = setTimeout(() => {
        if (Date.now() - lastTime >= time) {
          lastTime = Date.now() // 注意这里
          fn.apply(this, arguments)
        }
      }, Math.max(wait - (Date.now() - lastTime), 0)) // 注意这里
    }
  }
}
```

这个实现看起来是没啥问题的，但是可能会出现一种情况，固定时间间隔内执行，但是回调的执行时间不确定，可能会导致两次回调执行的时间非常接近，也有可能导致两次回调的执行时间是 `2 * time`。因此还是需要用时间进行记录回调的真正`执行完成时刻`(其实 throttle 没有一个准确的定义，也可以说是每次函数开始执行的时间在 `time` 内即可，通常函数执行会非常快，因为这里的时间记录放在前后是一样的，除非情况很特殊)。

```ts
// 针对时间回调执行的结束在 time 内
function throttle(fn: () => void, time: number) {
  let inThrottle = false,
    lastFn = null,
    lastTime = 0

  return function () {
    if (!inThrottle) {
      fn.apply(this, arguments)
      inThrottle = true
      lastTime = Date.now()
    } else {
      clearTimeout(lastFn)

      lastFn.current = setTimeout(() => {
        if (Date.now() - lastTime >= time) {
          fn.apply(this, arguments)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}
```

`useThrottle`

```ts
function useThrottle(fn: (...arg: any[]) => any, wait: number = 0) {
  const inThrottle = useRef(false)
  const lastFn = useRef<any>()
  const lastTime = useRef(0)

  return function (...arg: any[]) {
    if (!inThrottle.current) {
      fn(...arg)
      lastTime.current = Date.now()
      inThrottle.current = true
    } else {
      clearTimeout(lastFn.current)

      lastFn.current = setTimeout(function () {
        if (Date.now() - lastTime.current >= wait) {
          fn(...arg)
          lastTime.current = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime.current), 0))
    }
  }
}
```

`useThrottleValue`

```ts
function useThrottleValue<T = any>(value: T, time = 0) {
  const [throttledValue, setThrottledValue] = useState(value)

  const throttle = useThrottle(() => {
    setThrottledValue(value)
  }, time)

  useEffect(() => {
    throttle()
  }, [value])

  return throttledValue
}
```

至此 `throttle` 是实现以及 `debounce` 的实现均已完全搞定。

## 二叉树的遍历

- 先(前)序遍历：根结点 ---> 左子树 ---> 右子树
- 中序遍历：左子树---> 根结点 ---> 右子树
- 后序遍历：左子树 ---> 右子树 ---> 根结点
- 层序遍历：每一层从左向右的方式进行遍历

### 先(前)序遍历

```ts
function dfs(root: TreeNode): number[] {
  const res = []
  const loop = (root: TreeNode) => {
    if (!root) return
    res.push(root.val)
    loop(root.left)
    loop(root.right)
  }

  loop(root)
  return res
}
```

### 中序遍历

```ts
function dfs(root: TreeNode): number[] {
  const res = []
  const loop = (root: TreeNode) => {
    if (!root) return
    loop(root.left)
    res.push(root.val)
    loop(root.right)
  }

  loop(root)
  return res
}
```

### 后序遍历

```ts
function dfs(root: TreeNode): number[] {
  const res = []
  const loop = (root: TreeNode) => {
    if (!root) return
    loop(root.left)
    loop(root.right)
    res.push(root.val)
  }

  loop(root)
  return res
}
```

### 总结

总结一下，在二叉树的前序、中序、后序遍历中，递归实现的伪代码为：

![1](https://pic.leetcode-cn.com/5536f7c9458480bdeb66712b111041af4e5a3507e571c50082737c650b4d8d62.png)

迭代实现的伪代码为：

![2](https://pic.leetcode-cn.com/bf35476ff3cc603e6ca44757f444525d3bb17f4dd059c17e4e7c1ff6533eedc9.png)

## NodeJs 流 & web Streams

- [understanding-streams-in-nodejs](https://nodesource.com/blog/understanding-streams-in-nodejs) 讲解了 NodeJs 中的几个常见的流。讲的很透彻。
- [web streams](../../daily-study/2021-11-16.md)

## TCP 协议的三次握手和四次分手

- [通俗大白话来理解 TCP 协议的三次握手和四次分手](https://github.com/jawil/blog/issues/14) 对 TCP 三次和四次握手的讲解，很透彻。

## 聊聊 BFC (Block Formatting Context)

- [块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context) 结合例子来理解会更加的透彻。
