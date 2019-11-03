import getData from './getData'

// TODO: 取得失敗したときのテストをどうやってかくのか？
describe('gateways/getData', () => {
  it('引数がないときはnullを返す', async () => {
    const data = await getData({})
    await expect(data).toBeNull()
  })
  it('postのみ取得', async () => {
    const data = await getData({ isPost: true })
    await expect(data).toHaveProperty('post')
    await expect(data).not.toHaveProperty('pageData')
  })
  it('pageDataのみ取得', async () => {
    const data = await getData({ pageName: 'top' })
    await expect(data).toHaveProperty('pageData')
    await expect(data).not.toHaveProperty('post')
  })
  it('postとpageDataを取得', async () => {
    const data = await getData({ pageName: 'top', isPost: true })
    await expect(data).toHaveProperty('pageData')
    await expect(data).toHaveProperty('post')
  })
  it('【pageDataのみ取得】引数pageNameプロパティの対応ページがないとき、pageDataは nullを返す', async () => {
    const data = await getData({ pageName: 'NoPageName' })
    await expect(data).toBeNull()
  })
  it('【postとpageDataを取得】引数pageNameプロパティの対応ページがないとき、postのみ返す', async () => {
    const data = await getData({ isPost: true, pageName: 'NoPageName' })
    await expect(data).toHaveProperty('post')
    await expect(data).not.toHaveProperty('pageData')
  })
})
