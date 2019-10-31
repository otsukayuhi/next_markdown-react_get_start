import React from 'react'
import BaseLayout from 'components/Layouts/BaseLayout'
import Nav from 'components/Organisms/Nav'
import { BaseContentStyle } from 'components/Layouts/commonStyle'
import Content from './content'
import { WrapperStyle } from './style'

const Post: React.FC = () => {
  return (
    <BaseLayout>
      <Nav />
      <WrapperStyle>
        <BaseContentStyle>
          <Content />
        </BaseContentStyle>
      </WrapperStyle>
    </BaseLayout>
  )
}

export default Post
