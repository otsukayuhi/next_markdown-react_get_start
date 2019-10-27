import styled from '@emotion/styled'

export const WrapperStyle = styled.div`
  height: 100vh;
`

export const HeadingWrapper = styled.div`
  padding: 100px 0;
  background: #282c34;
`

export const HeadingStyle = styled.h1`
  margin: 0;
  font-size: 45px;
  text-align: center;
  color: #61dafb;
`

export const HeadingInnerStyle = styled.span`
  display: block;
  font-size: 30px;
`

export const LeadStyle = styled.p`
  padding-top: 50px;
  font-size: 30px;
  text-align: center;
`

export const ListStyle = styled.ol`
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
  justify-content: center;
  max-width: 600px;
`

export const ItemStyle = styled.li`
  margin: 10px;

  a {
    color: #282c34;
    &:hover {
      text-decoration: none;
    }
  }
`
