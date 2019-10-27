import React from 'react'
import { Global, css } from '@emotion/core'
import resetCss from 'ress'

const globalStyle = css`
  ${resetCss}
  ul,
  li {
    list-style: none;
  }

  img {
    display: block;
    max-width: 100%;
  }
`

const App = ({ children }) => (
  <>
    <Global styles={globalStyle} />
    {children}
  </>
)

export default App
