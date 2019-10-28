import React from 'react'
import Link from 'next/link'
import BaseLayout from 'components/Layouts/BaseLayout'
import { post } from 'gateways/posts'
import {
  WrapperStyle,
  HeadingWrapperStyle,
  HeadingStyle,
  HeadingInnerStyle,
  LeadStyle,
  ListStyle,
  ItemStyle
} from './style'

const Top = () => {
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
    <BaseLayout>
      <WrapperStyle>
        <HeadingWrapperStyle>
          <HeadingStyle>
            React勉強会 #1
            <HeadingInnerStyle>- ゆるふわ超入門編 -</HeadingInnerStyle>
          </HeadingStyle>
        </HeadingWrapperStyle>
        <LeadStyle>本日のLINE UP</LeadStyle>
        <ListStyle>{items}</ListStyle>
      </WrapperStyle>
    </BaseLayout>
  )
}

export default Top
