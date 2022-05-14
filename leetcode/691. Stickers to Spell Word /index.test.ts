import { minStickers } from './index'

describe('贴纸拼词', () => {
  expect(minStickers(['with', 'example', 'science'], 'thehat')).toBe(3)
  expect(minStickers(['notice', 'possible'], 'basicbasic')).toBe(-1)
})
