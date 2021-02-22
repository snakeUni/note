setTimeout(() => {
  console.log('timeout 0')
}, 0)

setTimeout(() => {
  console.log('timeout 1')
}, 1)

setTimeout(() => {
  console.log('timeout 2')
}, 2)

setTimeout(() => {
  console.log('timeout 5')
}, 5)

setImmediate(() => {
  console.log('setImmediate')
})

// 执行顺序不一，有的时候顺序是

/**
 * timeout 0
timeout 1
setImmediate
timeout 5
 */

// 有的时候顺序是

/**
 * setImmediate
timeout 0
timeout 1
timeout 5
 */

// 具体的相关解释可以参考 https://stackoverflow.com/questions/24117267/nodejs-settimeoutfn-0-vs-setimmediatefn
// 或者参考 https://github.com/theanarkh/understand-nodejs/blob/master/chapter11%20setImmediate%E5%92%8Cprocess.nextTick.md

/**
 * 我们首先看一下下面这段代码

setTimeout(()=>{ console.log('setTimeout'); },0)
setImmediate(()=>{ console.log('setImmedate');})
我们执行上面这段代码，会发现输出是不确定的。下面来看一下为什么。nodejs的事件循环分为几个阶段(phase)。setTimeout是属于定时器阶段，
setImmediate是属于check阶段。顺序上定时器阶段是比check更早被执行的。其中setTimeout的实现代码里有一个很重要的细节。

// code
after *= 1; // coalesce to number or NaN  
2.  if (!(after >= 1 && after <= TIMEOUT_MAX)) {  
3.    if (after > TIMEOUT_MAX) {  
4.      process.emitWarning(`${after} does not fit into` +  
5.                          ' a 32-bit signed integer.' +  
6.                          '\nTimeout duration was set to 1.',  
7.                          'TimeoutOverflowWarning');  
8.    }  
9.    after = 1; // schedule on next tick, follows browser behavior  
10.  }  

我们发现虽然我们传的超时时间是0，但是0不是合法值，nodejs会把超时时间变成1。
这就是导致上面的代码输出不确定的原因。我们分析一下这段代码的执行过程。
nodejs启动的时候，会编译执行上面的代码，开始一个定时器，挂载一个setImmediate节点在队列。然后进入libuv的事件循环，然后执行定时器阶段，
libuv判断从开启定时器到现在是否已经过去了1毫秒，是的话，执行定时器回调，否则执行下一个节点，执行完其他阶段后，
会执行check阶段。这时候就会执行setImmediate的回调。所以，一开始的那段代码的输出结果是取决于启动定时器的时间到libuv执行定时器阶段是否过去了1毫秒。
 * 
 */
