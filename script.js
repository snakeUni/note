const matter = require('gray-matter')
const fsExtra = require('fs-extra')
const argv = require('minimist')(process.argv.slice(2))

// 文件夹名称,携带完成路径
const dirName = argv.dirName
const cwd = process.cwd()

const autoReadme = () => {
  const innerDirName = `${cwd}/${dirName}`
  const files = fsExtra.readdirSync(innerDirName)
  const result = []

  const getFile = (innerFiles, dirName) => {
    for (let i = 0; i < innerFiles.length; i++) {
      const name = innerFiles[i]
      const filePath = `${dirName}/${name}`
      const fileState = fsExtra.statSync(filePath)

      if (fileState.isDirectory()) {
        result.push({ state: 'dir', name: name })
        const nextFiles = fsExtra.readdirSync(filePath)
        getFile(nextFiles, filePath)
      } else {
        const fileStr = fsExtra.readFileSync(filePath)
        const fileMatter = matter(fileStr)
        result.push({ state: 'file', name, data: fileMatter.data })
      }
    }
  }

  getFile(files, innerDirName)

  return result
}

console.log(JSON.stringify(autoReadme()))
