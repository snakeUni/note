const process = require('process')

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
  // 应用程序特定的日志记录，在此处抛出错误或其他逻辑
})

async function main() {
  const p1 = Promise.reject(new Error('Rejected!'))
  p1.catch(console.debug) // observe but ignore the error here
  try {
    await new Promise(r => setTimeout(r, 0))
  } finally {
    await p1 // throw the error here
  }
}

main().catch(e => console.warn(`caught on main: ${e.message}`))
