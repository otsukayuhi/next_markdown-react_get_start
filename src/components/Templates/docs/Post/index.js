import React from 'react'
import BaseLayout from 'components/layout/BaseLayout'
import Nav from 'components/Organism/Nav'
import { BaseContentStyle } from 'components/layout/commonStyle'
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
