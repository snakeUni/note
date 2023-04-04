# React Router V6

React Router V6 新增了很多 Api,其中一些可以用来优化性能。先简单介绍一些不错的 Api

## createBrowserRouter/createHashRouter

这两个 api，采用了配置的形式来创建路由，之前使用配置的方式来创建路由必须使用另外一个 config 包来包装一层，比较麻烦，然而现在完全不需要了，直接使用 `createBrowserRouter` 就好。

```tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // 如果路由错误，错误兜底页面
    errorElement: <ErrorPage />,
    loader: async rest => {
      console.log(rest)
      const testValue = await sleep(2000, { test: '蓝银草' })
      return defer({
        testValue,
        promiseValue: sleep(5000, { promise: 'uni.ge' })
      })
    }
    // children: [
    //   {
    //     path: 'contacts/:contactId',
    //     element: <Contact />
    //   }
    // ]
  },
  {
    path: 'contacts/:contactId',
    element: <Contact />
  }
])
```

## loader & defer

一个特殊的 Api，可以用来提前获取数据，在进入路由之前。以前获取数据通常会在页面的 `useEffect` 里调用请求，获取数据后更新页面的数据重新渲染。然而现在使用 loader 可以提前获取数据，loader 支持异步的形式，可以在 loader 里请求数据，当数据返回后渲染页面。

```tsx
// 创建路由
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // 如果路由错误，错误兜底页面
    errorElement: <ErrorPage />,
    loader: async rest => {
      console.log(rest)
      const testValue = await sleep(2000, { test: '蓝银草' })
      return defer({
        testValue,
        promiseValue: sleep(5000, { promise: 'uni.ge' })
      })
    }
  },
  {
    path: 'contacts/:contactId',
    element: <Contact />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} fallbackElement={<div>loading...</div>} />
  // </React.StrictMode>
)
```

获取 loader 的数据可以通过 `useLoaderData` 来实现

```tsx
import { Suspense, useEffect } from 'react'
import {
  Outlet,
  useRouteLoaderData,
  useLoaderData,
  Await
} from 'react-router-dom'

export default function Root() {
  const data = useLoaderData()
  console.log({ data })

  useEffect(() => {
    console.log('effect')
  }, [])

  return null
}
```

当进入页面的时候，可以看出页面先有 loading，2 秒后，页面会展示，并且会获取的最新的数据。上述代码还有一个关键点是 [defer](https://reactrouter.com/en/main/utils/defer)，`defer` 是将 promise 提前在 router 里发出请求，然后通过 suspense 捕获 promise，当 promise resolved 后展示对应的组件。这样有个好处就是对于页面上接口比较慢的请求，完全可以在路由开始的时候就请求，而不是在进入页面，渲染后再请求。

再次看下代码

```tsx
loader: async rest => {
  console.log(rest)
  const testValue = await sleep(2000, { test: '蓝银草' })
  return defer({
    testValue,
    promiseValue: sleep(5000, { promise: 'uni.ge' })
  })
}
```

可以看出 `promiseValue` 的请求是在 `sleep(2000)` 后的，所以页面上 promiseValue 的值要在 5s 后才显示，那是否可以提前呢？肯定是可以的，因为 `sleep(5000)` 的代码目前是在 `await sleep(2000)` 后，因此需要等待 2000ms，那我们可以把 promiseValue 的请求放在前面即可

```tsx
loader: async rest => {
  console.log(rest)
  const promiseValue = sleep(5000, { promise: 'uni.ge' })
  const testValue = await sleep(2000, { test: '蓝银草' })
  return defer({
    testValue,
    promiseValue
  })
}
```

这样当页面显示后，promiseValue 的值在进入页面后 3s 就会 resolved 。

## errorElement

当在 loader，action 以及 render 中发生错误的时候都会被捕获到然后展示对应的 errorElement 组件，此时如果项目有个 Shell 容器，容器内部有 ErrorBoundary 组件对 render 错误进行捕获并进行上报，那么外部的 ErrorBoundary 组件就会失效。因为要对相应的错误进行抛出给外部的边界进行捕获。

需要注意的是如果当前页面没有 errorElement ，即使渲染错误也不会被根组件的 errorElement 捕获，会被 React Router 内部的 ErrorBoundary 捕获。因此需要进行特殊处理。首先需要对路由进行变更。

```tsx
createBrowserRouter([
  {
    path: '',
    element: <Outlet />,
    // 如果路由错误，错误兜底页面，可以实现 v5 一样的 redirect
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Root />,
        id: 'root',
        loader: async rest => {
          console.log(rest)
          const promiseValue = sleep(5000, { promise: 'uni.ge' })
          const testValue = await sleep(2000, { test: '蓝银草' })
          return defer({
            testValue,
            promiseValue
          })
        }
      },
      {
        path: '/contacts',
        lazy: () => import('./routes/contact')
      },
      {
        path: '/about',
        lazy: () => import('./routes/about')
      }
    ]
  }
])
```

首先在外部使用 `<Outlet />` 组件，然后使用一个 errorElement，然后再嵌套的使用路由即可。errorElement 的组件可以判断错误类型，如果是 render 错误则抛出去给到外部的 ErrorBoundary。

```tsx
if (isRouteErrorResponse(error)) {
  // 如果是 router 的问题可以捕获否则就上报
  return
}

throw error
```
