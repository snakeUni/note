# 一次处理业务报错之旅

最近因为业务需要处理业务报错的情况，其中就遇到了一个奇怪的点。明明业务是在用 `Promise` 的时候主动 catch 了，但是仍然会被 [unhandledRejection](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event) 捕获，于是本人带着好奇心决定去探索一番。

首先在网上搜索也有人遇到了[相同的问题](https://stackoverflow.com/questions/64336083/unexpected-unhandledrejection-event-for-promise-which-rejection-does-get-handled) 我们分别从别人遇到的几个例子出发，来探讨什么情况下会导致 promise 即使被 catch 后仍然会存在被全局 [unhandledRejection](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event) 捕获。

例子 1

```ts
const process = require('process')

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
  // 应用程序特定的日志记录，在此处抛出错误或其他逻辑
})

function delay(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function f1() {
  await delay(100)
  throw new Error('error f1')
}

async function f2() {
  await delay(200)
  throw new Error('error f2')
}

async function main() {
  // start all at once
  const [p1, p2] = [f1(), f2()]
  try {
    await p2
    // do something after p2 is settled
    await p1
    // do something after p1 is settled
  } finally {
    await p1.catch(e => console.warn(`caught on p1: ${e.message}`))
    await p2.catch(e => console.warn(`caught on p2: ${e.message}`))
  }
}

main().catch(e => console.warn(`caught on main: ${e.message}`))
```

以上代码会打印如下：

```text
Unhandled Rejection at: Promise {
  <rejected> Error: error f1
      at f1 (/Users/fox/Desktop/my-github/note/other-note/bits-of-knowledge/catch-promise/index.js:14:9)
} reason: Error: error f1
    at f1 (/Users/fox/Desktop/my-github/note/other-note/bits-of-knowledge/catch-promise/index.js:14:9)
caught on p1: error f1
caught on p2: error f2
caught on main: error f2
(node:30118) PromiseRejectionHandledWarning: Promise rejection was handled asynchronously (rejection id: 1)
(Use `node --trace-warnings ...` to show where the warning was created)
```

从结果可以看出顺序如下

- `unhandledRejection` 捕获到 f1。
- `p1.catch` 捕获到 p1 的错误。
- `p2.catch` 捕获到 p2 的错误。
- `main` 捕获到 p2 的错误。

首先我们先分析代码

- f1 和 f2 执行抛出错误
- 执行 `try`，此时 `await p2` 会抛出错误，下面的 await p1 不会执行，因为 p1 的错误被 `unhandledRejection` 捕获，抛出错误。
- 执行 `finally`，p1 和 p2 分别 catch 到自己的错误
- `await p2` 的错误被外部的 `main().catch` 捕获。

因此上述代码按正常角度理解是完全 ok 的。再看例子 2

例子 2

```ts
const process = require('process')

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
  // 应用程序特定的日志记录，在此处抛出错误或其他逻辑
})

async function main() {
  const p1 = Promise.reject(new Error('Rejected!'))
  await p1
}

main().catch(e => console.warn(`caught on main: ${e.message}`))
```

结果如下

```text
caught on main: Rejected!
```

例子 2 是常规的 promise 在内部没有捕获，在外面捕获到，因此最后被 `main().catch` 捕获。再看例子 3

例子 3

```ts
const process = require('process')

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
  // 应用程序特定的日志记录，在此处抛出错误或其他逻辑
})

async function main() {
  const p1 = Promise.reject(new Error('Rejected!'))
  await Promise.resolve(r => queueMicrotask(r))
  // or we could just do: await Promise.resolve();
  await p1
}

main().catch(e => console.warn(`caught on main: ${e.message}`))
```

结果如下

```text
caught on main: Rejected!
```

正常理解是没有问题的，即使内部有 `queueMicrotask` 这个微任务，但是仍然在内部没有捕获 `promise`，所以最后被外部的 `main().catch` 捕获正常。再看例子 4

例子 4

```ts
const process = require('process')

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
  // 应用程序特定的日志记录，在此处抛出错误或其他逻辑
})

async function main() {
  const p1 = Promise.reject(new Error('Rejected!'))
  await new Promise(r => setTimeout(r, 0))
  await p1
}

main().catch(e => console.warn(`caught on main: ${e.message}`))
```

例子 4 与例子 3 唯一的不用之处是，例子 3 中使用的是 `queueMicrotask`，而例子 4 中使用的是 `setTimeout`。总的看起来这两个没有什么不同，就是宏任务和微任务的区别罢了。但是结果却不一样。

结果如下：

```text
Unhandled Rejection at: Promise {
  <rejected> Error: Rejected!
      at main (/Users/fox/Desktop/my-github/note/other-note/bits-of-knowledge/catch-promise/index.js:9:29)
      at Object.<anonymous> (/Users/fox/Desktop/my-github/note/other-note/bits-of-knowledge/catch-promise/index.js:14:1)
      at Module._compile (internal/modules/cjs/loader.js:1063:30)
      at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
      at Module.load (internal/modules/cjs/loader.js:928:32)
      at Function.Module._load (internal/modules/cjs/loader.js:769:14)
      at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
      at internal/main/run_main_module.js:17:47
} reason: Error: Rejected!
    at main (/Users/fox/Desktop/my-github/note/other-note/bits-of-knowledge/catch-promise/index.js:9:29)
    at Object.<anonymous> (/Users/fox/Desktop/my-github/note/other-note/bits-of-knowledge/catch-promise/index.js:14:1)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
caught on main: Rejected!
(node:30810) PromiseRejectionHandledWarning: Promise rejection was handled asynchronously (rejection id: 1)
(Use `node --trace-warnings ...` to show where the warning was created)
```

是不是非常意外！首先错误会被外部的 `unhandledRejection` 捕获，然后才会被 `main().catch` 捕获。再看例子 5

例子 5

```ts
const process = require('process')

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
  // 应用程序特定的日志记录，在此处抛出错误或其他逻辑
})

async function main() {
  const p1 = Promise.reject(new Error('Rejected!'))
  p1.catch(console.debug) // observe but ignore the error here
  try {
    await new Promise(r => setTimeout(r, 0))
  } finally {
    await p1 // throw the error here
  }
}

main().catch(e => console.warn(`caught on main: ${e.message}`))
```

结果如下

```text
Error: Rejected!
    at main (/Users/fox/Desktop/my-github/note/other-note/bits-of-knowledge/catch-promise/index.js:9:29)
    at Object.<anonymous> (/Users/fox/Desktop/my-github/note/other-note/bits-of-knowledge/catch-promise/index.js:18:1)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
caught on main: Rejected!
```

从例子 3 和例子 4 以及例子 5 可以看出，在宏任务和微任务的表现下是否会被外部 `unhandledRejection` 捕获到是不一样的。

个人认为这是因为 `setTimeout` 是一个宏任务，这个可能会导致在下一次 eventLoop 中执行，所以之前被 `rejected` 的 p1 就会先被外部的 `unhandledRejection` 捕获，然后再被 `main().catch` 捕获。这也就是例子 4 的结果了。而例子 5 是因为主动调用了一次 `p1.catch` 因此没有被外部的 `unhandledRejection` 捕获。

补充下：[Node.js 内部是如何捕获异步错误的？](https://zhuanlan.zhihu.com/p/62210238) 解释了 `unhandledRejection` 的执行时机。

> 每次 Tick 完成后，会执行并清空 Tock 队列，然后检查有没有异步错误，再触发 unhandledRejection 事件的回调。也就是说 unhandledRejection 的回调是在 Tick 和 Tock 队列都被清空之后进行。

因此上述例子 3 和例子 4 也就解释的清楚了。
