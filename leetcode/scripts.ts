const fsExtra = require('fs-extra')
const path = require('path')

const args = process.argv.slice(2)

const fileName = args.reduce((t, c) => {
  return t + c + ' '
}, '')

const files = ['index.ts', 'index.test.ts', 'README.md']

function createTemplate() {
  const dirName = path.join(process.cwd(), fileName)
  if (fsExtra.existsSync(dirName)) {
    console.log(`文件 ${files} 已存在`)
    return
  }

  files.forEach(f => {
    fsExtra.ensureFileSync(path.join(process.cwd(), fileName, f))
  })
}

createTemplate()
