import React from 'react';
import { Global, css } from '@emotion/core';
import resetCss from 'ress/dist/ress.min.css';

const globalStyle = css`
  ${resetCss}

  body {
    font-family: sans-serif;
  }

  ul[class],
  li[class] {
    padding: 0;
    list-style: none;
  }
  img {
    display: block;
    max-width: 100%;
  }
`;

const BaseLayout: React.FC = ({ children }) => (
  <>
    <Global styles={globalStyle} />
    {children}
  </>
);

export default BaseLayout;
