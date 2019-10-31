import React from 'react'
import { NextPage } from 'next'
import Top, { TopProps } from 'components/Templates/Top'
import getData, { DataType } from 'gateways/getData'

const topData: DataType = {
  pageData: {
    title: '',
    subtitle: ''
  },
  post: [
    {
      id: '',
      title: ''
    }
  ]
}

export const TopContext = React.createContext(topData)

const Page: NextPage<TopProps> = ({ data }) => (
  <>
    {data && (
      <TopContext.Provider value={data}>
        <Top />
      </TopContext.Provider>
    )}
  </>
)

Page.getInitialProps = async () => {
  const data = await getData()
  return { data }
}

export default Page
