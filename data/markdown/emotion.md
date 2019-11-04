# EmotionでCSS in JS

**Emotion**とは、JavaScriptでCSSスタイルを記述するために設計されたライブラリ。  
後発ライブラリのため、**styled-component**等の良いとこ取りをしている。

必要なパッケージをインストールしましょ。

- @emotion/styled
- @emotion/core

```console
$ npm i @emotion/styled @emotion/core
```

## styled-componentを使ってみよう

**@emotion/styled**を使い、**styled-component**を使ってみましょう。

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
`;

const Heading = ({ children }) => <HeadingStyle>{children}</HeadingStyle>

export default Heading
```

CSS部分はテンプレートリテラルなので、${}内でJavaScriptが利用できます。

```javascript
// components/Heading.js
import styled from '@emotion/styled'

// フォントサイズを定数化
const fontSize = 20

// テンプレートリテラル内で定数を使用
const HeadingStyle = styled.h1`
  font-size: ${fontSize}px;
  color: red;
`;

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
`;
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
`;
```

**CSS in JS**のメリットとして、CSS上でJavaScriptが使えるという点があります。

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

たとえば、**react-slick**の**breakpoint**値にできます。

https://react-slick.neostack.com/

```console
$ npm i react-slick slick-carousel raw-loader
$ touch next.config.js
```

**raw-loader**でCSSファイルを扱えるようにします。

```javascript
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
      breakpoint: breakPoints.md,
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

const slideItems = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5']

const MySlider = () => (
  <SliderWrapperStyle>
    <Slider {...settings}>
     {slideItems.map(slideItem => {
       <div key={slideItem}>{slideItem}</div>
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
import MySlider from '../components/MySlider'

const member = ['ネズミ', '牛', 'トラ', 'うさぎ']

const Index = () => {
  const text = 'Next.js!'
  return (
    <>
      {/* MySliderコンポーネント */}
      <MySlider />
      <Heading>
        <span>{`Hello, ${text}`}</span>
      </Heading>
      <ul>
        {member.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <Link href='/batman'>
        <a>aboutページへ</a>
      </Link>
      <button onClick={() => console.log('onClick')} />
    </>
  )
}

export default Index
```