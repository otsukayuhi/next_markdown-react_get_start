import React from "react";
import sanitize from "sanitize-html";

const Docs = ({ markdown }) => {
  if (!markdown) return <div>not found</div>;
  const { html } = markdown.default;

  return <div dangerouslySetInnerHTML={{ __html: sanitize(html) }} />;
};

Docs.getInitialProps = async ({ query }) => {
  const { md } = query;
  const markdown = await import(`../../markdown/${md}.md`).catch(
    () => null
  );
  return { markdown };
};

export default Docs;
