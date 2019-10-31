import React, { useContext } from 'react'
import marked from 'marked'
import hljs from 'highlight.js'
import { DocsContext } from 'pages/docs/[id]'
import {
  WrapperStyle,
  ContentStyle,
  ContentStyleClassName
} from './contentStyle'

// Markdownパーサー
marked.setOptions({
  langPrefix: '', // CSSクラス名のプレフィックスを削除
  highlight: (code, lang) => {
    // シンタックスハイライトを追加
    return hljs.highlightAuto(code, [lang]).value
  }
})

// MarkdownをHTMLに変換
// 取得できなければ、nullを返す
const convertIntoHtml = markdown => (markdown ? marked(markdown.default) : null)

const PostContent = () => {
  const { content } = useContext(DocsContext)
  const html = convertIntoHtml(content)
  return (
    <WrapperStyle>
      <ContentStyle
        className={ContentStyleClassName}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </WrapperStyle>
  )
}

export default PostContent
