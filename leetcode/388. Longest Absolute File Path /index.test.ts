import { lengthLongestPath } from './index'

describe('文件的最长绝对路径', () => {
  it('test', () => {
    expect(lengthLongestPath('dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext')).toBe(
      20
    )
    expect(
      lengthLongestPath(
        'dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext'
      )
    ).toBe(32)
    expect(lengthLongestPath('a')).toBe(0)
    expect(lengthLongestPath('file1.txt\nfile2.txt\nlongfile.txt')).toBe(12)
  })
})
