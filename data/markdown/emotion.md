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
$ npm i react-slick
```

```javascript
import React from 'react'
import Slider from "react-slick"
import breakPoints from '../const/breakPoints'

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: breakPoints.md,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    }
  ]
};

const MySlider = () => (
  <Slider {...settings}>
    <div>slide1</div>
    <div>slide2</div>
    <div>slide3</div>
  </Slider>
)

export default MySlider
```