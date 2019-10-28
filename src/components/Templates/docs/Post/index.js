import React from 'react'
import BaseLayout from 'components/layouts/BaseLayout'
import Nav from 'components/Organisms/Nav'
import { BaseContentStyle } from 'components/layouts/commonStyle'
import { WrapperStyle, SectionStyle } from './style'

const Post = ({ content, id }) => (
  <BaseLayout>
    <Nav currentId={id} />
    <WrapperStyle>
      <BaseContentStyle>
        <SectionStyle
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </BaseContentStyle>
    </WrapperStyle>
  </BaseLayout>
)

export default Post
