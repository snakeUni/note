# concurrent

Usually, when we update the state, we expect to see changes on the screen immediately. This makes sense because we want to keep our app responsive to user input. However, there are cases where we might prefer to defer an update from appearing on the screen.

For example, if we switch from one page to another, and none of the code or data for the next screen has loaded yet, it might be frustrating to immediately see a blank page with a loading indicator. `We might prefer to stay longer on the previous screen`. Implementing this pattern has historically been difficult in React. `Concurrent Mode offers a new set of tools to do that`.

## [How to use concurrent](https://reactjs.org/docs/concurrent-mode-patterns.html)

three step:

use ReactDOM.createRoot() rather than ReactDOM.render()

```js
const rootElement = document.getElementById('root');
// Opt into Concurrent Mode
ReactDOM.createRoot(rootElement).render(<App />);
```

Next, we’ll add an import for the useTransition Hook from React:

```js
import React, { useState, useTransition, Suspense } from 'react';
```

Finally, we’ll use it inside the App component:

```js
function App() {
  const [resource, setResource] = useState(initialResource);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000
  });
  // ...
```

如果 `timeoutMs` 大于接口请求返回数据的时间，那么则会优先加载出数据。但是如果接口返回的时间大于设置的 `timeoutMs`, 那么在 `timeoutMs` 后则会显示 `Suspense`
的 `fallback`, 接口返回后在显示数据

[Try it on CodeSandbox](https://codesandbox.io/s/jovial-lalande-26yep)

It took us only seven lines of code to add this transition:

- We’ve imported the useTransition Hook and used it the component that updates the state.
- We’ve passed {timeoutMs: 3000} to stay on the previous screen for at most 3 seconds.
- We’ve wrapped our state update into startTransition to tell React it’s okay to delay it.
- We’re using isPending to communicate the state transition progress to the user and to disable the button.
  As a result, clicking “Next” doesn’t perform an immediate state transition to an “undesirable” loading state, but instead stays on the previous screen and communicates progress there.

如果使用 `useTransition` 会导致在页面中出现太多重复的逻辑，所以应该把 `useTransition` 放入到设计系统中，比如放入到公共组件中。比如 Button

```js
function Button({ children, onClick }) {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 10000
  });

  function handleClick() {
    startTransition(() => {
      onClick();
    });
  }

  const spinner = (
    // ...
  );

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isPending}
      >
        {children}
      </button>
      {isPending ? spinner : null}
    </>
  );
}
```

`Note that the button doesn’t care what state we’re updating`. It’s `wrapping any state updates that happen during its onClick handler into a transition`. Now that our `<Button>` takes care of setting up the transition, the `<ProfilePage>` component doesn’t need to set up its own

## The Three Steps

![](https://reactjs.org/static/cm-steps-simple-46bf8ed031b93548272a405e1fb0f1ed-acf85.png)

At the very end, we have the Complete state. That’s where we want to eventually get to. It represents the moment when the next screen is fully rendered and isn’t loading more data.

But before our screen can be Complete, we might need to load some data or code. When we’re on the next screen, but some parts of it are still loading, we call that a Skeleton state.

Finally, there are two primary ways that lead us to the Skeleton state. We will illustrate the difference between them with a concrete example.

This scenario (Receded → Skeleton → Complete) is the default one. However, the Receded state is not very pleasant because it “hides” existing information. This is why React lets us opt into a different sequence (`Pending → Skeleton → Complete`) with useTransition.

## Preferred: Pending → Skeleton → Complete

You can compare these two examples to feel the difference:

- Default: [Receded → Skeleton → Complete](https://codesandbox.io/s/prod-grass-g1lh5)
- Preferred: [Pending → Skeleton → Complete](https://codesandbox.io/s/focused-snow-xbkvl)

Recap
The most important things we learned so far are:

- By default, our loading sequence is Receded → Skeleton → Complete.
- The Receded state doesn’t feel very nice because it hides existing content.
- With useTransition, we can opt into showing a Pending state first instead. This will keep us on the previous screen while the next screen is being prepared.
- If we don’t want some component to delay the transition, we can wrap it in its own <Suspense> boundary.
- Instead of doing useTransition in every other component, we can build it into our design system.
