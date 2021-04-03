# 服务端渲染相关

- [Learning to Appreciate React Server Components](https://dev.to/this-is-learning/learning-to-appreciate-react-server-components-49ka) 作者讲述了对目前 `RSC` 的看法，以及很早 [marko](https://markojs.com/) 已经实现了类似的功能。

- [Making Instagram.com faster: Part 2](https://instagram-engineering.com/making-instagram-com-faster-part-2-f350c8fba0d4) 讲述了 instagram 是如何改造页面的(主要是 server 端配合 browser)，使页面速度变快，并且介绍了 facebook 的做法，非常值得看。[其他的部分](https://medium.com/@mr_sharpoblunto)也很不错。

- [Chunked transfer encoding](https://en.wikipedia.org/wiki/Chunked_transfer_encoding) 流式传输的一种方式，把流分成多块，在 http1 中已经支持，目前很多 ssr 框架都已经支持，目的就是为了快速渲染出头部内容，在头部中的 `link` 以及 `script` 快速加载，而不必等待完成的 html 渲染完成。从而加快可交互的速度。
