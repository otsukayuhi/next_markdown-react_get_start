import React from "react";
import marked from "marked";
import sanitize from "sanitize-html";
import errorpage from '../../markdown/error.md'

const Markdown = ({ md }) => {
  const markdown = md.default || md;
  return (
    <div dangerouslySetInnerHTML={{ __html: sanitize(marked(markdown)) }} />
  );
};

Markdown.getInitialProps = async context => {
  const md = await import(`../../markdown/${context.query.md}.md`).catch(
    () => errorpage
  );
  return { md };
};

export default Markdown;
