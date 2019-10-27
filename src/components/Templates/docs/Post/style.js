import styled from '@emotion/styled'
import codeStyle from 'highlight.js/styles/atom-one-dark.css'
import markdownStyle from 'github-markdown-css'

export const WrapStyle = styled.div`
  margin-left: 240px;
  ${markdownStyle}
  ${codeStyle}
`

export const SectionStyle = styled.section`
  pre {
    color: rgba(256, 256, 256, 0.8) !important;
    background: #282c34 !important;
  }
`
