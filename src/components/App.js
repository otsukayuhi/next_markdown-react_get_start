import React from 'react'
import { Global, css } from '@emotion/core'
import resetCss from 'modern-css-reset'

const App = ({ children }) => (
  <main>
    <Global
      styles={css`
        ${resetCss}
      `}
    />
    {children}
  </main>
)

export default App
