const fsExtra = require('fs-extra')
const path = require('path')

const args = process.argv.slice(2)

const fileName = args[0]

const files = ['index.ts', 'index.test.ts', 'README.md']

function createTemplate() {
  files.forEach(f => {
    fsExtra.ensureFileSync(path.join(process.cwd(), fileName, f))
  })
}

createTemplate()
