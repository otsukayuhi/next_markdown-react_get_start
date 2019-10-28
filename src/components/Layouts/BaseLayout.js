import React from 'react'
import { Global, css } from '@emotion/core'
import resetCss from 'ress'

const globalStyle = css`
  ${resetCss}

  ul[class],
  li[class] {
    padding: 0;
    list-style: none;
  }
  img {
    display: block;
    max-width: 100%;
  }
`

const BaseLayout = ({ children }) => (
  <>
    <Global styles={globalStyle} />
    {children}
  </>
)

export default BaseLayout
