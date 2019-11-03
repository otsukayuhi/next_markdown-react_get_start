export type PostType = {
  id: string
  title: string
}

export type PageDataType = {
  title: string
  subtitle: string | null
}

export type GetDataArg = {
  pageName?: string
  isPost?: boolean
}

export type DataType = {
  pageData?: PageDataType
  post?: PostType[]
}

const getData = async ({
  pageName = undefined,
  isPost = false
}: GetDataArg) => {
  const data = await import('../../data/data.json').catch(() => null)

  // dataがnullのときは null を返す
  if (!data) return null

  // postのみ取得したいとき
  if (isPost && !pageName) return { post: data.post }

  // pageDataのみ取得したいとき、かつ、'top'ではないとき
  if (!isPost && pageName && pageName === 'top')
    return { pageData: data[pageName] }

  // pageDataが取得したいけど、ページの名前が間違っているときnullを返す
  if (!isPost && pageName && !data[pageName]) return null

  // postとpageDataが取得したいけど、ページの名前が間違っているときはpostのみ返す
  if (isPost && pageName && !data[pageName]) return { post: data.post }

  // postとpageDataが取得したいとき
  if (isPost && pageName) return { post: data.post, pageData: data[pageName] }

  // 引数がない（デフォルト引数）のときは null を返す
  return null
}

export default getData
