import React from 'react'
import marked from 'marked'
import hljs from 'highlight.js'
import App from 'components/App'
import { BaseContentStyle } from 'components/layout/commonStyle'
import { WrapStyle, SectionStyle } from 'components/pages/docsStyle'

marked.setOptions({
  langPrefix: '',
  highlight: (code, lang) => {
    return hljs.highlightAuto(code, [lang]).value
  }
})

const Docs = ({ markdown }) => {
  if (!markdown) return <div>not found</div>
  const html = marked(markdown.default)

  return (
    <App>
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
  const { md } = query
  const markdown = await import(`../../markdown/${md}.md`).catch(() => null)
  return { markdown }
}

export default Docs
