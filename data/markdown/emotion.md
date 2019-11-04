# EmotionでCSS in JS

**Emotion**とは、JavaScriptでCSSスタイルを記述するために設計されたライブラリです。後発ライブラリのため、**styled-component**等の良いとこ取りをしています。

必要なパッケージをインストールしましょ。

- @emotion/styled

```console
$ npm i @emotion/styled
```

## Emotionを使ってみよう

**@emotion/styled**を使い、styled-componentライクなコンポーネントを作ってみます。

```javascript
// components/Heading.js
// @emotion/styledをインポート
import styled from '@emotion/styled'

// styled.{要素}`{css}` の形で使用します。
// 定数に代入することで、コンポーネントとして利用できます。
// ブラウザ上ではユニークな文字列のCSSクラスが付与されるので、CSSはスコープになります。
const HeadingStyle = styled.h1`
  font-size: 20px;
  color: red;
`

const Heading = ({ children }) => <HeadingStyle>{children}</HeadingStyle>

export default Heading
```

CSS部分はテンプレートリテラルなので、`${}`内でJavaScriptが利用できます。

```javascript
// components/Heading.js
import styled from '@emotion/styled'

// フォントサイズを定数化
const fontSize = 20

// テンプレートリテラル内で定数を使用
const HeadingStyle = styled.h1`
  font-size: ${fontSize}px;
  color: red;
`

const Heading = ({ children }) => <HeadingStyle>{children}</HeadingStyle>

export default Heading
```

コンポーネント側からProps経由で値を渡すことができます。別ファイルにしてデータを渡してみましょう。

```javascript
// components/HeadingStyle.js
import styled from '@emotion/styled'

// ES Modules
// 関数の引数としてデータを受け取ります
export const HeadingStyle = styled.h1`
  font-size: ${props => props.fontSize}px;
  color: red;
`
```

```javascript
// components/Heading.js
import { HeadingStyle } from './HeadingStyle'

const fontSize = 20

const Heading = ({ children }) => (
  <HeadingStyle fontSize={fontSize} >{children}</HeadingStyle>
)

export default Heading
```

**SCSS**のようにネストが使えます。

```javascript
// components/HeadingStyle.js
import styled from '@emotion/styled'

// SCSSのように&が使えます。
export const HeadingStyle = styled.h1`
  font-size: ${props => props.fontSize}px;
  color: red;
  
  &:hover {
    color: green;
  }
`
```

## CSS in JSのメリット

たとえば、ブレークポイントをJavaScriptで管理すれば、Carouselのライブラリ等と共通の値を使うことができます。

```javascript
// const/breakPoints.js
const breakPoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

export default breakPoints
```

```javascript
// components/HeadingStyle.js
import styled from '@emotion/styled'
import breakPoints from '../const/breakPoints'

export const HeadingStyle = styled.h1`
  font-size: ${props => props.fontSize}px;
  color: red;
  
  @media (min-width: ${breakPoints.md}px) {
    color: green;
  }
`;
```

**react-slick**を使ってみましょ。

https://react-slick.neostack.com/

```console
$ npm i react-slick slick-carousel raw-loader
$ touch next.config.js
```

**raw-loader**でCSSファイルを扱えるようにします。

```javascript
// next.config.js
module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.css$/,
      use: 'raw-loader'
    })
  }
}
```

スライダーコンポーネントを作り、トップページで使ってみましょう。

```javascript
// components/MySlider.js
import React from 'react'
import styled from '@emotion/styled'
import Slider from 'react-slick'
import slickCss from 'slick-carousel/slick/slick.css'
import slickThemeCss from 'slick-carousel/slick/slick-theme.css'
import breakPoints from '../const/breakPoints'

const settings = {
  infinite: false,
  slidesToShow: 2,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: breakPoints.md, // const/breakPoints.jsの値が使える
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
};

const SliderWrapperStyle = styled.div`
  ${slickCss}
  ${slickThemeCss}
`

const MySlider = ({ member }) => (
  <SliderWrapperStyle>
    <Slider {...settings}>
     {member.map((animal, index) => {
       <div key={index}>{animal}</div>
     })}
    </Slider>
  </SliderWrapperStyle>
)

export default MySlider
```

```javascript
// pages/index.js
import React from 'react'
import Link from 'next/link'
import Heading from '../components/Heading'
import MySlider from '../components/MySlider' // MySliderをインポート

const member = ['ネズミ', '牛', 'トラ', 'うさぎ']

const Index = () => {
  const text = 'Next.js!'
  return (
    <>
      <Heading>
        <span>{`Hello, ${text}`}</span>
      </Heading>
      <MySlider member={member}></MySlider>
      <button onClick={() => console.log('onClick')}>ボタン</button>
      <Link href="/batman"><a>バットマンページへ</a></Link>
    </>
  )
}

export default Index
```

他にも**Emotion**でいろいろなことができるので、ぜひ掘り下げてみてください。

公式ガイド：https://emotion.sh/docs/introduction