import styled from '@emotion/styled'
import { md } from 'const/breakpoints'

export const BaseContentStyle = styled.div`
  margin: 0 auto;
  padding: 30px 20px;
  min-width: 200px;
  max-width: 880px;

  @media (min-width: ${md}px) {
    padding: 50px 45px;
  }
`
