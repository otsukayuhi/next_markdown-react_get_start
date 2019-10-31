import React from 'react'
import { NextPage } from 'next'
import Post from 'components/Templates/docs/Post'
import NotFound from 'components/Organisms/NotFound'
import getData, { DataType } from 'gateways/getData'
import getContent, { ContentType } from 'gateways/getContent'

export type DocsProps = {
  content: ContentType | null
  id: string | string[]
  data: DataType | null
}

const docsData: DocsProps = {
  content: {
    default: ''
  },
  id: '',
  data: {
    pageData: {
      title: '',
      subtitle: ''
    },
    post: [
      {
        id: '',
        title: ''
      }
    ]
  }
}

export const DocsContext = React.createContext(docsData)

const Page: NextPage<DocsProps> = props => {
  return (
    <DocsContext.Provider value={props}>
      {props.content ? <Post /> : <NotFound />}
    </DocsContext.Provider>
  )
}

Page.getInitialProps = async ({ query }) => {
  console.log(query)

  const { id } = query
  const content = !Array.isArray(id) ? await getContent(id) : null
  const data = await getData()
  return { id, content, data }
}

export default Page
