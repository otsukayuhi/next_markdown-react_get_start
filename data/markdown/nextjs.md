# Next.jsでWebサイトをつくってみよう！

## Next.jsとは？

**Next.js**とは、Reactでサーバーサイドレンダリングをするためのフレームワーク。  
Vue.jsで言うところの、Nuxt.js。簡単にルーティングできて、静的サイトの書き出しもできる。

公式サイト：https://nextjs.org/

ちなみに、このドキュメントリーダー的なやつもNext.jsで作りました。（詳しくは、交流会のときに解説しようと思います）

静的サイトの書き出しならば、**[Gatsby.js](https://www.gatsbyjs.org/)**のほうが使いやすいかもしれませんが、Next.jsのほうがシンプルに始められるので、今回はNext.jsを使用します。

Reactとしての書き方はほぼ同じですし、メジャーなエコシステムも使用できるなので、Next.jsが使えればGatsby.jsも使えると思います。多分。

### サーバーサイドレンダリングとは？

Reactは、本来クライアントサイドで仮想DOMを生成し、それを実DOMとしてブラウザに描画します。

```html
<!-- サーバーから返されるHTML -->
<div id="app"></div>
```

```js
import React from "react";
import ReactDOM from "react-dom";

// クライアントサイドでDOMを書き換える
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

サーバーサイドレンダリングは、サーバー上でReactを実行し、生成したDOMをクライアントへ渡します。

たとえば、動的なコンテンツで`<title>`要素や`<meta>`要素をクライアントサイドで生成すると、TwitterやFacebook等のSNSでシェアしたときには反映されません。

しかし、サーバーサイド上で事前にDOMを生成すれば、クライアントからみれば静的なHTMLがレスポンスとして返ってくるので、この問題か回避できます。

サーバーサイドのプログラミングでは、**PHP**や**Ruby**、**Java**等の言語の習得が必要ですが、Next.jsを使えば、JavaScriptで処理を書くことができます。

## Next.jsの使い方

必要なパッケージをインストール

- next
- react
- react-dom

```console
$ mkdir nextjs-sample
$ cd nextjs-sample
$ npm init -y
$ npm i next react react-dom
```

`package.json`に`scripts`を追記。

```json
{
  "scripts": {
    "dev": "next"
  }
}
```

`./pages`ディレクトリに`index.js`を追加。

```console
$ mkdir pages
$ touch pages/index.js
```

```javascript
// pages/index.js
export default () => <h1>Hello, Next.js!</h1>
```

ローカルサーバーを起動。

```console
$ npm run dev
```

`http://localhost:3000`にアクセスして、`Hello, Next.js!`が表示されていれば、OK！

## ディレクトリ構成

- `./pages` ルーティングの対象
- `./static` 静的ファイルの置き場所
  - 画像ファイルとか

ディレクトリのルールが決まっているのは、これくらい。

また、**Next.js 9.1**から`src`配下でも利用できるようになりました。

- `src/pages` ルーティングの対象
- `src/static` 静的ファイルの置き場所

これもOK

## JSXの書き方

`pages/index.js`を、省略形なしの形に変更。

```javascript
import React from 'react' // Next.jsでは省略可能

// returnでJSXを返す関数をコンポーネントと呼ぶ
const Index = () => {
  return <h1>Hello, Next.js!</h1>
}

// ES Modules
// 本来は import されて react-dom がレンダリングするが、Next.jsでは隠蔽されている
export default Index
```

JSXで子要素を使う。

```javascript
import React from 'react'

const Index = () => {
  // ()で括り、;の自動挿入に対応
  // returnで返すJSXは必ず1つの要素
  return (
    <div>
      <h1>Hello, Next.js!</h1>
    </div>
  )
}

export default Index
```

`JSX`内は`{}`でJavaScriptを使う。

```javascript
import React from 'react'

const Index = () => {
  const text = 'Next.js!'
  return (
    <div>
      {/* コメントアウト */}
      <h1>{`Hello, ${text}`}</h1>
    </div>
  )
}

export default Index
```

コンポーネントをJSX内で使う。

```javascript
import React from 'react'

// 見出し用のコンポーネント
const Heading = props => {
  // 属性の値は、オブジェクトのプロパティとして渡される
  return <h1>{props.text}</h1>
}

const Index = () => {
  const text = 'Next.js!'
  return (
    <div>
      {
        /**
        * コンポーネントの属性でテキストを渡す
        * これをProps（プロップス）と呼ぶ
        */
       }
      <Heading text={`Hello, ${text}`} />
    </div>
  )
}

export default Index
```

子要素を渡す。

```javascript
import React from 'react'

// Propsはオブジェクトなので、分割代入が使える
const Heading = ({ children }) => {
  // childrenで子要素を受け取る
  return <h1>{children}</h1>
}

const Index = () => {
  const text = 'Next.js!'

  return (
    <div>
      {/* コンポーネントの子要素でspan要素を渡す */}
      <Heading>
        <span>{`Hello, ${text}`}</span>
      </Heading>
    </div>
  )
}

export default Index
```

`div`がいらねえとき。

```javascript
import React from 'react'

const Heading = ({ children }) => {
  return <h1>{children}</h1>
}

const Index = () => {
  const text = 'Next.js!'
  // React.Fragmentを使うとその要素はレンダリングされない
  return (
    <React.Fragment>
      <Heading>
        <span>{`Hello, ${text}`}</span>
      </Heading>
      <p>divでラップしたないねん</p>
    </React.Fragment>
  )
}

export default Index
```

`div`がいらねえとき2。

```javascript
import React from 'react'

const Heading = ({ children }) => {
  return <h1>{children}</h1>
}

const Index = () => {
  const text = 'Next.js!'
  // <React.Fragment></React.Fragment>は<></>とも書ける
  return (
    <>
      <Heading>
        <span>{`Hello, ${text}`}</span>
      </Heading>
      <p>divでラップしたないねん</p>
    </>
  )
}

export default Index
```

ファイルを分けよう！

```javascript
// components/Heading.js
// {} と return を省略できる
const Heading = ({ children }) => <h1>{children}</h1>

export default Heading
```

```javascript
// pages/index.js
import React from 'react'
import Heading from '../components/Heading'

const Index = () => {
  const text = 'Next.js!'
  return (
    <>
      <Heading>
        <span>{`Hello, ${text}`}</span>
      </Heading>
      <p>divでラップしたないねん</p>
    </>
  )
}

export default Index
```

mapで要素の反復処理。

```javascript
// pages/index.js
import React from "react"
import Heading from "../components/Heading"

// 配列
const member = ["ネズミ", "牛", "トラ", "うさぎ"]

const Index = () => {
  const text = "Next.js!"
  return (
    <>
      <Heading>
        <span>{`Hello, ${text}`}</span>
      </Heading>
      <ul>
        {member.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </>
  )
}

export default Index
```

`Link`コンポーネントでルーティング。

```javascript
// pages/index.js
import React from "react"
import Link from 'next/link' // Linkコンポーネントを追加
import Heading from "../components/Heading"

const member = ["ネズミ", "牛", "トラ", "うさぎ"]

const Index = () => {
  const text = "Next.js!"
  return (
    <>
      <Heading>
        <span>{`Hello, ${text}`}</span>
      </Heading>
      <ul>
        {member.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      
      {/* Linkコンポーネントでルーティングできる */}
      <Link href="/batman"><a>バットマンページへ</a></Link>
    </>
  )
}

export default Index
```

`pages/batman.js`を作成した上、**バットマンページへ**のリンクをクリックすると、再読み込みなしで見込みページ遷移できます。

```javascript
// pages/batman.js
import React from 'react'

const Batman = () => <div>batman</div>

export default Batman
```

onClickでイベント発火。

```javascript
// pages/index.js
import React from "react"
import Link from 'next/link'
import Heading from "../components/Heading"

const member = ["ネズミ", "牛", "トラ", "うさぎ"]

const Index = () => {
  const text = "Next.js!"
  return (
    <>
      <Heading>
        <span>{`Hello, ${text}`}</span>
      </Heading>
      <ul>
        {member.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <Link href="/batman">
        <a>aboutページへ</a>
      </Link>

      {/* onClickでイベントハンドラを登録できる */}
      <button onClick={() => console.log('onClick')} />
    </>
  )
}

export default Index
```

`getInitialProps`で非同期データ取得。

バットマンAPIを叩いて、非同期に情報を取得してみましょう。

Node.jsで使える`isomorphic-unfetch`を使ってみます。

```
$ npm i isomorphic-unfetch
```

```javascript
// pages/batman.js
import React from 'react'
import fetch from 'isomorphic-unfetch'

const Batman = ({ shows }) => {
  return (
    <>
      <h1>Batman TV Shows</h1>
      <ul>
        {shows.map(show => (
          <li key={show.id}>
            <div><img src={show.image.medium}></div>
            <div>{show.name}</div>
          </li>
        ))}
      </ul>
    </>
  )
}

Batman.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()
  
  return {
    shows: data.map(entry => entry.show)
  }
}

export default Batman
```

より掘り下げたい場合は、[公式ドキュメント](https://nextjs.org/docs)を確認してください。

また、GitHubの**[example](https://github.com/zeit/next.js/tree/canary/examples)**に豊富なサンプルがあるので、とても参考になります。