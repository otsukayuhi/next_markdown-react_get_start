import React, { useContext } from 'react'
import Link from 'next/link'
import BaseLayout from 'components/Layouts/BaseLayout'
import { TopContext } from 'pages/index'
import {
  WrapperStyle,
  HeadingWrapperStyle,
  HeadingStyle,
  HeadingInnerStyle,
  LeadStyle,
  ListStyle,
  ItemStyle
} from './style'

const Top: React.FC = () => {
  const { pageData, post } = useContext(TopContext)
  const { title, subtitle } = pageData

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
            {title}
            <HeadingInnerStyle>{subtitle}</HeadingInnerStyle>
          </HeadingStyle>
        </HeadingWrapperStyle>
        <LeadStyle>本日のLINE UP</LeadStyle>
        <ListStyle>{items}</ListStyle>
      </WrapperStyle>
    </BaseLayout>
  )
}

export default Top
