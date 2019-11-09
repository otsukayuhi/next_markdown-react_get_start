import React from 'react';
import { NextPage } from 'next';
import Post, { PostProps } from 'components/Templates/docs/Post';
import NotFound from 'components/Organisms/NotFound';
import getData from 'gateways/getData';
import getContent from 'gateways/getContent';

export const DocsContext = React.createContext<PostProps>(null as any);

const Page: NextPage<PostProps> = props => (
  <DocsContext.Provider value={props}>
    {props.content ? <Post /> : <NotFound />}
  </DocsContext.Provider>
);

Page.getInitialProps = async ({ query: { id } }) => {
  const currentId = !Array.isArray(id) ? id : id[0];
  const content = await getContent(currentId);
  const data = await getData({ isPost: true });
  return { currentId, content, data };
};

export default Page;
