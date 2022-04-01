# module.paths 记录

执行 `console.log(module.paths)` 输入结果如下：

```text
[
  '/Users/xxx/Desktop/my-github/note/node-study/node_modules',
  '/Users/xxx/Desktop/my-github/note/node_modules',
  '/Users/xxx/Desktop/my-github/node_modules',
  '/Users/xxx/Desktop/node_modules',
  '/Users/xxx/node_modules',
  '/Users/node_modules',
  '/node_modules'
]
```

模块路径生成规则

```text
模块路径的生成规则
  1. 当前目录文件下的 node_modules
  2. 父目录下的 node_modules
  3. 父目录的父目录下的 node_modules
  4. 沿路径向上逐级递归，直到根目录下的 node_modules
```

查找扩展名的顺序是 .js .json .node

```text
不同的文件扩展名，载入的方式也是不同的
  a. .js 文件。通过 fs 模块同步读取文件后编译执行。
  b. .node 文件。这是 c/c++ 编写的扩展文件，通过 dlopen() 方法加载最后编译生成的文件。
  c. .json 文件。通过 fs 模块同步读取文件后，用 JSON.parse() 解析返回结果。
  d. 其余扩展名文件。它们都被当做 .js 文件载入。
```

js 模块的编译，我们知道在每个模块文件中存在 `require`、`exports`、`module` 这 3 个变量，甚至在 Node 的 API 文档中，我们知道每个模块中还有 `__filename`, `__dirname` 这两个变量的存在，它们是如何而来的？

事实上，在编译的过程中，Node 对获取的 js 文件内容进行了头尾包装。在头部添加了

```ts
(function (exports, require, module, __filename, __dirname) {\n, 在尾部添加了\n})
 // 一个正常的 js 文件会被包装成如下的样式:
  (function (exports, require, module, __filename, __dirname) {
   var math = require('math')
   exports.area = function (radius) {
     return Math.PI * radius * radius
     }
  })
```

nodeJs 中也有一些核心模块，也是内置模块，引入流程如下

```text
require('os') <- NativeModule.require('os') <- process.binding('os') <- get_builtin_module('node_os') <- NODE_MODULE(node_os, reg_func)
```
