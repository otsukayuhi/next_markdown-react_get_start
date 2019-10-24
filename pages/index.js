import React from 'react'
import marked from 'marked'
import sanitize from 'sanitize-html'

const Index = ({ md }) => {
  const markdown = md.default || md;
  return <div dangerouslySetInnerHTML={{ __html: sanitize(marked(markdown)) }} />
};

Index.getInitialProps = async context => {
  const md = await import(`../markdown/${context.query.md}.md`)
    .catch(() => '# エラーだお')
  return { md }
};

export default Index