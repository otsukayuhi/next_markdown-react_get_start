import React from 'react'
import marked from 'marked'
import hljs from 'highlight.js'
import App from 'components/App'
import Nav from 'components/Nav'
import { BaseContentStyle } from 'components/layout/commonStyle'
import { WrapStyle, SectionStyle } from 'components/pages/docsStyle'

marked.setOptions({
  langPrefix: '',
  highlight: (code, lang) => {
    return hljs.highlightAuto(code, [lang]).value
  }
})

const Docs = ({ markdown, id }) => {
  if (!markdown) return <div>not found</div>
  const html = marked(markdown.default)

  return (
    <App>
      <Nav currentId={id} />
      <WrapStyle>
        <BaseContentStyle>
          <SectionStyle
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </BaseContentStyle>
      </WrapStyle>
    </App>
  )
}

Docs.getInitialProps = async ({ query }) => {
  const { id } = query
  const markdown = await import(`../../markdown/${id}.md`).catch(() => null)
  return { markdown, id }
}

export default Docs
