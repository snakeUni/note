# Use React17

最近在开发业务的时候，发现业务项目使用的 React 版本已经是最新的 17 了，但是项目中并没有 17 的一些 feature，实际上 React17 并没有实质性的改变，一个最大的改变就是新的 [jsx runtime](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)。

在官方的 Blog 中，给出了确切的升级方法。

如果使用了 `@babel/plugin-transform-react-jsx`，则需要升级

```shell
# for npm users
npm update @babel/core @babel/plugin-transform-react-jsx
```

```shell
# for yarn users
yarn upgrade @babel/core @babel/plugin-transform-react-jsx
```

如果使用 `@babel/preset-react`

```shell
# for npm users
npm update @babel/core @babel/preset-react
```

```shell
# for yarn users
yarn upgrade @babel/core @babel/preset-react
```

传递 `{"runtime": "automatic"}` 来开启新的功能

```ts
// If you are using @babel/preset-react
{
  "presets": [
    ["@babel/preset-react", {
      "runtime": "automatic"
    }]
  ]
}
```

```ts
// If you're using @babel/plugin-transform-react-jsx
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "runtime": "automatic"
    }]
  ]
}
```

如果使用的是 Babel8，那么 `"automatic"` 是自动开启的。

配置好 babel 后，针对 Eslint 也要做配置，否则 Eslint 会报错，加上以下规则

```ts
{
  // ...
  "rules": {
    // ...
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  }
}

```

如果使用的是 TS，需要将 TS 升级到 [V4.1](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#jsx-factories) 版本以及以上。

```ts
// ./src/tsconfig.json
{
    "compilerOptions": {
        "module": "esnext",
        "target": "es2015",
        "jsx": "react-jsx",
        "strict": true
    },
    "include": [
        "./**/*"
    ]
}
```

通常来说按照上述配置即可成功。

但是内部的项目针对 TS 并没有使用 `@bebel/preset-react`，而是使用 [ts-loader](https://github.com/TypeStrong/ts-loader#getting-started)，所有的 TS 文件都会经过 [ts-loader](https://github.com/TypeStrong/ts-loader#getting-started) 处理。因此需要进行特殊配置。依据 `ts-loader` 官方文件中的说法，可以不处理 jsx，而是将 jsx 转给 babel 进行处理。需要修改 `tsconfig.json` 的配置。

```ts
{
  "compilerOptions": {
    "jsx": "preserve"
  }
}
```

修改了 `tsconfig.json` 配置后，针对 ts 的文件处理配置上 babel 插件，我们业务中使用的 cra 的插件 [babel-preset-react-app](https://github.com/facebook/create-react-app/blob/main/packages/babel-preset-react-app/README.md)。

```ts
{
  loader: require.resolve('babel-loader'),
  options: {
    babelrc: false,
    presets: [
      require.resolve('@babel/preset-env'),
      [
        require.resolve('babel-preset-react-app'),
        {
          runtime: 'automatic'
        }
      ]
    ]
  },
}
```

增加了上述配置后，即可以实现最新的 React17 的 jsx runtime 了。
