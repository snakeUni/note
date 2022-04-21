import { toGoatLatin } from './index'

describe('山羊拉丁文', () => {
  it('test', () => {
    expect(toGoatLatin('I speak Goat Latin')).toEqual(
      'Imaa peaksmaaa oatGmaaaa atinLmaaaaa'
    )
    expect(toGoatLatin('The quick brown fox jumped over the lazy dog')).toEqual(
      'heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa'
    )
  })
})
