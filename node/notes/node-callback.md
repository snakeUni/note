# try catch

在写 js 代码的时候尤其是 Node 端经常需要用 try catch 来捕捉到错误。有的时候不可避免的
就是会出现嵌套的情况，甚至很深。并且只要内部使用了 `await` 必须还要把函数修改为 `async`
这是一件很麻烦的事情，那么是否有一些方法可以解决呢？

## 嵌套的形式

```js
async function anyFunction() {
  try {
    const result = await fetch("http://test.com");
    try {
      const another = await fetch("http://blabla.com");
    } catch(anotherError) {
      console.log(anotherError);
    } 
  } catch (e) {
    // Some other error handling
  }
  try {
    const anotherResult = await someOtherAsync();
  } catch (errorFromAnotherResult) {
    // Some other error
  }
}
```

这样的代码可能看起来不是那么的优雅，但是也解决了问题。不妨换一种方式，看一下在 `Go` 中是如何处理的

```js
func Listen(host string, port uint16) (net.Listener, error) {
  addr, addrErr := net.ResolveTCPAddr("tcp", fmt.Sprintf("%s:%d", host, port))
  if addrErr != nil {
    return nil, fmt.Errorf("Listen: %s", addrErr)
  }

  listener, listenError := net.ListenTCP("tcp", addr)
  if listenError != nil {
    return nil, fmt.Errorf("Listen: %s", listenError)
  }

  return listener, nil
}
```

因为在 `Go` 中可以返回多个值，所以可以把错误一起返回出来。但是在 `js` 中是不允许返回多个值的，但是可以返回一个数组出来来代替多个值。那么不妨使用 `Go` 的这个模式来写一个函数

```js
function to(promise, improved) {
  return promise
    .then(data => [null, data])
    .catch(err => {
      if (improved) {
        Object.assign(error, improved)
      }

      return [err] // which is same as [err, undefined];
    })
}
```

如何使用

```js
const [error, result] = await to(someAsyncData());

if (error) {
  // log some or return ??
}

const [error2, result2] = await to(someAsyncData2());

if(error2){
  // do something else
} else {
  // Here we are sure that result2 is defined and a valid value
}
```
