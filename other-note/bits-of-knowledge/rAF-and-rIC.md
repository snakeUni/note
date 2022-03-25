# requestAnimationFrame and requestIdleCallback

## rIC

参考 [谷歌 rIC](https://developers.google.com/web/updates/2015/08/using-requestidlecallback?hl=en)

不存在可以使用 `setTimeout` 来代替

```js
window.requestIdleCallback =
  window.requestIdleCallback ||
  function (cb) {
    var start = Date.now()
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start))
        }
      })
    }, 1)
  }

window.cancelIdleCallback =
  window.cancelIdleCallback ||
  function (id) {
    clearTimeout(id)
  }
```

## rAF

参考 [谷歌 rAF](https://developers.google.com/web/updates/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision?hl=en)
