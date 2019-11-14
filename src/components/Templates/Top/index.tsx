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
  ItemStyle,
} from './style';

export type TopProps = {
  data: DataType | null;
};

const Top: React.FC = () => {
  const { pageData, post } = useContext(TopContext);

  const items = post?.map(({ title, id }, index) => (
    <ItemStyle key={id}>
      <Link href="/docs/[id]" as={`/docs/${id}`} prefetch>
        <a>{`${index + 1}. ${title}`}</a>
      </Link>
    </ItemStyle>
  ));

  return (
    <BaseLayout>
      <WrapperStyle>
        <HeadingWrapperStyle>
          <HeadingStyle>
            {pageData?.title}
            <HeadingInnerStyle>{pageData?.subtitle}</HeadingInnerStyle>
          </HeadingStyle>
        </HeadingWrapperStyle>
        <LeadStyle>本日のLINE UP</LeadStyle>
        <ListStyle>{items}</ListStyle>
      </WrapperStyle>
    </BaseLayout>
  );
};

export default Top;
