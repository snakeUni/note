# Redux

很久之前看过 `Redux` 的源码，当时也只是大概看了一下，久而久之就忘记了，今天又重新回顾了一下，不妨我们分析一下源码以及配合 `middleware` 使用的一些差别

## createStore

正常在调用 `createStore` 的时候(假设此时没有 `middleware`), 可能我们会这样调用

```js
const store = createStore(reducer, initialState);
```

第一个参数是 `reducer`, 第二个参数是初始化的 state, 源码中还有第三个参数，以及第二个参数也可以传递 `function`, 假设第二个参数不是 `function`, 此时 `createStore` 按照正常流程走下去

```js
if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
  enhancer = preloadedState;
  preloadedState = undefined;
}

if (typeof enhancer !== 'undefined') {
  if (typeof enhancer !== 'function') {
    throw new Error('Expected the enhancer to be a function.');
  }

  return enhancer(createStore)(reducer, preloadedState);
}
```

内部这部分代码就走不进去了，因为我们的 `typeof preloadedState !== 'function'`，然后内部做一些监听器，处理一些 `reducer`, 这里就不做详细描述了看一下代码就大概知道，代码如下

```js
function getState() {
  if (isDispatching) {
    throw new Error(
      'You may not call store.getState() while the reducer is executing. ' +
        'The reducer has already received the state as an argument. ' +
        'Pass it down from the top reducer instead of reading it from the store.'
    );
  }

  return currentState;
}

function subscribe(listener) {
  if (typeof listener !== 'function') {
    throw new Error('Expected the listener to be a function.');
  }

  if (isDispatching) {
    throw new Error(
      'You may not call store.subscribe() while the reducer is executing. ' +
        'If you would like to be notified after the store has been updated, subscribe from a ' +
        'component and invoke store.getState() in the callback to access the latest state. ' +
        'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
    );
  }

  let isSubscribed = true;

  ensureCanMutateNextListeners();
  nextListeners.push(listener);

  return function unsubscribe() {
    if (!isSubscribed) {
      return;
    }

    if (isDispatching) {
      throw new Error(
        'You may not unsubscribe from a store listener while the reducer is executing. ' +
          'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
      );
    }

    isSubscribed = false;

    ensureCanMutateNextListeners();
    const index = nextListeners.indexOf(listener);
    nextListeners.splice(index, 1);
    currentListeners = null;
  };
}

function dispatch(action) {
  if (!isPlainObject(action)) {
    throw new Error(
      'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
    );
  }

  if (typeof action.type === 'undefined') {
    throw new Error(
      'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
    );
  }

  if (isDispatching) {
    throw new Error('Reducers may not dispatch actions.');
  }

  try {
    isDispatching = true;
    currentState = currentReducer(currentState, action);
  } finally {
    isDispatching = false;
  }

  const listeners = (currentListeners = nextListeners);
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i];
    listener();
  }

  return action;
}
```

这样就可以很容易调用 `dispatch` 来处理一些行为，比如这样的一个 `reducer`

```js
function reducer(state, action) {
  switch (action.type) {
    case: 'INCREASE': {
      return {
        ...state,
        action.count
      }
    }
  }
}
```

调用 `store.dispatch({ type: 'INCREASE', count: 10 })`

但是当有异步的情况的时候如何处理呢？单独这样的话是很难处理的，正常我们都是在异步调用结束后去执行 `dispatch` 更新顶部的值， 比如这样

```js
function increaseAsync() {
  setTimeout(() => {
    store.dispatch({ type: 'INCREASE', count: 10 });
  });
}
```

如何只是异步调用，我们可以这样来处理它，但是如果要求进行 `logger` 或者其他的操作该如何处理呢？总不能每次都这样来做

```js
store.dispatch({ type: 'XXX', payload: 'xxx' });
logger();
```

那此时[middleware](https://redux.js.org/api/applymiddleware)的作用就会提现出来了，官方提供的 `logger` 例子

```js
function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action);

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    console.log('state after dispatch', getState());

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}
```

`middleware` 的格式必须要这样写嘛？看一下代码，其实这个地方是有点绕的，但是仔细理清楚也就很简单了。回到刚刚上面被忽略的代码部分

```js
if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
  enhancer = preloadedState;
  preloadedState = undefined;
}

if (typeof enhancer !== 'undefined') {
  if (typeof enhancer !== 'function') {
    throw new Error('Expected the enhancer to be a function.');
  }

  return enhancer(createStore)(reducer, preloadedState);
}
```

此时已 [thunk](https://github.com/reduxjs/redux-thunk) 为例子来分析这段代码，`thunk` 的使用方法

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// Note: this API requires redux@>=3.1.0
const store = createStore(rootReducer, applyMiddleware(thunk));
```

此时 `applyMiddleware(thunk)` 是 createStore 的第二个参数，调用了 `redux` 中的 `applyMiddleware` 方法，在看下 `applyMiddleware`

`applyMiddleware`

```js
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      );
    };

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    };
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}
```

此时 `applyMiddleware` 返回的是一个函数，所以符合 `typeof preloadedState === 'function' && typeof enhancer === 'undefined'` 这个条件然后在内部进行赋值

`enhancer = preloadedState;`, 此时 `typeof enhancer !== 'undefined'` 为 true `typeof enhancer !== 'function'` 为 false, 所以会走到下面的

```js
enhancer(createStore)(reducer, preloadedState);
```

可以看到 `enhancer` 应该是就是我们之前的 `applyMiddleware(thunk)`, 从上面的代码可以看到

```js
const applyMiddleware = (...middlewares) => createStore => (...args) => {};
```

所以在调用应用 `applyMiddleware` 后会再次调用 `createStore`, 然后传递 `reducer` 和 `state` 下去，这段代码

```js
// 这里的 ...args 就是 enhancer 的 reducer 和 preloadedState
const store = createStore(...args);
```

内部调用了 `middleware`, `middleware` 接受参数 `{ getState, dispatch }`, 看下 `thunk` 的源码

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

从这里的源码可以处理， 接收参数的确是 `{ dispatch， getState }`, 那这里的 next 又是什么呢？不妨回到 `applyMiddleware` 的源码

```js
// 这里用了 compose 具体
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
const chain = middlewares.map(middleware => middleware(middlewareAPI));
dispatch = compose(...chain)(store.dispatch);
```

`compose(...chain)(store.dispatch)` 这里的 `store.dispatch` 就是 `thunk` 中的 next, 所以在 `thunk` 里会有个

```js
return next(action);
```

这里的作用就是如果不满足条件那么就走正常的 `redux` 的 dispatch， 在继续看 `applyMiddleware` 的返回值

```js
return {
  ...store,
  dispatch
};
```

可以看书此时的 `dispatch` 不在是原始的 `store.dispatch` 而是 `compose(...chain)(store.dispatch)`, 所以在每次调用 `store.dispatch` 的时候都是在调用
`compose(...chain)(store.dispatch)`, 这样每次 `thunk` 都会被执行。这就是为什么 `middleware` 需要返回 `next => action => {}` 的原因。看一下 `thunk` 的用法在

```js
function makeASandwichWithSecretSauce(forPerson) {
  // We can invert control here by returning a function - the "thunk".
  // When this function is passed to `dispatch`, the thunk middleware will intercept it,
  // and call it with `dispatch` and `getState` as arguments.
  // This gives the thunk function the ability to run some logic, and still interact with the store.
  return function(dispatch) {
    return fetchSecretSauce().then(
      sauce => dispatch(makeASandwich(forPerson, sauce)),
      error => dispatch(apologize('The Sandwich Shop', forPerson, error))
    );
  };
}

// Thunk middleware lets me dispatch thunk async actions
// as if they were actions!

store.dispatch(makeASandwichWithSecretSauce('Me'));

// It even takes care to return the thunk’s return value
// from the dispatch, so I can chain Promises as long as I return them.

store.dispatch(makeASandwichWithSecretSauce('My partner')).then(() => {
  console.log('Done!');
});
```

调用 `store.dispatch(makeASandwichWithSecretSauce('Me'));`, `makeASandwichWithSecretSauce(forPerson)` 返回的是一个函数，所以这里的

```js
action = dispatch =>
  fetchSecretSauce().then(
    sauce => dispatch(makeASandwich(forPerson, sauce)),
    error => dispatch(apologize('The Sandwich Shop', forPerson, error))
  );
```

`action` 为一个函数因为走到了 `thunk` 的

```js
if (typeof action === 'function') {
  return action(dispatch, getState, extraArgument);
}
```

所以内部将会调用这个 `action` 函数返回

```js
fetchSecretSauce().then(
  sauce => dispatch(makeASandwich(forPerson, sauce)),
  error => dispatch(apologize('The Sandwich Shop', forPerson, error))
);
```

所以可以在调用完 `store.dispatch` 然后调用 `then` 取到正确的值。

## Conclusion

本文主要是关于 `applyMiddleware` 的讲解，以及为什么 `thunk` 一定要以某个格式来写，后面需要自己写其他的 `middleware` 的时候都可以进行参考这些地方的用法

## 相关链接

- [redux](https://github.com/reduxjs/redux)
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
