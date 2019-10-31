import React, { useContext } from 'react'
import Link from 'next/link'
import { DocsContext } from 'pages/docs/[id]'
import { WrapperStyle, HeadingStyle, ListStyle, ItemStyle } from './style'

const Nav = () => {
  const { data, id: currentId } = useContext(DocsContext)

  if (data === null) return null

  const items = data.post.map((item, index) => {
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
