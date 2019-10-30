import React from 'react'
import BaseLayout from 'components/Layouts/BaseLayout'
import Nav from 'components/Organisms/Nav'
import { BaseContentStyle } from 'components/Layouts/commonStyle'
import Content from './content'
import { WrapperStyle } from './style'

const Post = ({ content, id }) => (
  <BaseLayout>
    <Nav currentId={id} />
    <WrapperStyle>
      <BaseContentStyle>
        <Content content={content} />
      </BaseContentStyle>
    </WrapperStyle>
  </BaseLayout>
)

export default Post
