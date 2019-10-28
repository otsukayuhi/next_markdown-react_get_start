import React from 'react'
import { Global, css } from '@emotion/core'
import resetCss from 'ress'

const globalStyle = css`
  ${resetCss}

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
