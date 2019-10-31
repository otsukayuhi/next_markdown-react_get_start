import React from 'react'
import { NextPage } from 'next'
import Top, { TopProps } from 'components/Templates/Top'
import getData, { DataType } from 'gateways/getData'

export const TopContext = React.createContext<DataType>(null as any)

const Page: NextPage<TopProps> = ({ data }) => {
  const topData = data || {
    pageData: {
      title: 'トップページ',
      subtitle: null
    },
    post: []
  }
  return (
    <TopContext.Provider value={topData}>
      <Top />
    </TopContext.Provider>
  )
}

Page.getInitialProps = async () => {
  const data = await getData()
  return { data }
}

export default Page
