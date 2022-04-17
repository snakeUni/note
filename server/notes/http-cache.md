# HTTP 缓存

没有缓存

```text
Cache-Control: no-store

缓存中不得存储任何关于客户端请求和服务端响应的内容。每次由客户端发起的请求都会下载完整的响应内容。
```

缓存但重新验证

```text
Cache-Control: no-cache

如下头部定义，此方式下，每次有请求发出时，缓存会将此请求发到服务器（译者注：该请求应该会带有与本地缓存相关的验证字段），服务器端会验证请求中所描述的缓存是否过期，若未过期（注：实际就是返回304），则缓存才使用本地缓存副本。
```

私有和公共缓存

```text
Cache-Control: private
Cache-Control: public

"public" 指令表示该响应可以被任何中间人（译者注：比如中间代理、CDN等）缓存。若指定了"public"，则一些通常不被中间人缓存的页面（译者注：因为默认是private）（比如 带有HTTP验证信息（帐号密码）的页面 或 某些特定状态码的页面），将会被其缓存。

而 "private" 则表示该响应是专用于某单个用户的，中间人不能缓存此响应，该响应只能应用于浏览器私有缓存中。
```

过期

```text
Cache-Control: max-age=31536000

过期机制中，最重要的指令是 "max-age=<seconds>"，表示资源能够被缓存（保持新鲜）的最大时间。相对Expires而言，max-age是距离请求发起的时间的秒数。针对应用中那些不会改变的文件，通常可以手动设置一定的时长以保证缓存有效，例如图片、css、js等静态资源。
```

验证方式

```text
Cache-Control: must-revalidate

当使用了 "must-revalidate" 指令，那就意味着缓存在考虑使用一个陈旧的资源时，必须先验证它的状态，已过期的缓存将不被使用。
```

## 新鲜度

理论上来讲，当一个资源被缓存存储后，该资源应该可以被永久存储在缓存中。由于缓存只有有限的空间用于存储资源副本，所以缓存会定期地将一些副本删除，这个过程叫做`缓存驱逐`。另一方面，当服务器上面的资源进行了更新，那么缓存中的对应资源也应该被更新，由于 HTTP 是 C/S 模式的协议，服务器更新一个资源时，不可能直接通知客户端更新缓存，所以双方必须为该资源约定一个过期时间，在该过期时间之前，该资源（缓存副本）就是新鲜的，当过了过期时间后，该资源（缓存副本）则变为陈旧的。驱逐算法用于将陈旧的资源（缓存副本）替换为新鲜的，注意，一个陈旧的资源（缓存副本）是不会直接被清除或忽略的，当客户端发起一个请求时，缓存检索到已有一个对应的陈旧资源（缓存副本），则缓存会先将此请求附加一个 `If-None-Match` 头，然后发给目标服务器，以此来检查该资源副本是否是依然还是算新鲜的，若服务器返回了 304 (Not Modified)（该响应不会有带有实体信息），则表示此资源副本是新鲜的，这样一来，可以节省一些带宽。若服务器通过 `If-None-Match` 或 `If-Modified-Since` 判断后发现已过期，那么会带有该资源的实体内容返回。

![1](https://mdn.mozillademos.org/files/13771/HTTPStaleness.png)

对于含有特定头信息的请求，会去计算缓存寿命。比如 `Cache-control: max-age=N` 的头，相应的缓存的寿命就是 N。通常情况下，对于不含这个属性的请求则会去查看是否包含 `Expires` 属性，通过比较 `Expires` 的值和头里面 Date 属性的值来判断是否缓存还有效。如果 max-age 和 expires 属性都没有，找找头里的 `Last-Modified` 信息。如果有，缓存的寿命就等于头里面 Date 的值减去 Last-Modified 的值除以 10（注：根据 rfc2626 其实也就是乘以 10%）。

因此这里的优先级是 `max-age` > `Expires` > `Last-Modified`。

缓存失效时间计算公式如下：

```text
expirationTime = responseTime + freshnessLifetime - currentAge
```

上式中，`responseTime` 表示浏览器接收到此响应的那个时间点。

## 缓存验证

用户点击刷新按钮时会开始缓存验证。如果缓存的响应头信息里含有`"Cache-control: must-revalidate”`的定义，在浏览的过程中也会触发缓存验证。另外，在浏览器偏好设置里设置 Advanced->Cache 为强制验证缓存也能达到相同的效果。

当缓存的文档过期后，需要进行缓存验证或者重新获取资源。只有在服务器返回强校验器或者弱校验器时才会进行验证。

### ETags

作为缓存的一种强校验器，ETag 响应头是一个对用户代理(User Agent, 下面简称 UA)不透明（译者注：UA 无需理解，只需要按规定使用即可）的值。对于像浏览器这样的 HTTP UA，不知道 ETag 代表什么，不能预测它的值是多少。如果资源请求的响应头里含有 ETag, 客户端可以在后续的请求的头中带上 `If-None-Match` 头来验证缓存。

`Last-Modified` 响应头可以作为一种弱校验器。说它弱是因为它只能精确到一秒。如果响应头里含有这个信息，客户端可以在后续的请求中带上 `If-Modified-Since` 来验证缓存。

因为这里存在这样的配对关系

```text
If-None-Match       <=>       ETags
If-Modified-Since   <=>       Last-Modified
```

当向服务端发起缓存校验的请求时，服务端会返回 200 ok 表示返回正常的结果或者 304 Not Modified(不返回 body)表示浏览器可以使用本地缓存文件。304 的响应头也可以同时更新缓存文档的过期时间。

## Vary 响应

Vary HTTP 响应头决定了对于后续的请求头，如何判断是`请求一个新的资源还是使用缓存的文件`。

当缓存服务器收到一个请求，只有当前的请求和原始（缓存）的请求头跟缓存的响应头里的 Vary 都匹配，才能使用缓存的响应。

![2](https://mdn.mozillademos.org/files/13769/HTTPVary.png)

使用 vary 头有利于内容服务的动态多样性。例如，使用 Vary: User-Agent 头，缓存服务器需要通过 UA 判断是否使用缓存的页面。如果需要区分移动端和桌面端的展示内容，利用这种方式就能避免在不同的终端展示错误的布局。另外，它可以帮助 Google 或者其他搜索引擎更好地发现页面的移动版本，并且告诉搜索引擎没有引入 Cloaking。

```text
Vary: User-Agent
```

因为移动版和桌面的客户端的请求头中的 User-Agent 不同， 缓存服务器不会错误地把移动端的内容输出到桌面端到用户。

## 总结

![3](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/22/169a12255df4532a~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

## 相关文章

- [HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)
- [图解 HTTP 缓存](https://www.infoq.cn/article/aiwqlgtlk2eft5yi7doy)
- [一文读懂 http 缓存（超详细）](https://www.jianshu.com/p/227cee9c8d15)
- [深入理解 HTTP 缓存机制及原理](https://juejin.cn/post/6844903801778864136#comment)
