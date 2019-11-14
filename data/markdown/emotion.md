# EmotionでCSS in JS

**Emotion**とは、JavaScriptでCSSスタイルを記述するために設計されたライブラリです。後発ライブラリのため、**styled-component**等の良いとこ取りをしています。

必要なパッケージをインストールしましょ。

- @emotion/styled
- @emotion/core

```console
$ npm i @emotion/styled @emotion/core
```

## Emotionを使ってみよう

**@emotion/styled**を使い、styled-componentライクなコンポーネントを作ってみます。

```jsx
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

function Heading({ children }) {
  return <HeadingStyle>{children}</HeadingStyle>
}

export default Heading
```

CSS部分はテンプレートリテラルなので、`${}`内でJavaScriptが利用できます。

```jsx
// components/Heading.js
import styled from '@emotion/styled'

// フォントサイズを定数化
const fontSize = 20

// テンプレートリテラル内で定数を使用
const HeadingStyle = styled.h1`
  font-size: ${fontSize}px;
  color: red;
`

function Heading({ children }) {
  return <HeadingStyle>{children}</HeadingStyle>
}

export default Heading
```

コンポーネント側からProps経由で値を渡すことができます。別ファイルにしてデータを渡してみましょう。

```console
$ touch components/HeadingStyle.js
```

```jsx
// components/HeadingStyle.js
import styled from '@emotion/styled'

// ES Modules
// 関数の引数としてデータを受け取ります
export const HeadingStyle = styled.h1`
  font-size: ${props => props.fontSize}px;
  color: red;
`
```

```jsx
// components/Heading.js
import { HeadingStyle } from './HeadingStyle'

const fontSize = 20

function Heading({ children }) {
  return <HeadingStyle fontSize={fontSize} >{children}</HeadingStyle>
}

export default Heading
```

**SCSS**のようにネストが使えます。

```js
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

```console
$ mkdir const
$ touch const/breakPoints.js
```

```js
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

```js
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

`next.config.js`で、Next.jsが隠蔽しているwebpackの設定にアクセスできます。**raw-loader**を追加して、CSSファイルを扱えるようにします。

```js
// next.config.js
module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.css$/,
      use: "raw-loader"
    });
    return config
  }
}

```

スライダーコンポーネントを作り、トップページで使ってみましょう。

```console
$ touch components/MySlider.js
```

```jsx
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

function MySlider({ member }) {
  return (
    <SliderWrapperStyle>
      <Slider {...settings}>
       {member.map((animal, index) => (
         <div key={index}>{animal}</div>
       ))}
      </Slider>
    </SliderWrapperStyle>
  )
}

export default MySlider
```

```jsx
// pages/index.js
import React, { useState } from 'react'
import Link from 'next/link'
import MySlider from "../components/MySlider";
import Heading from '../components/Heading'

const member = ['ネズミ', '牛', 'トラ', 'うさぎ']

function Index() {
  const text = 'Next.js!'
  const [value, setValue] = useState('No, Click.');
  const onClickEvent = () => setValue('Yes, Click!!');
  return (
    <>
      <Heading>
        <span>{`Hello, ${text}`}</span>
      </Heading>
      <button onClick={() => console.log("onClick")}>ボタン</button>
      <button onClick={onClickEvent}>{value}</button>
      <Link href="/batman">
        <a>バットマンページへ</a>
      </Link>

      {/* member配列をPropsで渡す */}
      <MySlider member={member} />
    </>
  );
}

export default Index
```

他にも**Emotion**でいろいろなことができるので、ぜひ掘り下げてみてください。

公式ガイド：https://emotion.sh/docs/introduction