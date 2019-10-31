import React from 'react'
import { NextPage } from 'next'
import Post, { PostProps } from 'components/Templates/docs/Post'
import NotFound from 'components/Organisms/NotFound'
import getData from 'gateways/getData'
import getContent from 'gateways/getContent'

export const DocsContext = React.createContext<PostProps>(null as any)

const Page: NextPage<PostProps> = ({ id, content, data }) => (
  <DocsContext.Provider value={{ id, content, data }}>
    {content ? <Post /> : <NotFound />}
  </DocsContext.Provider>
)

Page.getInitialProps = async ({ query }) => {
  const { id } = query
  const content = !Array.isArray(id) ? await getContent(id) : null
  const data = await getData()
  return { id, content, data }
}

export default Page
