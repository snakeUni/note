import { isPalindrome } from './index'

describe('验证回文串', () => {
  expect(isPalindrome('A man, a plan, a canal: Panama')).toBeTruthy()
  expect(isPalindrome('race a car')).toBeFalsy()
})
