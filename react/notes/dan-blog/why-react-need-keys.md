# Why React need key

以下内容来自 Dan 的 twitter 解释了 [React 为什么需要 key](https://twitter.com/dan_abramov/status/1415279090446204929)？

下面将英文翻译一下，翻译的可能不太会，建议阅读原文。

每次 render 就像电影中的一个帧。 React 不知道您对数据做了什么。它只能看到上一个渲染的 JSX，然后看到下一个渲染 JSX。

`circles.map(c => <Circle color={c.color} />)`

![c0](https://pbs.twimg.com/media/E6QU1H9XsAc0bro?format=jpg&name=900x900)

告诉我 circle 怎么了。如果你仔细观察，你会发现对所发生的事情有两种*不同*的可能解释！

1. 有可能第二个和第三个交换了位置...
2. 或者有可能第二个圈变成了蓝色，第三个圈变成了黄色！

![c1](https://pbs.twimg.com/media/E6QV0ZuXsAMGwAd?format=jpg&name=360x360)
![cc](https://pbs.twimg.com/media/E6QV0agWYAA2O5a?format=jpg&name=large)

通常这无关紧要。但是想象一下每个圆圈内部都有状态。像一个复选框或一个输入框。那么“移动”和“改变”的区别就很明显了！在第一种情况下，您*希望*状态也移动。在第二种情况下，你不想这样。

那么 keys 是什么呢？Keys 是您给 React 的提示，以便它知道如何知道这两种情况中的哪一种。 `circles.map(c => <Circle color={circle.id} key={c.id}/>` 这是一种方式告诉 React “什么使两个圆圈成为*相同*的圆圈，即使在渲染之间”。

![c2](https://pbs.twimg.com/media/E6QXrR2XoAAXdP_?format=jpg&name=360x360)
![c22](https://pbs.twimg.com/media/E6QXrRyXMAMJ_dI?format=jpg&name=large)

React 本身不能构造出一个好的 key。只有*你*知道你的数据是如何构建的，以及两个渲染中的两个圆圈在概念上是否是“相同的”圆圈（即使它的所有数据都发生了变化）。通常您会使用在数据创建期间生成的 ID。例如来自数据库。

如果你没有在列表中指定一个 key，React 将回退到使用索引(index)。当然，您也可以自己将索引作为 key 传递。 它不一定是“错误的”或“缓慢的”或类似的东西。只是你告诉 React “我保证圆圈永远不会改变顺序。”

![c3](https://pbs.twimg.com/media/E6QY17HXoAoZQoW?format=jpg&name=small)

如果每次都传递一个随机的 key 会发生什么？好吧，你告诉 React 在渲染之间的圆圈*永远*不同。所以如果你在它们里面有一些状态，它会在每次重新渲染后丢失。 React 将销毁并重新创建每个圆圈，因为您告诉它。

![c4](https://pbs.twimg.com/media/E6QZk3pXMAEwFLb?format=jpg&name=small)

这就是 key 背后的原理！它们不是 React 可以为你猜测或自动化的东西，因为你是唯一知道“这些 `items` 被移动/插入/删除”还是“这些 items 改变了它们的内容”的人。没有其他人知道这一点。

为什么 React 不“猜测”我对数组所做的事情发生了什么？首先，从 React 的角度来看，你的数组每次都是完全不同的——一个新的副本。 但即使 React 跟踪您的更改，这也不够！无论如何，重新获取数据会给你新的数组。

Keys 不限于数组。它们指定了组件的身份——在重新渲染之间是否是“相同”或“不同”组件。您可以使用它来重置状态： `<ChatThread key={contact.id} />` 这使得切换联系人重置里面的所有文本字段。

从长远来看，当 React 对 Animations 的内置深度支持时，keys 也将在其中发挥重要作用。想一想：`“移动/添加/删除”`和`“更新”`之间的区别变得很明显！如果事情并没有按您的意愿进进出出，那么 keys 就很糟糕(If things animate in and out as you didn’t intend, the key is bad.)。

[try demo](https://codesandbox.io/s/charming-varahamihira-ytdg7)
