import React from 'react'
import BaseLayout from 'components/layout/BaseLayout'
import Nav from 'components/organism/Nav'
import { BaseContentStyle } from 'components/layout/commonStyle'
import { WrapStyle, SectionStyle } from './style'

const Docs = ({ content, id }) => (
  <BaseLayout>
    <Nav currentId={id} />
    <WrapStyle>
      <BaseContentStyle>
        <SectionStyle
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </BaseContentStyle>
    </WrapStyle>
  </BaseLayout>
)

export default Docs
