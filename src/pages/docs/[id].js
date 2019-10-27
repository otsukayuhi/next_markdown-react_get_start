import React from 'react'
import Post from 'components/Templates/docs/Post'
import NotFound from 'components/Organism/NotFound'
import { getContent } from 'presenter/getContent'

const Page = ({ content, id }) =>
  content ? <Post {...{ content, id }} /> : <NotFound />

Page.getInitialProps = async ({ query }) => {
  const { id } = query
  const content = await getContent(id)
  return { content, id }
}

export default Page
