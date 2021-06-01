# 自动埋点

埋点是一个常见的需求，就是在函数里面上报一些信息。像一些性能的埋点，每个函数都要处理，很繁琐。能不能自动埋点呢？

答案是可以的。埋点只是在函数里面插入了一段代码，这段代码不影响其他逻辑，这种函数插入不影响逻辑的代码的手段叫做函数插桩。

我们可以基于 babel 来实现自动的函数插桩，在这里就是自动的埋点。

比如这样一段代码：

```ts
import aa from 'aa'
import * as bb from 'bb'
import { cc } from 'cc'
import 'dd'

function a() {
  console.log('aaa')
}

class B {
  bb() {
    return 'bbb'
  }
}

const c = () => 'ccc'

const d = function () {
  console.log('ddd')
}
```

我们要实现埋点就是要转成这样：

```ts
import _tracker2 from 'tracker'
import aa from 'aa'
import * as bb from 'bb'
import { cc } from 'cc'
import 'dd'

function a() {
  _tracker2()

  console.log('aaa')
}

class B {
  bb() {
    _tracker2()

    return 'bbb'
  }
}

const c = () => {
  _tracker2()

  return 'ccc'
}

const d = function () {
  _tracker2()

  console.log('ddd')
}
```

有两方面的事情要做：

- 引入 `tracker` 模块。如果已经引入过就不引入，没有的话就引入，并且生成个唯一 id 作为标识符
- 对所有函数在函数体开始插入 tracker 的代码

[代码](https://github.com/QuarkGluonPlasma/babel-plugin-exercize/blob/master/exercize-auto-track/src/plugin/auto-track-plugin.js)
