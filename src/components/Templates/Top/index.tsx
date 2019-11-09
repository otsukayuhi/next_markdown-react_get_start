import React, { useContext } from 'react';
import Link from 'next/link';
import BaseLayout from 'components/Layouts/BaseLayout';
import { TopContext } from 'pages/index';
import { DataType } from 'gateways/getData';
import {
  WrapperStyle,
  HeadingWrapperStyle,
  HeadingStyle,
  HeadingInnerStyle,
  LeadStyle,
  ListStyle,
  ItemStyle
} from './style';

export type TopProps = {
  data: DataType | null;
};

const Top: React.FC = () => {
  const { pageData, post } = useContext(TopContext);

  const items = !post
    ? null
    : post.map((item, index) => {
        const { title, id } = item;

        return (
          <ItemStyle key={id}>
            <Link href="/docs/[id]" as={`/docs/${id}`}>
              <a>{`${index + 1}. ${title}`}</a>
            </Link>
          </ItemStyle>
        );
      });

  return (
    <BaseLayout>
      <WrapperStyle>
        <HeadingWrapperStyle>
          {pageData && (
            <HeadingStyle>
              {pageData.title}
              {pageData.subtitle && (
                <HeadingInnerStyle>{pageData.subtitle}</HeadingInnerStyle>
              )}
            </HeadingStyle>
          )}
        </HeadingWrapperStyle>
        <LeadStyle>本日のLINE UP</LeadStyle>
        {items && <ListStyle>{items}</ListStyle>}
      </WrapperStyle>
    </BaseLayout>
  );
};

export default Top;
