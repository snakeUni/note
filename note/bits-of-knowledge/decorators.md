# 装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 装饰器使用 @expression 这种形式，expression 求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

## 装饰器工厂

如果我们要定制一个修饰器如何应用到一个声明上，我们得写一个装饰器工厂函数。 装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。

定义一个装饰器工厂函数：

```tsx
function color(value: string) {
  // 这是一个装饰器工厂
  return function (target) {
    //  这是装饰器
    // do something with "target" and "value"...
  }
}
```

## 装饰器组合

多个装饰器可以同时应用到一个声明上：

- 书写在一行上

```tsx
@f @g x
```

- 书写在多行上

```tsx
@f
@g
x
```

当多个装饰器应用于一个声明上，它的求值方式和复合函数相似。在这个模型下，当复合 f 和 g 时，复合的结果`(f ∘ g)(x)`等同于 `f(g(x))`。

在 TypeScript 里，当多个装饰器应用在一个声明上时会进行如下步骤的操作：

1. 由上至下依次对装饰器表达式求值。
2. 求值的结果会被当作函数，由下至上依次调用。

通过下面的例子来观察它们求值的顺序：

```tsx
function f() {
  console.log('f(): evaluated')
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('f(): called')
  }
}

function g() {
  console.log('g(): evaluated')
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('g(): called')
  }
}

class C {
  @f()
  @g()
  method() {}
}
```

打印结果：

```js
f(): evaluated
g(): evaluated
g(): called
f(): called
```

类中不同声明上的装饰器将按以下规定的顺序应用：

1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
3. 参数装饰器应用到构造函数。
4. 类装饰器应用到类。

### 类装饰器

类装饰器在类声明之前被声明（紧靠着类声明）。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。

类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。

如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。

使用类装饰器的例子：

```tsx
@sealed
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}
```

定义`@sealed`装饰器：

```tsx
function sealed(constructor: Function) {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}
```

### 方法装饰器

方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。

方法装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的属性描述符。

如果方法装饰器返回一个值，它会被用作方法的属性描述符。

下面是一个方法装饰器（`@enumerable`）的例子：

```tsx
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }

  @enumerable(false)
  greet() {
    return 'Hello, ' + this.greeting
  }
}
```

我们可以用下面的函数声明来定义`@enumerable`装饰器：

```tsx
function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value
  }
}
```
