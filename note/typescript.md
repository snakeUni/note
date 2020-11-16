# 不可变

当我们在开发 React 代码的时候，很多情况下都希望申明的变量是不可变的。比如

```ts
const config = {
  initData: 10,
  otherData: {
    enable: true
  }
}
```

修改 config

```ts
config.otherData.enable = false
```

但是我们并不希望是这样，我们可以在 config 的后面加上 `as const` 就可以实现 config 的不可变

```ts
const config = {
  initData: 10,
  otherData: {
    enable: true
  }
} as const
```

此时会被声明为

```ts
declare const config: {
  readonly initData: 10
  readonly otherData: {
    readonly enable: true
  }
}
```

此时在修改 `config` 对象就会报错，[实际效果展示](https://twitter.com/stackblitz/status/1326890872961720320)。

# 数组类型

在写一个函数的时候需要返回数组，但是此时数组中会有 `string` 或 `number` 比如

```ts
function getX() {
  const a = '1'
  const b = 2
  return [a, b]
}
```

如果此时调用 `getX()` 取数组中的某个下标具体值的时候，将无法准确的判断是 `string` 或 `number` 会统一提示为 `string | number`

```ts
const result = getX()

// aStr 会提示为 string | number
const aStr = result[0]
// bNum 会提示为 string | number
const bNum = result[1]
```

此时只需要在返回值加上 `as const` 即可实现准确的提示, [参考例子](https://twitter.com/stackblitz/status/1325818478675304448)

```ts
function getX() {
  const a = '1'
  const b = 2
  return [a, b] as const
}
```
