# child process

在 NodeJS 中，可以使用多种方法执行一个 shell 命令，下方总结了各个命令的作用以及区别。[点击查看原文](https://2ality.com/2022/07/nodejs-child-process.html)

## Spawn(异步)

`spawn(command: string, args?: Array<string>, options?: Object): ChildProcess`

### command 参数

| 模式                                                              | 备注                                                                                        |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| commandOnly 模式，args 被过滤掉，此时的 command 是整个 shell 命令 | `option.shell: true` 因此需要处理 shell 的功能                                              |
| Args 模式, 此时 command 只包含命令的名字，args 包含参数           | 如果 `option.shell: true`, 参数中的元字符也将生效, `option.shell: false` 元字符将不会被转义 |

### option 参数

| 参数                                         | 作用                                           |
| -------------------------------------------- | ---------------------------------------------- |
| `.shell: boolean \| string (default: false)` | 配置是否使用 shell 来执行命令                  |
| `.cwd: string \| URL`                        | 声明当前的工作目录 `current working directory` |
| `.stdio: Array<string\|Stream>\|string`      | 配置标准的 I/0 设置方式                        |
| `.env: Object (default: process.env)`        | 声明子进程的 shell 变量                        |
| `.signal: AbortSignal`                       | 如果创建了 AbortController 可以使用            |
| `.timeout: number`                           | 超时时间，如果子进程超过这个时间，将会被杀掉   |

#### options.stdio

子进程的每个标准 I/O 流都有一个数字 ID，即所谓的文件描述符

- 标准输入 (stdin) 的文件描述符为 0
- 标准输出 (stdout) 的文件描述符为 1
- 标准错误 (stderr) 的文件描述符为 2

`options.stdio` 可以用数组的形式来配置文件描述符，这个对应数组的 index。可以配置下面的这些值

- `pipe`

  - Index 0: Pipe childProcess.stdin to the child’s stdin. Note that, despite its name, the former is a stream that belongs to the parent process.
  - Index 1: Pipe the child’s stdout to childProcess.stdout.
  - Index 2: Pipe the child’s stderr to childProcess.stderr.

- `ignore`： Ignore the child’s stream
- `inherit`：Pipe the child’s stream to the corresponding stream of the parent process.
  - For example, if we want the child’s stderr to be logged to the console, we can use 'inherit' at index 2

这些参数是可以简写的，`pipe = ['pipe', 'pipe', 'pipe']`, `ignore = ['ignore', 'ignore', 'ignore']`, `inherit = ['inherit', 'inherit', 'inherit']`

### Result: ChildProcess 的实例

| 属性/方法/事件                                                              | 作用                                                                                                                                             |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.exitCode: number \| null`                                                 | `0: 正常退出`, `> 0: 有错误发生`, `null: 进程还没有退出`                                                                                         |
| `.stdin`                                                                    | 取决与之前的配置                                                                                                                                 |
| `.stdout`                                                                   | 取决与之前的配置                                                                                                                                 |
| `.stderr`                                                                   | 取决与之前的配置                                                                                                                                 |
| `.pid`                                                                      | 进程的标识符                                                                                                                                     |
| `.kill(signalCode?: number \| string = 'SIGTERM'): boolean`                 | 杀死进程                                                                                                                                         |
| `.on('exit', (exitCode: number \| null, signalCode: string \| null) => {})` | 子进程结束的时候会触发退出事件。如果存在多个进程共享一个 stream，那么此时状态仍然会是 open 状态，可以通过 `close` 事件来监听所有的子进程都退出后 |
| `.on('error', (err: Error) => {})`                                          | 这个事件被触发，通常是两种情况：`1. 进程无法生成。 2. 子进程无法被 killed` 。                                                                    |

## SpawnSync

`spawnSync( command: string, args?: Array<string>, options?: Object ): Object`

`spawnSync()` 是 spawn() 的同步模式，它会等待子进程退出，然后同步返回一个对象。参数属性几乎和 `spawn` 是一致的，但是也有一些额外的参数属性。

- `options.input: string \| TypedArray \| DataView`: 如果此属性存在，那么它的值被发送到子进程的标准输入。
- `options.encoding: string (default: 'buffer')`: 声明流的编码形式。

因为是同步的形式，因此返回一个对象

| 属性                        | 作用                                                      |
| --------------------------- | --------------------------------------------------------- |
| `.stdout: Buffer \| string` | 包含写入子进程标准输出流的任何内容。                      |
| `.stderr: Buffer \| string` | 包含写入子进程的标准错误流的任何内容。                    |
| `.status: number \| null`   | 包含子进程的退出代码或 null。退出代码或信号代码都不为空。 |
| `.signal: string \| null`   | 包含子进程的信号代码或 null。退出代码或信号代码都不为空。 |
| `.error?: Error`            | 仅当生成进程不起作用时才创建此属性，然后包含一个错误对象  |

## exec

`exec( command: string, options?: Object, callback?: (error, stdout, stderr) => void ): ChildProcess`

exec() 在新生成的 shell 中运行命令。与 spawn() 的主要区别是

- 除了返回 ChildProcess，exec() 还通过回调传递结果：错误对象或 stdout 和 stderr 的内容。
- 错误原因：子进程无法生成、shell 错误、子进程被杀
  - 相反，如果子进程无法生成，spawn() 只会发出“错误”事件。其他两个故障通过退出代码和（在 Unix 上）信号代码来处理。
- 没有 args 参数。
- 默认 `options.shell: true`。

## execFile

`execFile(file, args?, options?, callback?): ChildProcess`

和 exec 相似，不同点是

- 支持 args 参数
- `options.shell` 默认为 false

exec 和 execFile 都可以被转换成 Promise 的形式。

## execSync

`execSync( command: string, options?: Object ): Buffer | string`

execSync() 在新的子进程中运行命令并同步等待，直到该进程退出。与 spawnSync() 的主要区别是:

- 只返回 stdout 的内容。
- 通过异常报告三种失败：子进程无法生成，shell 错误，子进程被杀死。
  - 相反，如果子进程无法生成，spawnSync() 的结果只有一个 .error 属性。其他两个故障通过退出代码和（在 Unix 上）信号代码来处理。
- 没有 args 参数。
- 默认 `options.shell` 为 true。

## execFileSync

`execFileSync(file, args?, options?): Buffer | string`

和 `execSync` 比较相似，不同点是：

- 支持 args 参数。
- 默认 `options.shell` 为 true。
