# path

```ts
const abs = '/home/john/proj'

path.resolve(abs, '.')
// '/home/john/proj'
path.resolve(abs, '..')
// '/home/john'
path.resolve(abs, 'dir')
// '/home/john/proj/dir'
path.resolve(abs, './dir')
// '/home/john/proj/dir'
path.resolve(abs, '../dir')
// '/home/john/dir'
path.resolve(abs, '../../dir/subdir')
// '/home/dir/subdir'
```

## path.resolve()

`path.resolve()` 总是返回完全限定的路径。使用以下算法

- 从当前目录开始(`process.cwd()`)
- 根据先前的结果解析 `path[0]`
- 根据先前的结果解析 `path[1]`
- 对所有剩余路径执行相同操作
- 返回最终结果

如果 `path.resolve()` 没有参数，将返回 `cwd`

```ts
process.cwd()
// '/Users/fox/Desktop/my-github/note/node/notes/js'
path.resolve()
// '/Users/fox/Desktop/my-github/note/node/notes/js'
```

一个或多个相对路径用于解析，从当前工作目录开始

```text
> path.resolve('.')
'/usr/local'
> path.resolve('..')
'/usr'
> path.resolve('bin')
'/usr/local/bin'
> path.resolve('./bin', 'sub')
'/usr/local/bin/sub'
> path.resolve('../lib', 'log')
'/usr/lib/log'
```

任何完全限定的路径都会替换之前的结果：

```text
> path.resolve('bin', '/home')
'/home'
```

`path.resolve()`（一个参数）：确保路径被规范化和完全限定

使用 `path.resolve()` 在 Unix:

```text
> process.cwd()
'/usr/local'

> path.resolve('/home/./john/lib/../photos///pet')
'/home/john/photos/pet'
> path.resolve('./john/lib/../photos///pet')
'/usr/local/john/photos/pet'
```

使用 `path.resolve()` 在 Windows:

```text
> process.cwd()
'C:\\Windows\\System'

> path.resolve('C:\\Users/jane\\doc\\..\\proj\\\\src')
'C:\\Users\\jane\\proj\\src'
> path.resolve('.\\jane\\doc\\..\\proj\\\\src')
'C:\\Windows\\System\\jane\\proj\\src'
```

## path.join()

`path.join()` 连接路径，同时保留相对路径

从 `paths[0]` 开始，并将剩余的路径解释为升序或降序指令。与 `path.resolve()` 相比，此函数保留部分限定的路径：如果 paths[0]` 是部分限定的，则结果是部分限定的。如果是完全限定的，则结果是完全限定的。

降序

```text
> path.posix.join('/usr/local', 'sub', 'subsub')
'/usr/local/sub/subsub'
> path.posix.join('relative/dir', 'sub', 'subsub')
'relative/dir/sub/subsub'
```

双点上升

```text
> path.posix.join('/usr/local', '..')
'/usr'
> path.posix.join('relative/dir', '..')
'relative'
```

单点什么都不做：

```text
> path.posix.join('/usr/local', '.')
'/usr/local'
> path.posix.join('relative/dir', '.')
'relative/dir'
```

如果第一个参数之后的参数是完全限定路径，则它们被解释为相对路径：

```text
> path.posix.join('dir', '/tmp')
'dir/tmp'
> path.win32.join('dir', 'C:\\Users')
'dir\\C:\\Users'
> path.posix.join('/usr/local', '../lib', '.', 'log')
'/usr/lib/log'
```

## path.normalize()

`path.normalize()`：确保路径被规范化

Unix 中，path.normalize():

- 删除单点 (.) 的路径段。
- 解析双点 (..) 的路径段。
- 将多个路径分隔符转换为单个路径分隔符。

```ts
// Fully qualified path
assert.equal(
  path.posix.normalize('/home/./john/lib/../photos///pet'),
  '/home/john/photos/pet'
)

// Partially qualified path
assert.equal(
  path.posix.normalize('./john/lib/../photos///pet'),
  'john/photos/pet'
)
```

Windows 中，path.normalize():

- 删除单点 (.) 的路径段。
- 解析双点 (..) 的路径段。
- 将每个路径分隔符斜杠 (/) - 这是合法的 - 转换为首选路径分隔符 (\)。
- 将多个路径分隔符的序列转换为单个反斜杠

```ts
// Fully qualified path
assert.equal(
  path.win32.normalize('C:\\Users/jane\\doc\\..\\proj\\\\src'),
  'C:\\Users\\jane\\proj\\src'
)

// Partially qualified path
assert.equal(
  path.win32.normalize('.\\jane\\doc\\..\\proj\\\\src'),
  'jane\\proj\\src'
)
```

请注意，带有单个参数的 `path.join()` 也可以规范化，并且与 `path.normalize()` 的工作方式相同:

```text
> path.posix.normalize('/home/./john/lib/../photos///pet')
'/home/john/photos/pet'
> path.posix.join('/home/./john/lib/../photos///pet')
'/home/john/photos/pet'

> path.posix.normalize('./john/lib/../photos///pet')
'john/photos/pet'
> path.posix.join('./john/lib/../photos///pet')
'john/photos/pet'
```

## path.relative()

`path.relative()` 创建相对路径。

`path.relative(sourcePath: string, destinationPath: string): string` 返回从 sourcePath 到 destinationPath 的相对路径

```text
> path.posix.relative('/home/john/', '/home/john/proj/my-lib/README.md')
'proj/my-lib/README.md'
> path.posix.relative('/tmp/proj/my-lib/', '/tmp/doc/zsh.txt')
'../../doc/zsh.txt'
```

在 `Windows` 上，如果 `sourcePath` 和 `destinationPath` 在不同的驱动器上，我们会得到一个完全限定的路径：

```text
> path.win32.relative('Z:\\tmp\\', 'C:\\Users\\Jane\\')
'C:\\Users\\Jane'

> path.posix.relative('proj/my-lib/', 'doc/zsh.txt')
'../../doc/zsh.txt'
```

## path.parse()

`path.parse()`：创建一个带有路径部分的对象

```ts
type PathObject = {
  dir: string,
  root: string,
  base: string,
  name: string,
  ext: string,
}

path.parse(path: string): PathObject
```

- `.base`: 路径的最后一段
- `.ext`: 文件的扩展名
- `.name`: 文件的名称(没有扩展名)
- `.root`: 路径的开始
- `.dir`: base 所在的目录——没有 base 的路径

`path.parse()` 在 Unix 中

```text
> path.posix.parse('/home/jane/file.txt')
{
  dir: '/home/jane',
  root: '/',
  base: 'file.txt',
  name: 'file',
  ext: '.txt',
}
```

一张图表示

```text
  /      home/jane / file   .txt
| root |           | name | ext  |
| dir              | base        |
```

`path.parse()` 在 Windows 中

```text
> path.win32.parse(String.raw`C:\Users\john\file.txt`)
{
  dir: 'C:\\Users\\john',
  root: 'C:\\',
  base: 'file.txt',
  name: 'file',
  ext: '.txt',
}
```

一张图展示

```text
  C:\    Users\john \ file   .txt
| root |            | name | ext  |
| dir               | base        |
```

## path.format()

`path.format()` 和 `path.parse()` 相反
