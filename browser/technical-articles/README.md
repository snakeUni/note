# 浏览器方面的知识点

- [Gaining security and privacy by partitioning the cache](https://developer.chrome.com/blog/http-cache-partitioning/) 缓存策略的改变。一篇非常好的文章介绍 chrome 缓存策略的转换。总结如下：

- Chrome: Uses top-level scheme://eTLD+1 and frame scheme://eTLD+1
- Safari: Uses [top-level eTLD+1](https://webkit.org/blog/8613/intelligent-tracking-prevention-2-1/)
- Firefox: [Planning to implement](https://bugzilla.mozilla.org/show_bug.cgi?id=1536058) with top-level scheme://eTLD+1 and considering including a second key like Chrome
