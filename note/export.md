# Node 中 exports 与 module.exports 有什么区别

可以参考 https://juejin.im/post/5f1787a75188252e5c57867a

最主要的源码部分

```js
const dirname = path.dirname(filename)
const require = makeRequireFunction(this, redirects)
let result
// 从这里可以看出来 exports 的实质
const exports = this.exports
const thisValue = exports
const module = this

if (requireDepth === 0) statCache = new Map()
if (inspectorWrapper) {
  result = inspectorWrapper(
    compiledWrapper,
    thisValue,
    exports,
    require,
    module,
    filename,
    dirname
  )
} else {
  // 这里是模块包装函数
  result = compiledWrapper.call(
    thisValue,
    exports,
    require,
    module,
    filename,
    dirname
  )
}
```

比如 `a.js`

```js
module.exports = 100
exports = 10
```

在 `b.js` 中引入

```js
const a = require('a.js')

console.log(a)
```

执行 `b.js` 则输出是 100

在看一下 tsc 对 ts 编译的输出，比如 `c.ts`

```ts
const a = 1
const b = 2

export default a

export { b }
```

经过编译后为 `c.js`

```js
'use strict'
exports.__esModule = true
exports.b = void 0
var a = 1
var b = 2
exports.b = b
exports['default'] = a
```
