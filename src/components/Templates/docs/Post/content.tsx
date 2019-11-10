import React, { useContext } from 'react';
import Head from 'next/head';
import marked from 'marked';
import hljs from 'highlight.js';
import { DocsContext } from 'pages/docs/[id]';
import {
  WrapperStyle,
  ContentStyle,
  ContentStyleClassName,
} from './contentStyle';

// Markdownパーサー
marked.setOptions({
  langPrefix: '', // CSSクラス名のプレフィックスを削除
  highlight: (code, lang) => {
    // シンタックスハイライトを追加
    return hljs.highlightAuto(code, [lang]).value;
  },
});

// MarkdownをHTMLに変換
// 取得できなければ、nullを返す
const convertIntoHtml = markdown =>
  markdown ? marked(markdown.default) : null;

const PostContent: React.FC = () => {
  const { data, content, currentId } = useContext(DocsContext);
  const myData =
    data && data.post
      ? data.post.filter(item => {
          if (item.id === currentId) return item;
        })
      : null;
  const title = myData ? myData[0].title : null;

  const html = convertIntoHtml(content);
  return (
    <>
      <Head>
        <title>{title}</title>
        {title && <meta name="description" content={title} />}
      </Head>
      <WrapperStyle>
        <ContentStyle
          className={ContentStyleClassName}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </WrapperStyle>
    </>
  );
};

export default PostContent;
