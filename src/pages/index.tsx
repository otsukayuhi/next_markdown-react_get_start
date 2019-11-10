import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Top, { TopProps } from 'components/Templates/Top';
import getData, { DataType } from 'gateways/getData';

export const TopContext = React.createContext<DataType>(null as any);

const Page: NextPage<TopProps> = ({ data }) => {
  const topData: DataType = data || {
    pageData: {
      title: 'トップページ',
      subtitle: null,
    },
  };

  return (
    <TopContext.Provider value={topData}>
      <Head>
        {topData && topData.pageData && (
          <>
            <title>
              {`${topData.pageData.title} ${topData.pageData.subtitle}`}
            </title>
            <meta
              name="description"
              content={`${topData.pageData.title} ${topData.pageData.subtitle}`}
            />
          </>
        )}
      </Head>
      <Top />
    </TopContext.Provider>
  );
};

Page.getInitialProps = async () => {
  const data = await getData({ pageName: 'top', isPost: true });
  return { data };
};

export default Page;
