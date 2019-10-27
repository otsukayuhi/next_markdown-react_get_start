import React from 'react'
import Link from 'next/link'
import App from 'components/layout/BaseLayout'
import { post } from 'gateway/posts'
import {
  WrapperStyle,
  HeadingWrapper,
  HeadingStyle,
  HeadingInnerStyle,
  LeadStyle,
  ListStyle,
  ItemStyle
} from 'components/templates/Top/style'

const Index = () => {
  const items = post.map((item, index) => {
    const { title, id } = item

    return (
      <ItemStyle key={id}>
        <Link href="/docs/[id]" as={`/docs/${id}`}>
          <a>{`${index + 1}. ${title}`}</a>
        </Link>
      </ItemStyle>
    )
  })

  return (
    <App>
      <WrapperStyle>
        <HeadingWrapper>
          <HeadingStyle>
            React勉強会 #1
            <HeadingInnerStyle>- ゆるふわ超入門編 -</HeadingInnerStyle>
          </HeadingStyle>
        </HeadingWrapper>
        <LeadStyle>本日のLINE UP</LeadStyle>
        <ListStyle>{items}</ListStyle>
      </WrapperStyle>
    </App>
  )
}

export default Index
