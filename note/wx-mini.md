# 小程序开发总结

这几天一直在开发小程序的业务，学习到了好多东西。在这里主要针对开发业务的一些总结。

## 业务思考

1. 在开发业务的时候，需要对业务进行充分的评估，防止到了上线时间才发现某些链路是走不通的，如果没有一些兜底策略，那么就会 delay 这个需求的
   上线流程。那么产品会对你不满意，相应的技术老大也会不满意。

2. 要善用脑图梳理出业务相应的状态节点，当梳理出状态节点就会更加容易的组织代码。千万不要拿到需求就开始无脑的写，好的组织结构的代码不仅可以
   加快写业务的速度，对于后期的维护也是有很大的好处的。

3. 整理完状态后，梳理各个链路的关键节点，当自己不确定某些交互是否可行的时候，一定要及时提出来或者问相关懂的人，这样可以提前发现问题并且解决问题，防止造成需求的 delay。

4. 移动端的研发兼容性问题很重要，稍有不甚，代码就要修改很多很多。

## 额外思考

1. 安抚组员的情绪以及给与其他方面的帮助，当需求上线非常急切，大家又每天不断不断的加班，这样不免会生出异样的情绪，因此一定要安抚一下大家的情绪。

2. 针对每个需求做完后，要有自己的思考和总结，很多人都处于这样一个困境就是做需求做需求做需求，每天不断这样，实际上在每个需求后，需要留出时间对本次的
   需求做出总结以及相应的复盘，这样才能随着一起进步，作为负责人更应该如此。

3. 在经历过长时间的加班战斗后，要为一起奋斗的组员争取一些好处，比如这两天留给大家总结和学习，休息一下。这样大家的就不会陷入需求的死循环中，也不会有其他不好的情绪，也能进步。多赢的结果。

## 技术思考

本地小程序开发主要是使用 `Taro` 来开发小程序，同时也需要编译为 H5，因为在开发中遇到了很多问题，在这里记录一下

### Taro 中 style 如果写的是数字，编译为 H5 则会被抹掉

```tsx
❎  <View style={{ width: 50 }} />
```

此时的 `width` 会被抹掉， 正确的做法写成字符串或者带上单位

```tsx
<View style="width: 50"/>  //✅
<View style={{ width: '50px' }}/> // ✅
```

<!-- TODO -->

至于为什么小程序编译为 h5 会丢失，以及为什么这么处理，后续会在这里进行补充

### Taro 在 effect 中通过 query 的形式会获取不到元素的尺寸信息

小程序和 React 是不同的，在 React 的 useEffect 中，dom 元素已经渲染完成，可以准确拿到 dom 信息。但是在小程序中双线程的缘故, 直接获取是获取
不到元素的信息的，那么在小程序中可以通过 Taro 提供的方法 `Taro.nextTick`, 如果要同时在 H5 中使用可以使用 `setTimeout`。

### 生命周期

[小程序的生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html) 已经很清楚了，微信官方的文档也已经画出来了，不知道的同学可以再次去看。

在使用任何一个框架开发的时候，首先需要知道的就是这个框架的生命周期，虽然 React 已经弱化了生命周期的概念，但是在小程序中还是有的。具体细节全在图中，回到
Taro, 在 Taro 中实现了一套生命周期的钩子和小程序的钩子是一一对应起来的。首先 Taro 初始化项目后一个文件是 `app.ts` 文件，在入口组件中我们可以设置全局状态或访问小程序入口实例的生命周期。

app.ts

```tsx
import { Component } from 'react'
import './app.scss'

class App extends Component {
  componentDidMount() {
    console.log('app mount')
  }

  componentDidShow() {
    console.log('app show')
  }

  componentDidHide() {
    console.log('app hide')
  }

  componentDidCatchError() {}

  // 在入口组件不会渲染任何内容，但我们可以在这里做类似于状态管理的事情
  render() {
    return this.props.children
  }
}

export default App
```

[入口文件](http://taro-docs.jd.com/taro/docs/react#%E5%85%A5%E5%8F%A3%E7%BB%84%E4%BB%B6)

- componentDidMount

页面初次渲染完成时触发，一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。此生命周期可以访问 getCurrentInstance().router。此生命周期可以访问 Taro DOM 并且更改 DOM 或添加事件，`但无法通过 Taro.createSelectorQuery 查找小程序 DOM`。

注意：`无法通过 Taro.createSelectorQuery 查找小程序 DOM`

- componentDidShow

程序启动，或从后台进入前台显示时触发，微信小程序中也可以使用 Taro.onAppShow 绑定监听, 在此生命周期中通过 getCurrentInstance().router.params，可以访问到程序初始化参数。

[页面组件](http://taro-docs.jd.com/taro/docs/react#%E9%A1%B5%E9%9D%A2%E7%BB%84%E4%BB%B6)

- onReady

此组件对应小程序中的 `onReady` 也可以使用 `useReady`。页面首次渲染完毕时执行，此生命周期在小程序端对应小程序页面的 `onReady` 生命周期。从此生命周期开始可以使用 `createCanvasContext` 或 `createselectorquery` 等 API 访问`真实 DOM`。因为如果要访问真实的 DOM 那么就在 onReady 的生命周期中，但是只会触发一次，如果想要更新那就需要额外处理。

- componentDidMount

页面初次渲染完成时触发，一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。此生命周期可以访问 `getCurrentInstance().router`。此生命周期可以访问 Taro DOM 并且更改 DOM 或添加事件，但`无法通过 Taro.createSelectorQuery 查找小程序 DOM`。

- componentDidShow

页面显示/切入前台时触发, 对应 Hook 中的 `useDidShow`。

其他的一些生命周期和 React 中保持一致, 不做过多的阐述。

页面事件处理函数

- onPullDownRefresh 监听用户下拉刷新事件

  - 需要在全局配置的 window 选项中或页面配置中开启 `enablePullDownRefresh`,
  - 可以通过 `Taro.startPullDownRefresh` 触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
  - 当处理完数据刷新后，`Taro.stopPullDownRefresh` 可以停止当前页面的下拉刷新

- onReachBottom 监听用户上拉触底事件

  - 可以在全局配置的 window 选项中或页面配置中设置触发距离 onReachBottomDistance
  - 在触发距离内滑动期间，本事件只会被触发一次

- onPageScroll 监听用户滑动页面事件

- onShareAppMessage

监听用户点击页面内转发按钮（Button 组件 openType='share'）或右上角菜单“转发”按钮的行为，并自定义转发内容。

其他的生命周期钩子可以参考官网, 下面是生命周期钩子的顺序

page/index.tsx

```tsx
export default function Component() {
  const [count, setCount] = useState(0)
  const ref = useRef()
  useDidShow(() => {
    // Taro.showNavigationBarLoading();
    console.log('did show', count)
    // setCount(count + 1)
  })

  usePullDownRefresh(() => {
    console.log('pull down refresh', count)
  })

  useDidHide(() => {
    console.log('did hide', count)
  })

  useReady(() => {
    console.log('did ready', count)
    // setCount(count + 1);
  })

  useEffect(() => {
    console.log('effect', count)
  })

  console.log('render', count)

  return (
    <View className="index" ref={ref} id="adc-11">
      <Text onClick={() => setCount(count + 1)}>Hello world!{count}</Text>
    </View>
  )
}
```

app.ts

```tsx
class App extends Component {
  componentDidMount() {
    console.log('app mount')
  }

  componentDidShow() {
    console.log('app show')
  }

  componentDidHide() {
    console.log('app hide')
  }

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}
```

看一下小程序从 launch 到加载完成的顺序

```shell
app.ts:6 app mount
app.ts:10 app show
index.tsx:45 render 0
index.tsx:24 did show 0
index.tsx:42 effect 0
index.tsx:37 did ready 0
```

可以看出来顺序, `render 0` 对应的是 init, 如果和 React 对应实际上是 `first render`, 所以不要和小程序生命周期中的 `first render` 混淆，因为是
不一样的。然后是 `dis show 0` 对应 `onShow`, effect 是 React 生命周期的钩子, 如果初始化的过程中没有 `setData`, effect 是有可能出现在 `ready` 之后的，但是如果在某个生命周期了调用了 `setData`, ready 一定是在 effect 后面。比如此时在 `didShow` 中调用 `setData`

```tsx
export default function Component() {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useDidShow(() => {
    console.log("did show", count);
    setCount(count + 1);
  });

  ...etc

  return (
    <View className="index" ref={ref} id="adc-11">
      <Text onClick={() => setCount(count + 1)}>Hello world!{count}</Text>
    </View>
  );
}
```

那么此时输出的顺序就是

```shell
app.ts:6 app mount
app.ts:10 app show
index.tsx:48 render 0
index.tsx:24 did show 0
index.tsx:45 effect 0
index.tsx:48 render 1  // 再一次 render
index.tsx:45 effect 1  // 再一次到 effect
index.tsx:40 did ready 1
```

可以看出此时 effect 又执行了，注意 `useEffect` 并没有加依赖，如果增加了空依赖就只会执行一次(参考 React 即可)。
