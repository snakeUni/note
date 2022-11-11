# 如何控制 commit-msg

这两天团队内部有个需求，就是在 commit 的时候自动携带上分支名称。因为之前有用过 [husky](https://github.com/typicode/husky) 因此第一时间想到用 husky 暴露出来的 hook 来实现。

husky 在早期是支持 js 的形式配置的，目前已经不支持了，具体可以查看 [Why husky has dropped conventional JS config](https://blog.typicode.com/husky-git-hooks-javascript-config/)

既然确定用 husky 来实现，那么我们就按照官网所说的来实现，首先需要知道应该使用哪个 hook，所有的 hook 都是对标 git hook 的，可以查看 [git hook 文档](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)。查看文档后确定使用 `prepare-commit-msg` hook。

确定了对应的 hook 后，下面逐步来实现功能。

## 一、使用 husky 创建 hook

首先安装 husky

使用 yarn

```shell
yarn add husky -D
```

使用 npm

```shell
npm install husky -D
```

使用 husky 创建相应的 hook，比如创建 `prepare-commit-msg` hook，同时填充内容为 `npm test`

```shell
yarn husky add .husky/prepare-commit-msg "npm test"
```

## 二、创建修改 commit-msg 的脚本

hook 创建成功后，需要修改内部的脚本。之前网上查了很多，具体可以看 [how-to-add-gits-branch-name-to-the-commit-message](https://stackoverflow.com/questions/5894946/how-to-add-gits-branch-name-to-the-commit-message)。答案最多是

```shell
#!/bin/sh
#
# Automatically adds branch name and branch description to every commit message.
#
NAME=$(git branch | grep '*' | sed 's/* //')
DESCRIPTION=$(git config branch."$NAME".description)

echo "$NAME"': '$(cat "$1") > "$1"
if [ -n "$DESCRIPTION" ]
then
   echo "" >> "$1"
   echo $DESCRIPTION >> "$1"
fi
```

因为个人对 shell 不是很熟悉，并且这个脚本我也试过了，总会换行展示，如果不想换行可能需要创建一个临时文件，或者是先读取之前的 commit-msg，然后再进行拼接，再写到 `.git/COMMIT_MSG` 中。总体来说还是比较麻烦的，后来偶然看到了一个库是 [jira-prepare-commit-msg](https://github.com/bk201-/jira-prepare-commit-msg)，这个库中支持自定义 message，以及支持使用配置文件的形式。总体来说是满足我们的需求的。但是对于业务来说肯定是希望改动最少，最简单的用法就是升级内部的脚手架，执行一个命令即可。所以需要支持自定义文件路径。

基于以上考虑，我 fork 了作者的库做了一些更改，支持使用命令的方式来使用配置文件，也支持 `includeBranch` 和 `excludeBranch` 的形式。具体可以参考 [my-prepare-commit-msg](https://github.com/snakeUni/my-prepare-commit-msg)。比如自定义 `prepare-commit.js` 的配置文件，在命令行中使用 `--config` 来实现自定义的文件。

```ts
 {
  "scripts": {
    "prepare:commit-msg": "my-prepare-commit-msg --config ./prepare-commit.js"
  }
 }
```
