import marked from 'marked'
import hljs from 'highlight.js'

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

// Markdownファイルを取得
// 取得できなれば、nullを返す
export const getContent = async id => {
  const markdown = await import(`../../data/markdown/${id}.md`).catch(
    () => null
  )
  const content = await convertIntoHtml(markdown)
  return content
}
