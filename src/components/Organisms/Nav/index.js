import React from 'react'
import Link from 'next/link'
import { post } from 'gateways/posts'
import { WrapperStyle, HeadingStyle, ListStyle, ItemStyle } from './style'

const Nav = ({ currentId }) => {
  const items = post.map((item, index) => {
    const { title, id } = item
    const itemText = `${index + 1}. ${title}`

    return (
      <ItemStyle key={id}>
        <Link href="/docs/[id]" as={`/docs/${id}`}>
          <a>{currentId === id ? <strong>{itemText}</strong> : itemText}</a>
        </Link>
      </ItemStyle>
    )
  })

  return (
    <WrapperStyle>
      <HeadingStyle>Index</HeadingStyle>
      <ListStyle>{items}</ListStyle>
    </WrapperStyle>
  )
}

export default Nav
