import React from 'react'
import BaseLayout from 'components/Layouts/BaseLayout'
import Nav from 'components/Organisms/Nav'
import { ContentType } from 'gateways/getContent'
import { DataType } from 'gateways/getData'
import { BaseContentStyle } from 'components/Layouts/commonStyle'
import Content from './content'
import { WrapperStyle } from './style'

export type PostProps = {
  content: ContentType | null
  id: string | string[]
  data: DataType | null
}

const Post: React.FC = () => (
  <BaseLayout>
    <Nav />
    <WrapperStyle>
      <BaseContentStyle>
        <Content />
      </BaseContentStyle>
    </WrapperStyle>
  </BaseLayout>
)

export default Post
