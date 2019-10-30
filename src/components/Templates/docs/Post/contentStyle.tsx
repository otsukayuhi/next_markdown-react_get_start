import styled from '@emotion/styled'
import markdownStyle from 'github-markdown-css/github-markdown.css'
import codeStyle from 'highlight.js/styles/atom-one-dark.css'

export const WrapperStyle = styled.div`
  ${markdownStyle}
  ${codeStyle}
`

// github-markdown-cssで必要なCSSクラス
export const ContentStyleClassName = 'markdown-body'

// atom-one-dark.cssの上書き
export const ContentStyle = styled.section`
  pre {
    color: rgba(256, 256, 256, 0.8) !important;
    background: #282c34 !important;
  }
`
