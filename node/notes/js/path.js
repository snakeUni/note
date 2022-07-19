const path = require('path')

const abs = '/home/john/proj'

console.log(path.resolve(abs, '.'))
// '/home/john/proj'
console.log(path.resolve(abs, '..'))
// '/home/john'
console.log(path.resolve(abs, 'dir'))
// '/home/john/proj/dir'
console.log(path.resolve(abs, './dir'))
// '/home/john/proj/dir'
console.log(path.resolve(abs, '../dir'))
// '/home/john/dir'
console.log(path.resolve(abs, '../../dir/subdir'))
// '/home/dir/subdir'

console.log('-----------')
console.log(process.cwd(), path.resolve())
