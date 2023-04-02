<details>
  <summary>能说一下 React Server Component 的原理吗？</summary>
  
  React Server Components (RSC) 是 React 团队提出的一种新的服务器端渲染技术，其目的是优化 React 在服务器端的性能表现。RSC 的核心原理是在服务器端运行 React 组件，并且支持在客户端对其进行透明的缓存和复用。

具体来说，RSC 的原理可以概括为以下几点：

1. 服务器端运行 React 组件：传统的服务器端渲染技术是在服务器上将 React 组件渲染成 HTML，然后发送给客户端。而 RSC 则是在服务器上直接运行 React 组件，并将其渲染成字符串形式的输出。这样可以避免在客户端重新运行组件，提高性能和响应速度。

2. 支持缓存和复用：由于 RSC 在服务器端运行 React 组件，因此可以支持对其进行缓存和复用，避免重复渲染和计算。RSC 通过在组件上添加特殊的注释来标识其可缓存和可复用的状态，从而提高性能和响应速度。

3. 客户端透明：RSC 不会影响客户端代码的编写方式，客户端可以像往常一样使用 React 组件进行开发。当客户端需要渲染一个已经在服务器端运行过的组件时，RSC 会自动将其缓存的结果返回给客户端，从而避免重新运行组件。

总的来说，RSC 的核心原理是在服务器端运行 React 组件，并支持缓存和复用，从而提高性能和响应速度。同时，RSC 通过透明的方式实现了客户端和服务器端的无缝衔接，让开发者可以更加方便地使用 React 进行服务器端渲染。

</details>

<details>
<summary>实现一个 mini React ？</summary>
要实现一个 mini React，需要了解 React 的核心概念和特性。以下是一个简单的实现：

```js
// React element类，用于描述虚拟DOM
class Element {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

// createElement函数，用于创建React element
function createElement(type, props, ...children) {
  return new Element(type, props, children)
}

// render函数，用于将React element渲染为真实DOM
function render(element, container) {
  const dom =
    element.type === 'text'
      ? document.createTextNode(element.props.nodeValue)
      : document.createElement(element.type)

  // 将props设置为DOM元素的属性
  Object.keys(element.props).forEach(key => {
    dom[key] = element.props[key]
  })

  // 递归渲染子元素
  element.children.forEach(child => render(child, dom))

  // 将DOM元素插入到容器中
  container.appendChild(dom)
}

// Component类，用于自定义React组件
class Component {
  constructor(props) {
    this.props = props
    this.state = {}
  }

  setState(partialState) {
    // 合并state并触发更新
    this.state = { ...this.state, ...partialState }
    this.update()
  }

  update() {
    // 重新渲染组件
    const element = this.render()
    this.dom.parentNode.replaceChild(element, this.dom)
    this.dom = element
  }

  mount(container) {
    // 初始化渲染组件
    const element = this.render()
    render(element, container)
    this.dom = element
  }
}

// 示例组件
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return createElement(
      'div',
      {},
      createElement('h1', {}, `Count: ${this.state.count}`),
      createElement('button', { onClick: this.handleClick }, 'Increment')
    )
  }
}

// 初始化应用
const app = new App()
app.mount(document.getElementById('root'))
```

</details>
