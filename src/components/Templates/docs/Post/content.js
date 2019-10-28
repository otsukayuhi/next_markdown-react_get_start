import React from 'react'
import {
  WrapperStyle,
  ContentStyle,
  ContentStyleClassName
} from './contentStyle'

const PostContent = ({ content }) => (
  <WrapperStyle>
    <ContentStyle
      className={ContentStyleClassName}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </WrapperStyle>
)

export default PostContent
