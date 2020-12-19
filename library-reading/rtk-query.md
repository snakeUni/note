## RTK Query 阅读

RTK Query 是 react redux 作者写的一个库，用于解决网络请求这一块的一系列问题，相同的库还有 [swr](https://github.com/vercel/swr) 和 [react-query](https://github.com/tannerlinsley/react-query), 但是目前 `RTK Query` 并不支持 `CRM`

`RTK Query` 实现了很多功能比如基础的缓存，请求池，错误重试，垃圾自动回收等等。并且需要结合 `reudx/toolkit` 一起使用，但是个人觉得这个库的功能太多如果只是想解决请求的问题，不需要这么复杂。

正常的网络请求带来的问题是先加载页面，数据到达后填充数据到页面中，这样页面看起来就有些突兀，但是 `CRM` 的出现就是为了解决这种情况。正常我们在写一个带有请求的组件的时候通常会这么写

```tsx
import * as React from 'react'

function A() {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    const getList = async () => {
      try {
        const res = await fetch('/xxx/b')
        setData(res)
      } catch(error) {
        log(error)
      }
    }

    getList()
  }, [])

  return (
    <div>
      {data.map(d => <div key={d.id}>{d.name}</div>}
    </div>
  )
}
```

上面的例子可以看出页面加载好是没有数据的，等待数据返回后才会有数据，这就可能会造成页面的抖动。因此针对这种情况，有很多种做法，比如采用 `骨架屏`、`ssr`、`prerender` 等等。这里我们采用最简单的做法加个 loading

```tsx
import * as React from 'react'

function A() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true)
        const res = await fetch('/xxx/b')
        setData(res)
        setLoading(false)
      } catch(error) {
        log(error)
        setLoading(false)
      }
    }

    getList()
  }, [])

  return loading ? 'loading' : data.length > 0 (
    <div>
      {data.map(d => <div key={d.id}>{d.name}</div>}
    </div>
  ) : null
}
```

可以看出加了一个 loading 后，在获取到数据之前页面展示是 `loading`, 拿到数据后，`loading` 消失，显示正确的结构，这样页面就不会出现很突兀的抖动。那如果又想展示错误呢？

```tsx
import * as React from 'react'

function A() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true)
        const res = await fetch('/xxx/b')
        setData(res)
        setLoading(false)
      } catch(error) {
        log(error)
        setLoading(false)
        setError(error)
      }
    }

    getList()
  }, [])


  return loading ? 'loading' : error ? error : data.length > 0 (
    <div>
      {data.map(d => <div key={d.id}>{d.name}</div>}
    </div>
  ) : null
}
```

通过增加一个 error， 如果请求接口发生错误，就可以显示出错误信息了。并且 `RTK Query` 没有办法封装自己的 `query`, 通常每个公司都会有自己的
请求库，在库里面封装各种功能。现在已经实现了基础的查询，但是每次都这么做是不是有点太麻烦了，那就封装一个查询。

```tsx
import * as React from 'react'
// 如果是公司内部统一请求，那么就在内部使用相应的请求即可，如果不是的话又想 query 通用，直接传入 promise

// 先使用默认的 fetch
const useQuery = (url: string) => {
  const [result, setResult] = React.useState({
    loading: false,
    error: '',
    data: null
  })

  React.useEffect(() => {
    const fetchAsync = async () => {
      try {
        setResult({ ...result, loading: true })
        const res = await fetch(url)
        setResult({ ...result, loading: false, data: res })
      } catch (error) {
        setResult({ ...result, error: error })
      }
    }

    fetchAsync()
    // url 发生变化的时候再次请求
  }, [url])

  return result
}
```

现在简单的封装 fetch 的 hook 已经可以用了。其他的功能比如缓存，`RTK Query` 采用的是路径加上参数组合的序列化作为 key 的，`react query` 则是需要主动传递 key 作为缓存的 key。可以使用 map 对象来存储。refetch，请求池，失败重试都能在现有的 Hook 上实现封装。
