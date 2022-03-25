# lerna 发版坑点

假设 lerna 的结构是这样的

```text
my-lerna-repo/
  package.json
  packages/
    package-1/
      package.json
    package-2/
      package.json
  fixtures/
    demo-1/
      package.json
    demo-2/
      package.json
```

配置的 CI 命令

```yaml
- yarn lerna version --conventional-commits --conventional-graduate --force-git-tag --force-publish=* --yes
- yarn lerna publish from-git --force-git-tag --yes
```

此时这样的配置发包会发布 4 个包，分为是 `package-1`、 `package-2`、 `demo-1`、 `demo-2`, 可以看到两个 demo 也会被 publish, 如果想要不发布 demo 的
两个包，那么需要分别给 demo 的两个包的 `package.json` 中加上 `"private": true`。这样才可以确保 demo 的包不会被发布，这个在 lerna 的官网上有相关解释。

> Lerna will never publish packages which are marked as private ("private": true in the package.json).

如果项目的结构是只有一个 example，比如

```text
my-lerna-repo/
  package.json
  packages/
    package-1/
      package.json
    package-2/
      package.json
  demo-1/
    package.json
```

那么 demo 不需要设置 `"private": true`，因为发布的时候并不会发布 demo-1, 最好的方式还是在 `package.json` 中加上 `"private": true` 以此来确保不会出现发布相关的问题。
