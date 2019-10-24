import React from 'react'
import marked from 'marked'
import sanitize from 'sanitize-html'

const Index = ({ md }) => {
  const markdown = sanitize(marked(md.default))
  return <div dangerouslySetInnerHTML={{ __html: markdown }} />
};

Index.getInitialProps = async context => {
  const md = await import(`../markdown/${context.query.md}.md`)
  return { md }
};

export default Index