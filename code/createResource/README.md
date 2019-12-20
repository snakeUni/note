# How to use

```js
// resource.js
import { createResource } from './createResource'

const Api = createResource(url => {
  return fetch(url).then(res => res)
})

export { Api }
```

```js
// file.js
import { Api } from './resource'
Api.preload('/water')

const result = api.read('/water')

// clear
result.clear('/water')
// clear all
result.clear()

<Api.Link to="/pdd" cacheKey="/water"/>
```