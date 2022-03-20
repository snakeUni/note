# Suspense

目前 React conf 2019 公布了最新的 `concurrent` 和 `suspense`, 但是 `Suspense` 的有效使用是在 [Relay](https://relay.dev/docs/en/experimental/api-reference#usepreloadedquery) 里，以官方网站发布的仍然还需要一些实现。

在使用 `Suspense` 的时候会发现， `Suspense` 可以优先解锁外部，但是无法优先解锁内部。比如

```js
<Suspense fallback={<h1>Loading profile...</h1>}>
  <A />
  <Suspense fallback={<h1>Loading posts...</h1>}>
    <B />
  </Suspense>
</Suspense>
```

[查看例子](https://codesandbox.io/s/xenodochial-morse-x37nn)

如果 A fetched 的时间是 1000ms, 此时 B 的 fetched 的时间是 2000ms, 那么此时在页面看到的是 `Loading profile...`, 如果
A 已经 fetched 的了，那么此时页面上会显示 A 的内容和 B 的 `Loading posts...`, 在 B fetched 之后会在显示 B 的内容。所以会先解锁外部的 Suspense.
那么不妨修改下时间，把 A 的时间改为 3000, B 的时间仍然是 2000, 页面上又是什么样子的呢？

此时页面上会显示 `Loading profile...`, 然后观察我们的 `console.log` 会发现即使 B 已经 fetched, 但是页面上仍然不会显示 B 的内容，一直会等到 A 被 fetched，才会
显示 A 和 B 的内容，所以内部的 `Suspense` 不会被优先解锁。如果想要双方都能随意解锁的话，那么`可以分开写`，`不需要嵌套来写`。

但是用于生产中的 Suspense 目前只是在 [Relay](https://relay.dev/docs/en/experimental/api-reference#usepreloadedquery) 中, 所以对于后面的一些库，可以实现类似
Relay 中的 Suspense. 目前仍然有一些 React 团队正在探索的。

## We’re Still Figuring This Out

Suspense itself as a mechanism is flexible and doesn’t have many constraints. Product code needs to be more constrained to ensure no waterfalls, but there are different ways to provide these guarantees. Some questions that we’re currently exploring include:

- Fetching early can be cumbersome to express. How do we make it easier to avoid waterfalls?
- When we fetch data for a page, can the API encourage including data for instant transitions from it?
- What is the lifetime of a response? Should caching be global or local? Who manages the cache?
- Can Proxies help express lazy-loaded APIs without inserting read() calls everywhere?
- What would the equivalent of composing GraphQL queries look like for arbitrary Suspense data?

Relay has its own answers to some of these questions. There is certainly more than a single way to do it, and we’re excited to see what new ideas the React community comes up with.

`Suspense` 同时解决了接口`竞态`的问题，这个在业务中会经常遇到，当请求两个接口的时候，由于两次接口请求的时间非常靠近，或者说点击按钮请求的频率很高，但是第二次接口返回的速度要快于第一次
比如

```js
useEffect(() => {
  fetch(id).then(res => {
    setUser(res);
  });
}, [id]);
```

每次当 `id` 发生变化的时候都会请求接口，但是呢如果第二次请求的速度快于第一次，那么最后页面上显示的则是第一次的 `user`, 此时就是有问题的，所以这就是常说的`竞态`问题。在没有使用
`Suspense` 的时候，通常会使用一个标志位不妨叫做 `flag` 来解决这样的`竞态`问题，只有当第一次接口正确返回后，重置 flag, 然后开启第二次请求。

[使用 Suspense 解决竞态](https://codesandbox.io/s/frosty-mcnulty-qmzqv)

[常规的非解决静态的情况](https://codesandbox.io/s/snowy-platform-07qk1)

可以对这两个进行观察

第一个例子，无论什么时候，请求 user 和 请求 post 的 id 都是一致的, 但是第一个例子，快速点击的情况下，不一致的情况马上就出现了。

在使用 React 的时候，之前渲染数据到页面上都是 `fetch on render`

- Fetch-on-render (for example, fetch in useEffect): Start rendering components. Each of these components may trigger data fetching in their effects and lifecycle methods. This approach often leads to “waterfalls”.
- Fetch-then-render (for example, Relay without Suspense): Start fetching all the data for the next screen as early as possible. When the data is ready, render the new screen. We can’t do anything until the data arrives.
- Render-as-you-fetch (for example, Relay with Suspense): Start fetching all the required data for the next screen as early as possible, and start rendering the new screen immediately — before we get a network response. As data streams in, React retries rendering components that still need data until they’re all ready.

使用 `fetch on render` 是在 `useEffect` 中或者是 `mount` or `update` 的时候请求数据，此时就会造成 `waterfalls`,页面开始的时候没有数据，当请求接口后，拿到数据，重新让页面再次 `render` 此时页面发生更新。如果没有 loading 页面会出现抖动的情况。所以现在很多会采用`骨架图`，但是也会有很多其他的手段来优化这个。比如 `ssr`, 但是 ssr 也是有缺点的， ssr 在服服务端把数据塞到页面中，再把页面返回。但是在拿到数据，进行计算在塞到模板中，这些都是时间的消耗，但是这个仍然无法解决 `waterfalls` 的情况。总不能所有页面都是 ssr, 即使所有页面都是 ssr, 通过 ajax 请求的数据仍然解决不了这个问题。

使用 `Fetch-then-render`, 就是请求完所有的数据，然后在渲染新的页面，这样页面就会有新的数据，那这样也有很多问题，比如某个接口很慢。那么会导致页面出现的速度很慢，这是一个很不好的体验。所以 `Fetch-then-render` 仍然存在问题，那么使用 `prerender` 呢？预渲染，预渲染是预先跑编译好的 js 代码，生成一个 Html 文件，这个 html 文件包含了文件的结构之类的，但是针对这个所有人看到的页面都是一致的，如果涉及到权限问题，在 `prerender` 里很难处理。即使处理好了，那么 `prerender` 让用户看到的也只是第一次看到的页面。后面用户的交互问题仍然存在。

使用 `Render-as-you-fetch`, 渲染和请求数据是同时进行的，随着数据的获取，渲染到页面上。

注意: `Suspense` 并不是用来代替数据请求的。用于数据请求的库仍然是需要的，但是可以结合 `Suspense`, 优雅的处理 IO 造成的问题。

## SuspenseList

`<SuspenseList>` is the last pattern that’s related to orchestrating loading states.

```js
function ProfilePage({ resource }) {
  return (
    <>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h2>Loading posts...</h2>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
      <Suspense fallback={<h2>Loading fun facts...</h2>}>
        <ProfileTrivia resource={resource} />
      </Suspense>
    </>
  );
}
```

[Try it on CodeSandbox](https://codesandbox.io/s/proud-tree-exg5t)

这两个 Suspense 是分开的互不干扰的，如果接口返回的时间是随机的话，那么有可能先显示第一个 `loading posts` 也有可能先显示第二个 `Loading fun facts`, 先显示第一个在显示第二个这个看起来可能是比较正常的行为。但是如果先显示第二个在显示第一个这样的行为就是不好的行为。那么如何解决这样的问题呢？

把这两个组件放到同一个 `Suspense` 中

```js
<Suspense fallback={<h2>Loading posts and fun facts...</h2>}>
  <ProfileTimeline resource={resource} />
  <ProfileTrivia resource={resource} />
</Suspense>
```

[Try it on CodeSandbox](https://codesandbox.io/s/currying-violet-5jsiy)

此时可以避免上方所说的问题，但是这个也将引起新的问题，此时的 `Suspense` 展示需要两个都已经 fetched，所以这个可能比较慢，而不是渐进式的。

使用 `SuspenseList`

```js
function ProfilePage({ resource }) {
  return (
    <SuspenseList revealOrder='forwards'>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h2>Loading posts...</h2>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
      <Suspense fallback={<h2>Loading fun facts...</h2>}>
        <ProfileTrivia resource={resource} />
      </Suspense>
    </SuspenseList>
  );
}
```

[Try it on CodeSandbox](https://codesandbox.io/s/black-wind-byilt)

revealOrder 有三个值，`forwards`, `backwards`, `together`.

`forwards` 是从上到下展示。即使后面的接口返回的比第一个快，仍然也要等待第一个。

`backwards` 是从下往上展示。即使上面的接口返回的比最后一个快，仍然要等待最后一个

`together` 一起呈现，取决了最慢的那个接口

tail prop. If we specify tail="collapsed", we’ll see at most one fallback at the time. You can play with it [here](https://codesandbox.io/s/adoring-almeida-1zzjh).
