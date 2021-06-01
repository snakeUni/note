const { codeFrameColumns } = require('@babel/code-frame')

try {
  throw new Error('xxx 错误')
} catch (err) {
  console.error(
    codeFrameColumns(
      `const name = guang`,
      {
        start: { line: 1, column: 14 }
      },
      {
        highlightCode: true,
        message: err.message
      }
    )
  )
}
