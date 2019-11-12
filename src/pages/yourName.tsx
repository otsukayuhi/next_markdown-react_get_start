// yourName
import React from 'react';
import Head from 'next/head';

function YourName({ query }) {
  const { value: name } = query;
  return (
    <>
      {/* Headコンポーネントで`title`や`meta`が設定できる */}
      <Head>
        <title>{name} | Name Maker</title>
        <meta name="description" content={`君の名は、${name}ですね。`} />
      </Head>
      <div>
        君の名は、<strong>{name}</strong>ですね。
      </div>
    </>
  );
}

YourName.getInitialProps = ({ query }) => {
  return { query };
};

export default YourName;
