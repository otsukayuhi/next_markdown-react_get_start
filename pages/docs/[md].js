import React from "react";
import styled from "@emotion/styled";
import marked from "marked";
import hljs from 'highlight.js';
import App from "../../components/App";
import "highlight.js/styles/atom-one-dark.css";
import "github-markdown-css";

const Section = styled.section`
  min-width: 200px;
  max-width: 880px;
  margin: 0 auto;
  padding: 45px 0;

  pre {
    border-radius: 5px;
    color: rgba(256, 256, 256, 0.8);
    background: #282c34;
  }
`;

marked.setOptions({
  langPrefix: "",
  highlight: (code, lang) => {
    return hljs.highlightAuto(code, [lang]).value;
  }
});

const Docs = ({ markdown }) => {
  if (!markdown) return <div>not found</div>;
  const html = marked(markdown.default);

  return (
    <App>
      <Section
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </App>
  );
};

Docs.getInitialProps = async ({ query }) => {
  const { md } = query;
  const markdown = await import(`../../markdown/${md}.md`).catch(
    () => null
  );
  return { markdown };
};

export default Docs;
