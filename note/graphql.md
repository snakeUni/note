# GraphQL

在 `Rest Api` 中，通常改变数据，都是使用 `post` 方法, 在 `graphql` 中也是有一样的方法，通常请求是使用 `query`, 如果需要写数据，通常伴随这一些副作用。可以使用
`Mutations`

定义一个 mutation

```js
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

请求数据

```js
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

返回结果

```js
{
  "data": {
    "createReview": {
      "stars": 5,
      "commentary": "This is a great movie!"
    }
  }
}
```

A mutation can contain multiple fields, just like a query. There's one important distinction between queries and mutations, other than the name:

`While query fields are executed in parallel, mutation fields run in series, one after the other.`

## fragment

`fragment` 通常用来定义对象片段。通常对于复用性强的可以使用 `fragment` 来定义。如果复用性不强，又想使用 `fragment` 则可以使用 `inline fragment`

```js
{
  hero {
    name
    ... on Droid {
      primaryFunction
    }
  }
}
```

