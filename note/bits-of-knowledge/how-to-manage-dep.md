# 如何更好的管理请求依赖

> 本文全部的代码都是以 React 为例子

在业务中会有诸多场景需要多请求的依赖进行管理，比如多 Tab, 筛选或者其他很多的场景都会涉及到请求的依赖。与其说是请求的依赖，不如说是请求的参数，那么如何更好从处理多参数的场景呢？

比如存在这样一个场景

<img src="./image/1.png"/>

这是一个基础的筛选场景，可以根据顶部的 tab 进行筛选，也可以点击底部的分页器进行分页。

初步分析下，表格中的数据会受到几个因素的影响

- tab 的值会影响表格展示的品类。
- 分页器用来加载更多的数据。

经过分析后，我们可能会写出这样的代码：

```tsx
import * as React from 'react'
// 假设已经封装好了这样的组件
import Filter from './filter'

export function FilterTable() {
  // 目前只有两个依赖 1. page 2. type
  const [request, setRequest] = React.useState({
    page: 1,
    pageSize: 10,
    type: 'apple'
  })
  // 表格的数据源
  const [dataSource, setDataSource] = React.useState([])

  const handleQuery = nextRequest => {
    setRequest(nextRequest)
    query(nextRequest).then(res => {
      setDataSource(nextRequest)
    })
  }

  React.useEffect(() => {
    query(request).then(res => {
      setDataSource(nextRequest)
    })
  }, [])

  return (
    <div>
      <Filter
        dataSource={dataSource}
        curTab={request.type}
        curPage={request.page}
        onChangeTab={nextTab => {
          // 每次切换 tab 的时候 page 重置为 1
          handleQuery({ ...request, type: nextTab, page: 1 })
        }}
        onChangePage={nextPage => {
          handleQuery({ ...request, page: nextPage })
        }}
      />
    </div>
  )
}
```

这样的代码是没有问题的，首先默认进入页面会请求一次接口完成初始化，随后在切换 tab 或者点击分页中也会请求接口。那是否会有更好的写法呢？(这里个人的想法，不代表他人的想法)

首先分析下这段代码，需要请求数据的地方是三处

1. 页面初始化需要请求数据。
2. 切换 tab 需要请求数据。
3. 分页需要请求数据。

因为页面初始化也需要请求数据，因此可以把请求的依赖放在 `useEffect` 中

```tsx
import * as React from 'react'
// 假设已经封装好了这样的组件
import Filter from './filter'

export function FilterTable() {
  // 目前只有两个依赖 1. page 2. type
  const [request, setRequest] = React.useState({
    page: 1,
    pageSize: 10,
    type: 'apple'
  })
  // 表格的数据源
  const [dataSource, setDataSource] = React.useState([])

  const handleQuery = nextRequest => {
    setRequest(nextRequest)
    // query(nextRequest).then(res => {
    //   setDataSource(nextRequest)
    // })
  }

  React.useEffect(() => {
    query(request).then(res => {
      setDataSource(nextRequest)
    })
    // 这里也可以使用 request 作为依赖，因为 request 变化一般都会请求接口。但是这里我们更精确到具体变化的参数
  }, [request.page, request.type])

  return (
    <div>
      <Filter
        dataSource={dataSource}
        curTab={request.type}
        curPage={request.page}
        onChangeTab={nextTab => {
          // 每次切换 tab 的时候 page 重置为 1
          handleQuery({ ...request, type: nextTab, page: 1 })
        }}
        onChangePage={nextPage => {
          handleQuery({ ...request, page: nextPage })
        }}
      />
    </div>
  )
}
```

现在我们把依赖放入到 `useEffect` 中，那么每次 tab 的切换或者是分页的修改只需要修改对应的依赖参数即可就可以实现接口的重新请求。

接口请求，尤其是需要筛选之类的只修改同一个数据源，通常都会涉及到[竞态](https://zh.wikipedia.org/zh-cn/%E7%AB%B6%E7%88%AD%E5%8D%B1%E5%AE%B3)的问题。那么如何处理这种问题？

回到在事件中处理请求的方法，看看如何解决竞态问题。

```tsx
import * as React from 'react'
// 假设已经封装好了这样的组件
import Filter from './filter'
// 使用 lodash 的 isequal
import isEqual from 'lodash.isequal'

export function FilterTable() {
  // 目前只有两个依赖 1. page 2. type
  const [request, setRequest] = React.useState({
    page: 1,
    pageSize: 10,
    type: 'apple'
  })
  // 表格的数据源
  const [dataSource, setDataSource] = React.useState([])
  // 声明一个 ref 用于记录最新的 request 信息
  const requestRef = React.useRef(request)

  const handleQuery = nextRequest => {
    setRequest(nextRequest)
    // 更新 requestRef 保持最新
    requestRef.current = nextRequest
    query(nextRequest).then(res => {
      // 在这里进行比较，如果是相等的则请求接口，否则不请求
      if (isEqual(requestRef.current, request)) {
        setDataSource(nextRequest)
      }
    })
  }

  React.useEffect(() => {
    query(request).then(res => {
      setDataSource(nextRequest)
    })
  }, [])

  return (
    <div>
      <Filter
        dataSource={dataSource}
        curTab={request.type}
        curPage={request.page}
        onChangeTab={nextTab => {
          // 每次切换 tab 的时候 page 重置为 1
          handleQuery({ ...request, type: nextTab, page: 1 })
        }}
        onChangePage={nextPage => {
          handleQuery({ ...request, page: nextPage })
        }}
      />
    </div>
  )
}
```

通过声明一个 `ref` 来记录最新的参数，在事件中通过比较 state 中的 request 和记录最新的 ref 进行比较，如果相同则请求接口，否则不请求。

那么在 `useEffect` 中请求数据又如何处理竞态呢？

```tsx
import * as React from 'react'
// 假设已经封装好了这样的组件
import Filter from './filter'

export function FilterTable() {
  // 目前只有两个依赖 1. page 2. type
  const [request, setRequest] = React.useState({
    page: 1,
    pageSize: 10,
    type: 'apple'
  })
  // 表格的数据源
  const [dataSource, setDataSource] = React.useState([])

  const handleQuery = nextRequest => {
    setRequest(nextRequest)
    // query(nextRequest).then(res => {
    //   setDataSource(nextRequest)
    // })
  }

  React.useEffect(() => {
    // 声明 didCancel
    let didCancel = false
    query(request).then(res => {
      if (!didCancel) {
        setDataSource(nextRequest)
      }
    })
    // 这里也可以使用 request 作为依赖，因为 request 变化一般都会请求接口。但是这里我们更精确到具体变化的参数
    return () => {
      // 每次 effect 重新执行，都会走到这里
      didCancel = true
    }
  }, [request.page, request.type])

  return (
    <div>
      <Filter
        dataSource={dataSource}
        curTab={request.type}
        curPage={request.page}
        onChangeTab={nextTab => {
          // 每次切换 tab 的时候 page 重置为 1
          handleQuery({ ...request, type: nextTab, page: 1 })
        }}
        onChangePage={nextPage => {
          handleQuery({ ...request, page: nextPage })
        }}
      />
    </div>
  )
}
```

在 `useEffect` 中声明一个变量 `didCancel`(你也可以声明任何其他变量) 初始化为 false， 在返回的函数中设置 true，这样每次更新的过程中都会先执行取消函数，可以避免竞态的发生。

那么如果接口初始化不调用，是否放在事件中处理就可以了？

如果接口初始化不需要调用，而是在某个其他的任何事件中调用，是可以采取第一种的方法，但是也可以改造成第二种的方式。因为初始化不需要调用一般初始化都是隐藏的，所以总结下来仍然是属于第二种
的做法，在组件 mount 后加载数据。

那么是否第一种就是不好的，第二种就一定是好的呢？我总结了以下几点关于每种方式的利弊

第一种在事件中处理接口请求:

好处:

1. 可以快速知道点击事件的目的。
2. 接口在点击事件后就会发送请求，时机比较靠前。如果对应的组件很大，渲染很慢，那么此时的优势就会体现出来。

坏处:

1. **接口请求分散在各种，不好管理**，尤其是大量筛选条件的时候。
2. 后续功能发生变更，增加其他的筛选项都需要写一遍事件请求。
3. 竞态不容易处理。

第二种在 `useEffect` 中处理接口请求:

好处:

1. 依赖统一管理，方便快速了解接口会在哪些条件下触发重新请求。可以很好的应对大量筛选条件。
2. 即使后续新增其他的筛选项，只需要新增一个依赖即可，简单快捷。
3. 容易处理竞态

坏处:

1. 接口请求会滞后，尤其是组件很大，渲染很慢的时候，请求的滞后会带来不好的体验。

总结：

当遇到筛选、多 Tab 以及其他各种多条件的情况下，建议在 `useEffect` 中管理依赖，这样可以快速的知道接口会依赖哪些参数的变化而重新请求。尤其是大量的筛选条件下，声明式的管理依赖，方便
后续代码的维护。

> 声明：这是个人看法，当然是否放在事件中还是 effect 中来管理，全凭个人喜好。
