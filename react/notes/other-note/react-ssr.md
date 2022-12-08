# 服务端渲染相关

- [Learning to Appreciate React Server Components](https://dev.to/this-is-learning/learning-to-appreciate-react-server-components-49ka) 作者讲述了对目前 `RSC` 的看法，以及很早 [marko](https://markojs.com/) 已经实现了类似的功能。

- [Making Instagram.com faster: Part 2](https://instagram-engineering.com/making-instagram-com-faster-part-2-f350c8fba0d4) 讲述了 instagram 是如何改造页面的(主要是 server 端配合 browser)，使页面速度变快，并且介绍了 facebook 的做法，非常值得看。[其他的部分](https://medium.com/@mr_sharpoblunto)也很不错。、

- [BigPipe: Pipelining web pages for high performance](https://engineering.fb.com/2010/06/04/web/bigpipe-pipelining-web-pages-for-high-performance/) facebook 对网站优化实现的技术，类似于分块的流，也是比较值得看的。

- [Chunked transfer encoding](https://en.wikipedia.org/wiki/Chunked_transfer_encoding) 流式传输的一种方式，把流分成多块，在 http1 中已经支持，目前很多 ssr 框架都已经支持，目的就是为了快速渲染出头部内容，在头部中的 `link` 以及 `script` 快速加载，而不必等待完成的 html 渲染完成。从而加快可交互的速度。

- [Async Fragments: Rediscovering Progressive HTML Rendering with Marko](https://tech.ebayinc.com/engineering/async-fragments-rediscovering-progressive-html-rendering-with-marko/) 讲述了如何实现流式的渲染即使不使用 `expressjs`以及渐进式相比于非渐进式的好处，与 facebook 的 [bigpipe](https://engineering.fb.com/2010/06/04/web/bigpipe-pipelining-web-pages-for-high-performance/) 都很相似。可以直接查看[在线例子](https://marko-progressive-rendering.herokuapp.com/?renderMode=progressive-out-of-order&jsLocation=middle)

- [React Server Component width Dan](https://dev.to/swyx/an-annotated-guide-to-the-react-server-components-demo-2a83#2021-architecture-qampa-notes)

- [什么是前端差异化竞争？来看看 Astro](https://mp.weixin.qq.com/s/oJUMrqZ02JUQOd60s4vrAg) Astro 实现了部分注水，追求性能的极致体验。比较适合内容类的站点。

- [React Streaming SSR 原理解析](https://mp.weixin.qq.com/s/GVts2QW3H_aTrB9anGwl5g) 从源码角度讲解了 SSR 的原理
