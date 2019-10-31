import React from 'react'
import { NextPage } from 'next'
import Top from 'components/Templates/Top'
import getData, { DataType } from 'gateways/getData'

export type TopProps = {
  data: DataType | null
}

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

const Page: NextPage<TopProps> = ({ data }) => {
  return (
    <>
      {data && (
        <TopContext.Provider value={data}>
          <Top />
        </TopContext.Provider>
      )}
    </>
  )
}

Page.getInitialProps = async () => {
  const data = await getData()
  return { data }
}

export default Page
