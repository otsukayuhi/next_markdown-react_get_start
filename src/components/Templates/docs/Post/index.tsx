import React, { useContext, useState } from 'react';
import BaseLayout from 'components/Layouts/BaseLayout';
import Nav from 'components/Organisms/Nav';
import { MenuRounded, CloseRounded } from '@material-ui/icons';
import { DocsContext } from 'pages/docs/[id]';
import { ContentType } from 'gateways/getContent';
import { DataType } from 'gateways/getData';
import { BaseContentStyle } from 'components/Layouts/commonStyle';
import Content from './content';
import {
  WrapperStyle,
  ContentWrapperStyle,
  NavWrapperStyle,
  MenuButtonWrapperStyle,
} from './style';

export type PostProps = {
  content: ContentType | null;
  currentId: string;
  data: DataType | null;
};

const Post: React.FC = () => {
  const { data, currentId } = useContext(DocsContext);
  const [isNavShow, setIsNavShow] = useState(false);
  const onToggleNav = () => setIsNavShow(!isNavShow);
  const menuButton = isNavShow ? (
    <CloseRounded fontSize="large" />
  ) : (
    <MenuRounded fontSize="large" />
  );

  return (
    <BaseLayout>
      <WrapperStyle>
        <MenuButtonWrapperStyle onClick={onToggleNav}>
          {menuButton}
        </MenuButtonWrapperStyle>
        <NavWrapperStyle isNavShow={isNavShow}>
          {data && <Nav {...{ data, currentId }} />}
        </NavWrapperStyle>
        <ContentWrapperStyle isNavShow={isNavShow}>
          <BaseContentStyle>
            <Content />
          </BaseContentStyle>
        </ContentWrapperStyle>
      </WrapperStyle>
    </BaseLayout>
  );
};

export default Post;
