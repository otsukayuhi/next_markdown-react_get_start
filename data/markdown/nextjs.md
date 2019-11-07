# Next.jsとは？

**Next.js**とは、Reactでサーバーサイドレンダリングをするためのフレームワーク。  
Vue.jsで言うところの、Nuxt.js。簡単にルーティングできて、静的サイトの書き出しもできる。

公式サイト：https://nextjs.org/

ちなみに、このドキュメントリーダー的なやつもNext.jsで作りました。（詳しくは、交流会のときに解説しようと思います）

静的サイトの書き出しならば、[Gatsby.js](https://www.gatsbyjs.org/)のほうが使いやすいかもしれませんが、Next.jsのほうがシンプルに始められるので、今回はNext.jsを使用します。

Reactとしての書き方はほぼ同じですし、メジャーなエコシステムも使用できるなので、Next.jsが使えればGatsby.jsも使えると思います。多分。

## サーバーサイドレンダリングとは？

Reactは、本来クライアントサイドで仮想DOMを生成し、それを実DOMとしてブラウザに描画します。

```html
<!-- サーバーから返されるHTML -->
<div id="app"></div>
```

```js
import React from 'react';
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

```jsx
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

## JSX

JSXを使用すると、JavaScript上でHTMLのような構文が使えます。

```jsx
// JSX
const Button = <button className="my-button">ボタン</button>
```

これは、`React.createElement()`の糖衣構文で、JSXを使わないと下記の記述になります。

```jsx
const Button = React.createElement("button", {
  className: "my-button"
}, "ボタン");
```

極論、JSXを使わずに`React.createElement()`を使ってもなんの問題ありません。

[JSXを使う理由](https://ja.reactjs.org/docs/introducing-jsx.html#why-jsx)が公式のガイドにありますので、興味のある方はどうぞ。

[オンライン Babel コンパイラ](https://babeljs.io/repl/#?presets=react&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA)を使うと、JSXがどのようなJavaScriptに変換されるのかを確認できます。

## Next.js（React）を書いてみよう

`pages/index.js`を、省略形なしの形に変更。

```jsx
import React from 'react' // Next.jsでは省略可能

// returnでJSXを返す関数をコンポーネントと呼ぶ
function Index() {
  return <h1>Hello, Next.js!</h1>
}

// ES Modules
// 本来は import されて react-dom がレンダリングするが、Next.jsでは隠蔽されている
export default Index
```

HTMLのように、JSXでも子要素を使うことができます。

```jsx
import React from 'react'

function Index() {
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

JSXは`{}`でJavaScriptを使うことができます。

```jsx
import React from 'react'

function Index() {
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

`Heading`コンポーネントを作って、JSX内で使ってみましょう。

```jsx
import React from 'react'

// 見出し用のコンポーネント
function Heading(props) => {
  // 属性の値は、オブジェクトのプロパティとして渡される
  return <h1>{props.text}</h1>
}

function Index() {
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

`Heading`コンポーネントに、子要素を渡してみます。

```jsx
import React from 'react'

// Propsはオブジェクトなので、分割代入が使える
function Heading({ children }) {
  // childrenで子要素を受け取る
  return <h1>{children}</h1>
}

function Index() {
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

`div`がいらねえときは、`React.Fragment`が便利です。

```jsx
import React from 'react'

function Heading({ children }) {
  return <h1>{children}</h1>
}

function Index() {
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

`React.Fragment`は、糖衣構文として`<></>`とも使えます。記述量が遥かに少なくてすむので、とくに理由がなければ、こちらを使用しましょう。

```jsx
import React from 'react'

function Heading({ children }) {
  return <h1>{children}</h1>
}

function Index() {
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

ファイルを分けてみましょう。

```jsx
// components/Heading.js
// {} と return を省略できる
function Heading({ children }) {
  return <h1>{children}</h1>
}

export default Heading
```

```jsx
// pages/index.js
import React from 'react'
import Heading from '../components/Heading'

function Index() {
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

`map`メソッドで要素の反復処理をしてみましょう。

```jsx
// pages/index.js
import React from 'react'
import Heading from '../components/Heading'

// 配列
const member = ['ネズミ', '牛', 'トラ', 'うさぎ']

function Index() {
  const text = 'Next.js!'
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

`onClick`でイベント発火できます。

```jsx
// pages/index.js
import React from 'react'
import Heading from '../components/Heading'

const member = ['ネズミ', '牛', 'トラ', 'うさぎ']

function Index() {
  const text = 'Next.js!'
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

      {/* onClickに関数を書く */}
      <button onClick={() => console.log('onClick')}>ボタン</button>
    </>
  )
}

export default Index
```

### Next.js独自の機能

`Link`コンポーネントでルーティングさせてみましょう。

```jsx
// pages/index.js
import React from 'react'
import Link from 'next/link' // Linkコンポーネントを追加
import Heading from '../components/Heading'

const member = ['ネズミ', '牛', 'トラ', 'うさぎ']

function Index() {
  const text = 'Next.js!'
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
      <button onClick={() => console.log('onClick')}>ボタン</button>

      {/* Linkコンポーネントでルーティングできる */}
      <Link href="/batman"><a>バットマンページへ</a></Link>
    </>
  )
}

export default Index
```

`pages/batman.js`を作成した上、**バットマンページへ**のリンクをクリックすると、再読み込みなしで見込みページ遷移できます。

```console
$ touch pages/batman.js
```

```jsx
// pages/batman.js
import React from 'react'

function Batman() {
  return <div>batman</div>
}

export default Batman
```

### `getInitialProps`で非同期データ取得

バットマンAPIを叩いて、非同期に情報を取得してみましょう。ページ読み込み時になにかしらの処理をする場合は、`getInitialProps`メソッドを使います。

`getInitialProps`は、Next.jsのライフサイクルメソッドです。ページが読み込まれたときはサーバーサイドで実行され、以降、`Link`コンポーネントによって別の`pages`コンポーネントへ移動した場合にクライアントサイドで実行されます。

Next.jsはサーバーサイドレンダリングのためのフレームワークなので、今書いているJavaScriptが**サーバーサイド（Node.js）なのか？**それとも、**クライアントサイドなのか？**を意識することが必要です。

Node.jsではfetchメソッドが使えないので、`isomorphic-unfetch`をインストールして使います。

```
$ npm i isomorphic-unfetch
```

```jsx
// pages/batman.js
import React from 'react'
import fetch from 'isomorphic-unfetch'

function Batman({ shows }) {
  return (
    <div>
      <h1>Batman TV Shows</h1>
      <ul>
        {shows.map(show => (
          <li key={show.id}>
            <div><img src={show.image.medium} /></div>
            <div>{show.name}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

Batman.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json();
  return {
    shows: data.map(entry => entry.show)
  }
}

export default Batman
```

より掘り下げたい場合は、[公式ドキュメント](https://nextjs.org/docs)を確認してください。

また、GitHubの[example](https://github.com/zeit/next.js/tree/canary/examples)に豊富なサンプルがあるので、とても参考になります。