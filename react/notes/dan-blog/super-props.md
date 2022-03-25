# 对 Dan 的博客以及一些 twitter 看完的分析以及侧重点

希望其他人在阅读的时候能够直接提取中心点, 了解 Dan 对 React 的深层次理解。

- [Why Do We Write super(props)?](https://overreacted.io/why-do-we-write-super-props/)

为什么我们要写 super(props) ？部分原话来自 Dan 的博客

为什么需要调用 super ?

---

在 JavaScript 中，super 指的是父类（即超类）的构造函数。值得注意的是，在调用父类的构造函数之前，你是不能在 constructor 中使用 this 关键字的。JavaScript 不允许这个行为。

```tsx
class Checkbox extends React.Component {
  constructor(props) {
    // 🔴  还不能使用 `this`
    super(props)
    // ✅  现在可以了
    this.state = { isOn: true }
  }
  // ...
}
```

一个简单的例子

![xx](./image/blog-1-1.png)

当然了，我们可以通过 [class fields proposal](https://github.com/tc39/proposal-class-fields) 来省略这个声明：

```tsx
class Checkbox extends React.Component {
  state = { isOn: true }
  // ...
}
```

为什么要传入 props ？

---

为了让 React.Component 构造函数能够初始化 this.props，将 props 传入 super 是必须的：

```tsx
// React 內部
class Component {
  constructor(props) {
    this.props = props
    // ...
  }
}
```

这几乎就是真相了 — 确然，它是 [这样做](https://github.com/facebook/react/blob/1d25aa5787d4e19704c049c3cfa985d3b5190e0d/packages/react/src/ReactBaseClasses.js#L22) 的。

但有些扑朔迷离的是，即便你调用 super() 的时候没有传入 props，你依然能够在 render 函数或其他方法中访问到 this.props。（如果你质疑这个机制，尝试一下即可）

那么这是怎么做到的呢？事实证明，React 在调用构造函数后也立即将 props 赋值到了实例上

```tsx
// React 内部
const instance = new YourComponent(props)
instance.props = props
```

这意味着你能够用 super() 代替 super(props) 吗？

最好不要，毕竟这样写在逻辑上并不明确确然，React 会在构造函数执行完毕之后给 this.props 赋值。但如此为之会使得 this.props 在 super 调用一直到构造函数结束期间值为 undefined。

```tsx
// React 內部
class Component {
  constructor(props) {
    this.props = props
    // ...
  }
}

// 你的程式碼內部
class Button extends React.Component {
  constructor(props) {
    super() // 😬 我们忘了传入 props
    console.log(props) // ✅ {}
    console.log(this.props) // 😬 未定义
  }
  // ...
}
```

如果在构造函数中调用了其他的内部方法，那么一旦出错这会使得调试过程阻力更大。**这就是我建议开发者一定执行 super(props) 的原因**，即使理论上这并非必要：

```tsx
class Button extends React.Component {
  constructor(props) {
    super(props) // ✅ 传入 props
    console.log(props) // ✅ {}
    console.log(this.props) // ✅ {}
  }
  // ...
}
```

---

总结：如果使用 class 组件推荐开发者一定执行 super(props)，当然也可以直接按照最新的语法来写, 但是如果主动声明了 constructor 不要忘记使用 super(props)。

其他参考资料(都值得去看)

- [proposal-class-fields](https://github.com/tc39/proposal-class-fields)
- [mdn extends](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/extends)
- [mdn constructor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/constructor)
- [mdn prototype_chain](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

## 扩展

基于 class 的继承是原生默认实现了(实际上只是一个语法糖)，那么能否手写一个继承呢？

假设存在这样的一个父类

```tsx
// 声明一个类
function Person({ name, age }: any) {
  this.name = name
  this.age = age
}

// 原型链添加方法
Person.prototype.add = function add(value: any) {
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

Male.prototype = new Person()

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
