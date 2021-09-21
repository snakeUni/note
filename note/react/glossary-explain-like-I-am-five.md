# Glossary + Explain Like I'm Five

这里大概是翻译了原文，可能会有出入，详细可以[查看原文](https://github.com/reactwg/react-18/discussions/46)

## ✨ CONCURRENCY

并发意味着任务可以重叠

我们使用电话作为类比

无并发意味着我一次只能进行一个电话。如果我和 Alice 通话，而 Bob 打电话给我，那么我必须先完成与 Alice 的通话，然后才能与 Bob 通话。

![1](https://user-images.githubusercontent.com/810438/121394782-9be1e380-c949-11eb-87b0-40cd17a1a7b0.png)

并发意味着我一次可以进行多个对话。比如，我可以和 Alice 保持通话，与 Bob 交谈一会，然后在切换回来与 Alice 交流。

![2](https://user-images.githubusercontent.com/810438/121394880-b4ea9480-c949-11eb-989e-06a95edb8e76.png)

需要注意的是，并发并不一定意味着我同时与两个人交流。这只意味着在任何时候，我都可能在多个会话中，我可以选择与谁进行通话。比如，基于哪个会话更紧急。

现在，换个比如，在 React 的例子中，"通话"是你的 `setState` 调用。以前，React 一次只能处理一个状态更新。所以所有的更新都是”紧急的“：一旦开始重新渲染，就无法停止。但是使用 [startTransition](https://github.com/reactwg/react-18/discussions/41)，你可以将非紧急更新标记为`transition`

![3](https://user-images.githubusercontent.com/810438/121396132-f760a100-c94a-11eb-959c-b95a6647d759.png)

你可以将“紧急”的 `setState` 更新视为类似于紧急电话呼叫(例如，你的朋友需要你的帮助), 而 `transitions` 就像轻松的对话，如果它们不相关，可以暂停甚至中断。

## ✨ SUSPENSE

它就像 `throw/catch` 但是用于加载状态。当一个组件说“我还没有准备好”(特殊情况，比如 throw) 时，最近的 Suspense 快（比如 catch）会显示 fallback。然后，当 Promise 解决时，我们“重试”渲染。

与传统的基于 Promise 的编程的一个主要的区别是 Promise 不会暴露给用户代码。你不会直接与他们打交道。你不需要 Promise.all 他们或者 Promise.then 他们或任何相似的东西。代替“等待 Promise 解析并运行一些用户代码”,React 将在 resolved 后重试渲染。在某些方面它更简单，但是需要一些 “unlearning” 因为用户失去了一些他们可能习惯于传统 Promise-base 编程的控制。

## ✨ BATCHING AND AUTOMATIC BATCHING

### Batching

想象一下你正在做早餐。

你去市场买些牛奶。你回来。然后你意识到你需要麦片。你去市场买麦片。然后你回来。然后你意识到你需要饼干。你去市场买饼干。最后，你可以吃早餐了。

但肯定有更有效的方法来做到这一点吗？与其在你想到的那一刻就得到每件物品，不如先制定一份购物清单。然后你去市场，得到你需要的一切，做你的早餐。

这就是批处理。

在 React 中，每个单独的项目都是一个 `setState` 调用。

```tsx
setIsFetching(false)
setError(null)
setFormStatus('success')
```

React 可以在每次调用后重新渲染（“去商店”）。但是效率不高。最好先记录所有状态更新。然后，当您完成更新所有状态时，**重新渲染一次**。

挑战在于 React 什么时候应该这样做。它怎么知道你已经完成了状态更新？

对于事件处理程序，这很简单：

```tsx
function handleClick() {
  setIsFetching(false)
  setError(null)
  setFormStatus('success')
}
```

React 调用你的点击处理程序。

```tsx
// Inside React
handleClick()
```

所以 React 会在之后立即重新渲染：

```tsx
// Inside React
handleClick()
updateScreen()
```

这就是 React 一直工作的方式。

### Automatic batching

回到这个例子：

```tsx
setIsFetching(false)
setError(null)
setFormStatus('success')
```

如果在事件中没有发生怎么办？例如，此代码可能作为 fetch 的结果运行。 React 不知道你什么时候要“停止”设置状态。所以它需要选择一些时间来更新屏幕。

这类似于您可能没有吃早餐，而是一整天都可能会想吃东西。当你感到饥饿时，你会去市场吗？或者您是否等待一段时间（例如 30 分钟），然后带着您迄今为止想出的任何东西的清单去市场？

以前，React 过去常常在这种情况下立即重新渲染。这意味着您将获得三个 `setState` 调用的三个屏幕更新。这样效率不高。

通过 React 18 中的自动批处理，它总是会批处理它们。实际上，这意味着 React 将“稍等片刻”（技术术语，如果“直到任务或微任务结束”）。然后 React 将更新屏幕。

## ✨ HYDRATION

> The process of rendering your components and attaching event handlers is known as “hydration”. It’s like watering the “dry” HTML with the “water” of interactivity and event handlers.

渲染组件和附加事件处理程序的过程称为“水合”。这就像用交互性和事件处理程序的“水”浇灌“干”的 HTML。

## ✨ PASSIVE EFFECTS

有两种类型的 effects：

- `useEffect` = "effects"
- `useLayoutEffect` = "layout effects"

有时，当您说 "effects" 时，不清楚您是指两者还是仅指第一种。这就是为什么第一种（`useEffect`）有时被称为 "passive" 的原因。

我们在文档的任何地方都避免使用这个术语，但我们在核心团队讨论和 GitHub 上的一些评论之间使用了它。我认为那是库维护者可能会使用它。我不希望应用程序作者知道或关心这个术语——但如果你看到它，它的意思就是 `useEffect`，仅此而已。

## ✨ DISCRETE EVENTS

"Discrete" 事件不是我们在文档中的任何地方使用的概念。这不是我们期望 React 应用程序开发人员了解或关心的概念。

但是，当我们解释[自动批处理](https://github.com/reactwg/react-18/discussions/21)的工作原理时，它就会出现。我们必须澄清的是，对于某些事件，例如点击，我们保证在下一个事件发生之前更新屏幕。这对于计数器（假设用户非常快速地按下按钮两次）或表单（发送表单可能会禁用它，如果在第二次单击之前没有发生，您可能会冒发送两次表单的风险）等 UI 很重要。

我们称这些事件为 "discrete"(离散)。这意味着每个事件都是由用户自己打算的。如果我点击两次，那是因为我的意思是点击两次。如果我输入“h”、“e”、“l”、“l”、“o”，那是因为我的意思是输入 "hello"。

这与 mousemove 等事件不同。我可能会在十个不同的坐标上移动鼠标，但我并不是故意指这些单独的坐标中的任何一个。作为用户，我不知道我刚刚执行了多少个 mousemove 事件。我只动了鼠标。我们称此类事件为 "continuous" “连续的”——例如，重要的是最近发生的事件，而不是发生了多少事件。

这些概念只对 React 内部重要，因为它可能会在多个 continuous 连续事件中批量更新，但它仍然会为连续的每个 discrete 离散事件更新屏幕。但是，作为 React 用户，您可能不需要考虑这一点。

## ✨ PROMISE TICK

Promise 是一个对象，表示将来可用的东西。您可以将 Promise 视为类似于您可能在某些快餐店中获得的计时器。当计时器响起时，您拿起您的订单。

```tsx
let food = await cook()
eat(food)
```

当您看到使用 `await` 的代码时，重要的是要了解您的函数不会一次全部执行。相反，每个 `await` “拆分”您的功能。有一部分在（cook() 给你一个 Promise）之前运行。然后你说在食物吃完后继续。其他代码将能够在此期间执行。最后，当食物准备好时，你将跳回到这个函数，初始化 `food` 变量，然后吃掉它。

“Promise tick” 是指 JavaScript 恢复等待 Promise 的函数的那一刻。之所以称为 “tick” ，是因为它就像一个计时器。当结果准备好时，Promises 不会立即恢复您的功能。相反，他们会在当前运行的代码完成执行后尽快执行。你可以把这想象成一个餐馆老板等着打电话给你的“计时器”，直到他们的手有空，而不是他们做完饭的那一刻。

## ✨ FLUSH SYNC

`flushSync` 是控制 React 何时更新屏幕（“刷新”状态更新）的方法的名称。特别是，它可以让你告诉 React 立即执行（“同步”）：

```tsx
flushSync(() => {
  setState(something)
})
// By this line, the screen has been updated
```

"Flush synchronously" = "Update the screen now"

通常，您不需要 `flushSync`。只有在您需要解决 React 更新屏幕晚于您需要的一些问题时，您才会使用它。它在实践中很少使用。

## ✨ DEBOUNCING AND THROTTLING

Debouncing 和 throttling 是处理“过于频繁”发生的事情的常用技术。想象一下，你正在和一个朋友见面，他们正在给你讲一个故事，但他们说话时很难停下来。假设您想在可能的情况下容纳他们，同时还要回应他们的意见。 （我知道这可能有点做作，但请耐心等待！）

假设您永远不能同时说话。你有几个策略：

### Synchronous 同步

你可以在他们完成的那一刻回应每个句子：

![5](https://user-images.githubusercontent.com/810438/121427718-f3457b00-c96c-11eb-9515-0ab2974414c9.png)

如果您的回复很简短，这可能会奏效。但是如果你的回答更长，这可能会让他们很难完成这个故事。所以这个策略不是很好。

### Debounced 防抖

你可以等他们停止说话。例如，如果他们暂停的时间足够长，您可以开始响应：

![6](https://user-images.githubusercontent.com/810438/121427785-05271e00-c96d-11eb-88f2-b0c80221fe06.png)

如果您的朋友偶尔停顿一下，则此策略很有效。但是，如果他们在没有停顿的情况下讲了几分钟，这根本不会让您做出回应：

![7](https://user-images.githubusercontent.com/810438/121428868-348a5a80-c96e-11eb-8b7d-c0b7bb45971c.png)

### Throttled 节流

您可以决定最多每分钟响应一次。在这里，您可以计算自己有多久没有说话了。一旦你一分钟没说话，你就在朋友的下一句话之后插入你的回答：

![8](https://user-images.githubusercontent.com/810438/121428472-c2b21100-c96d-11eb-962c-ea1c190815cd.png)

如果您的朋友希望您在他们进行时做出回应，则此策略很有用，但他们永远不会为您制造停顿。但是，如果他们制造停顿，但您仍然无缘无故地等待，那就不好了：

![9](https://user-images.githubusercontent.com/810438/121429118-77e4c900-c96e-11eb-9ac1-88f3816487e6.png)

### How does this relate to React?

朋友的“句子”就像按钮点击或键盘输入之类的事件。您的“回复”正在更新屏幕。

当用户做某事太快（例如打字）时，您可以使用去**防抖**或**节流**，并且响应每个单独的事件更新屏幕太慢。因此，**您要么等待用户停止输入（防抖）**，要么不时更新屏幕，例如**每秒更新一次（节流）**。

### What about React 18?

有趣的是，在许多情况下，[`startTransition`](https://github.com/reactwg/react-18/discussions/41) 使这*两种*策略都变得不必要。让我们再添加一个你在 React 18 之前没有的策略：

#### Cooperative

当你的朋友说完一句话时，你*立即*开始回应，无需等待。但是你已经同意你的朋友的意见，如果他们想继续下去，他们可能会打断你。因此，在这种情况下，您将放弃响应的尝试。在下一句之后，你会再试一次。等等：

![11](https://user-images.githubusercontent.com/810438/121429595-ffcad300-c96e-11eb-81dc-29900d9b4cb9.png)

（您*也*同意，如果经过足够长的时间而您仍然没有做出回应，您将打断他们。这可以防止您长时间无法发言的情况。）

请注意，在此策略中，**您不会浪费任何时间，也不会阻止您的朋友继续**。
这为您提供了之前所有三种方法中最好的。 （谁会想到 cooperative 会有所帮助！）

在编码示例中，这意味着 React 在用户输入后立即开始渲染。没有必要延迟这样做（就像防抖一样）。如果用户再次输入，React 将放弃该工作并重新开始。如果渲染速度足够快以适应事件之间的暂停，那么您就没有浪费任何时间（通过不必要的等待）。您也不会在完成不再需要的渲染上浪费时间。

**您可以在[此处](https://react-beta-seven.vercel.app/)查看差异的演示**。尝试在输入中输入。您输入的越多，我们绘制的图形就越复杂（人为放慢速度以显示要点）。查看三种策略之间的不同行为。当您在输入中不断输入更长的文本时，它们的行为如何？

哪个感觉更流畅？

## ✨ STATE TRANSITION

通俗地说，“状态转换”与“状态更改”相同。例如，也许您将 `activeTab` 状态从`“home”`更改为 `“profile”`。您可以说这是从 Home 到 Profile 的“状态转换”。

通常人们所说的 “transitions” “过渡”是指更大的更新。就像当更多的事情发生时。也许需要获取一些数据，屏幕的很大一部分发生了变化，也许还有一些动画。

React 18 建立在这种直觉之上，并引入了一个明确的“转换”概念（[#41](https://github.com/reactwg/react-18/discussions/41)）。我将状态更新标记为 Transition，您向 React 暗示它可能涉及大量工作。 React 允许 Transitions 被更紧急的更新打断，比如输入输入。未来，我们也在考虑将这个概念与动画结合起来。

## ✨ SERVER COMPONENTS

服务器组件是一个新的实验性 React 特性。它可能不会成为 React 18 的一部分，但会在之后的某个时候跟进。我们强烈建议您观看解释这个想法的[介绍性演讲](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html)，因为没有什么比这更像的，因此很难将其与现有事物进行比较

这是您可以考虑的方法。您有一个服务器（您的数据库可能位于其中）和一个客户端（例如，电话或计算机）。浏览器在客户端上运行。你的 React 应用程序也在客户端上运行。所以你的组件：

```tsx
<Panel>
  <SearchField />
  <FriendList />
</Panel>
```

也运行在客户端（在用户的手机或计算机上）。

这意味着：

1. 在 JavaScript `<script />` 标签完成加载之前，它们不起作用。
2. 如果他们需要从服务器获取一些数据（比如好友列表！），你需要为此编写特殊的代码。

服务器组件将允许您将组件放在服务器上。例如，如果 `<Panel>` 和 `<FriendList>` 组件本身没有事件处理程序（如单击）或状态，则它们没有理由必须在用户的计算机上执行。它们可以在服务器上执行，就像您的 API 一样！

为什么这样更好？

1. 现在 `<script />` 标签中唯一的组件是 `SearchField`。无需下载 `Panel` 或 `FriendList` 的代码。
2. 现在 `FriendList` 不需要特殊代码来从服务器“获取”数据。它可以直接读取数据，因为它已经在服务器上。

所以服务器组件是一种方式：

- 在服务器上保留一些 React 组件，这样你就不会将它们的代码发送到计算机（这可以使你的包更小，你的应用程序更快！）
- 简化数据获取（实际上不是组件“获取”其数据，它可以直接从服务器读取数据，因为它在服务器上）
- 将服务器和客户端视为一棵树，而不是两个必须相互“交谈”的断开连接的部分。

## ✨ APP STATE, COMPONENT STATE, UI STATE

你的 React 组件将信息转换为 UI。有两种类型的信息。

其中一些信息在用户会话期间永远不会改变。例如，您的网站布局、按钮上的图标以及页面上各部分的顺序。

其他信息可能会响应用户交互而改变。例如，按钮是否悬停。用户点击“添加”的次数。他们的购物车的内容或他们正在输入的消息。

**响应用户交互而改变的信息称为“状态”。**

任何信息都有一定的生命周期。它附着在某物上。例如，常规 JS 变量附加到函数调用。它们仅在您处于此功能内时才存在。当您退出函数时，来自该调用的变量将停止“存在”。 （除了闭包，当你嵌套函数时会发生闭包，它让嵌套函数“继续看到”来自外部函数调用的变量。）

在 React 中，每次渲染组件时，都是一个单独的函数调用。因此，如果您尝试将一些信息（例如购物车内容）存储在常规变量中，它会在下一次渲染时消失。这就是为什么 React 有一个你用 `useState` 定义的“状态变量”的概念。它们与树中的某个位置相关联——例如，特定的文本输入或您在屏幕上看到的购物车——而不是与函数调用相关联。

声明状态变量的位置很重要。这是如何考虑的。如果您在屏幕上的两个位置渲染某些内容，您是否希望它们同步？

例如，渲染两个评论字段并不意味着您希望在输入另一个时更新其中一个。因此将状态放在评论字段中是有意义的。每个副本都是独立的。

但也许你正在两个地方渲染一个已经提交的评论。如果您对其中一个进行了编辑并保存，那么期望它们都需要反映您的编辑是合理的。因此，关于评论列表的信息需要位于组件之外的某个地方——**可能在它们的共享父级或某种缓存中**。

这就是人们所说的不同类型的状态。这些不是技术术语。但是“UI 状态”通常意味着特定于具体 UI 小部件的某些状态。就像文本输入的文本。而“应用程序状态”通常意味着在许多组件之间共享并且需要同步的一些信息。所以它通常放在它们之外。

## ✨ RENDERS: RENDERS, RE-RENDERS, WASTEFUL RENDERS?

当用户执行某些操作（例如单击按钮）时，您可能想要更改屏幕上的内容。你通过设置状态来做到这一点的方式。作为回应，React 进行了 **“渲染”**。

在渲染期间，React 调用您设置其状态的组件。您的组件返回屏幕上应显示的内容。然后，React 对低于该组件的组件(React does the same for components below that one)执行相同的操作（因为它们也可能显示不同的内容）。这个过程称为渲染。

这可能会让您想起自上而下的计划。设计机构可能会收到订单。艺术总监设定一个愿景，并将插图、排版或标志设计交给专门从事这方面工作的人。反过来，他们可能会将部分工作交给其他同事。等等。最终是由不同人的工作组成的结果。

这类似于最终出现在屏幕上的内容是如何由不同组件的渲染结果组成的。

假设设计机构客户现在想要改变一些东西。 “让我们调整颜色。”所以自上而下的过程又开始了。艺术总监与设计师交谈，设计师与草图制作者交谈，后者实施更改。然后我们有一个新的设计。

这就是“重新渲染”(re-render)。当您再次设置状态时，React 会调用您的组件来确定屏幕上应该显示什么，然后更新屏幕。 “重新渲染”意味着“再次渲染”，仅此而已。

最后，“浪费的渲染”(wasted render)意味着部分工作是不必要的。例如，如果我们的客户说“稍微改一下字体”，然后整个机构开始另一轮迭代。但实际上只有艺术总监和字体设计师需要参与。没有必要让在调色板上工作的人参与进来。

在 React 中，当您更新包含许多其他组件的组件的状态时，可能会发生这种情况。他们可能不会受到更新的影响，但 React 仍然需要询问他们每个人是否要显示不同的内容。因此，如果他们最终没有做出响应，那就是“浪费”。

有几种常见的方法可以优化“浪费”的渲染：

1. 如果它不影响某些组件，您可以将状态移动到更深的树中。然后 React 不会问他们。
2. 您可以将一些“从上面”的组件作为子组件传递给状态已更新的组件。那么 React 就知道“上面”的那些组件不关心这个状态更新，也不需要改变。
3. 您可以将某些组件标记为“已记忆”，这意味着它们会“记住”它们的最后一个 props 并渲染结果。然后，在重新渲染之前，React 会检查它们的 props 是否发生了变化。如果没有，它会在渲染时跳过它们。

附注。我知道设计机构不一定像这样自上而下地工作。这只是一个比喻。