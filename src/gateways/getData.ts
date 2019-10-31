export type PostType = {
  id: string
  title: string
}

export type PageDataType = {
  title: string
  subtitle: string
}

export type GetDataArg = {
  pageName?: string
}

export type DataType = {
  pageData: PageDataType
  post: PostType[]
}

const getData = async ({ pageName = 'top' }: GetDataArg = {}) => {
  const data = await import('../../data/data.json').catch(() => null)
  if (!data) return null

  return { pageData: data[pageName], post: data.post }
}

export default getData
