import React, { useContext } from 'react'
import BaseLayout from 'components/Layouts/BaseLayout'
import Nav from 'components/Organisms/Nav'
import { DocsContext } from 'pages/docs/[id]'
import { ContentType } from 'gateways/getContent'
import { DataType } from 'gateways/getData'
import { BaseContentStyle } from 'components/Layouts/commonStyle'
import Content from './content'
import { WrapperStyle } from './style'

export type PostProps = {
  content: ContentType | null
  currentId: string
  data: DataType | null
}

const Post: React.FC = () => {
  const { data, currentId } = useContext(DocsContext)
  return (
    <BaseLayout>
      {data && <Nav {...{ data, currentId }} />}
      <WrapperStyle>
        <BaseContentStyle>
          <Content />
        </BaseContentStyle>
      </WrapperStyle>
    </BaseLayout>
  )
}

export default Post
