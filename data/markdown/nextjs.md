# Next.jsを体験しよう

## Next.jsとは？

**Next.js**とは、Reactでサーバーサイドレンダリングをするためのフレームワークです。Vue.jsで言うところの、Nuxt.js。簡単にルーティングできて、静的サイトの書き出しもできます。

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

しかし、サーバーサイド上で事前にDOMを生成すれば、クライアントからみれば静的なHTMLがレスポンスとして返ってくるので、この問題が回避できます。

サーバーサイドのプログラミングでは、**PHP**や**Ruby**、**Java**等の言語の習得が必要ですが、Next.jsを使えば、**JavaScript**で処理を書くことができます。

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
function Heading(props) {
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

```console
$ mkdir components 
$ touch components/Heading.js
```

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

### useStateで関数コンポーネントに状態をもたせる

React 16.8で、[hooks](https://ja.reactjs.org/docs/hooks-intro.html)という新機能が追加されました。Reactで`state`などの機能を使う場合、これまではクラスで書かないといけませんでしたが、hooksの登場で関数コンポーネントでも副作用のある機能を使うことができるようになりました。

今回は、関数コンポーネントに状態をもたせることができる、`useState`を使ってみましょう。

```jsx
// pages/index.js
// `useState`をインポート
import React, { useState } from 'react'
import Heading from '../components/Heading'

const member = ['ネズミ', '牛', 'トラ', 'うさぎ']

function Index() {
  const text = 'Next.js!'
  
  /**
 * const [変数, 変数の値を変える関数] = useState(初期値)
 * 以下では、`value`変数の初期値に`No, Click.`の文字列を代入しています。
 * setValue('Yes, Click!!')を実行すると、
 * valueの値を`No, Click.`から`Yes, Click!!`に変えることができます。
 */
  const [value, setValue] = useState('No, Click.');
  const onClickEvent = () => setValue('Yes, Click!!');

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

      {/* クリックすると、`No, Click.`が`Yes, Click!!`に変わる */}
      <button onClick={onClickEvent}>{value}</button>
    </>
  )
}

export default Index
```

### Next.js独自の機能

`Link`コンポーネントでルーティングさせてみましょう。

```jsx
// pages/index.js
import React, { useState } from 'react'
import Link from 'next/link' // Linkコンポーネントを追加
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
      <ul>
        {member.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <button onClick={() => console.log('onClick')}>ボタン</button>
      <button onClick={onClickEvent}>{value}</button>

      {/* Linkコンポーネントでルーティングできる */}
      <Link href="/batman"><a>バットマンページへ</a></Link>
    </>
  )
}

export default Index
```

`pages/batman.js`を作成した上、**バットマンページへ**のリンクをクリックすると、再読み込みなしでページ遷移できます。つまり、SPAです。

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

`getInitialProps`は、Next.jsのライフサイクルメソッドです。ページが読み込まれたときはサーバーサイドで実行され、以降、`Link`コンポーネントによって別の`pages`コンポーネントへ移動した場合にクライアントサイドで実行されます。

以下の実装をして、`http://localhost:3000`から`http://localhost:3000/batman`に遷移したときと、`http://localhost:3000/batman`をリロードしたときのコンソールの表示を確認してみましょう。

```jsx
// pages/batman.js
import React from 'react'

function Batman({ text }) {
  return <div>{text}</div>
}

Batman.getInitialProps = async () => {
  const text = 'I am Batman !!'
  console.log(text)
  return { text } // returnしたオブジェクトをコンポーネントのPropsとして受け取れます
}

export default Batman

```

遷移したときはブラウザ側のコンソール、リロードしたときは開発側のコンソールに、それぞれログが出たかと思います。

Next.jsはサーバーサイドレンダリングのためのフレームワークなので、今書いているJavaScriptが**サーバーサイド（Node.js）なのか？**それとも、**クライアントサイドなのか？**を意識することが必要です。

#### 非同期でデータ取得

バットマンAPIを叩いて、非同期に情報を取得してみましょう。ページ読み込み時になにかしらの処理をする場合は、`getInitialProps`メソッドを使います。

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

## サーバーサイドレンダリングの使い所

> たとえば、動的なコンテンツで`<title>`要素や`<meta>`要素をクライアントサイドで生成すると、TwitterやFacebook等のSNSでシェアしたときには反映されません。
> 
> しかし、サーバーサイド上で事前にDOMを生成すれば、クライアントからみれば静的なHTMLがレスポンスとして返ってくるので、この問題が回避できます。

クソアプリを作ったので、これを実際に試してみましょう。

```console
$ touch pages/nameApp.js
$ touch pages/yourName.js
```

```jsx
// nameApp.js
import React, { useState } from 'react'
import { useRouter } from 'next/router'

function NameApp() {
  const [name, setValue] = useState('')

  /**
   * Next.jsのルーターオブジェクト
   * https://nextjs.org/docs#userouter
   */
  const router = useRouter()

  const onClickEvent = () => {
    // yourname?name=【name】に遷移する
    router.push({
      pathname: '/yourName',
      query: { name },
    })
  }

  const onChangeEvent = event => setValue(event.target.value)

  return (
    <>
      <div>君の名は。。。</div>
      <input value={name} onChange={onChangeEvent} />
      <button onClick={onClickEvent}>click!!</button>
    </>
  )
}

export default NameApp
```

`nameApp.js`のやっていることは、ReactやNext.jsを使わない方法で書くとこんな感じです。

```html
<form action="yourName/" method="GET">
  <div>君の名は。。。</div>
  <input name="name"/>
  <button type="submit">click!!</button>
</form>
```

続いて、遷移先の`yourName.js`を実装します。

```jsx
// yourName
import React from 'react'
import Head from 'next/head'

function YourName({ query }) {
  const { name } = query
  return (
    <>
      {/* Headコンポーネントで`title`や`meta`が設定できる */}
      <Head>
        <title>{name} | YourName</title>
        <meta name="description" content={`君の名は、${name}ですね。`} />
      </Head>
      <div>
        君の名は、<strong>{name}</strong>ですね。
      </div>
    </>
  )
}

YourName.getInitialProps = ({ query }) => {
  return { query }
}

export default YourName
```

フォームに名前を入力して隣のボタンをクリックすると、入力した名前を表示することができる画期的なアプリです。

`command + option + u`でソースを確認してみましょう。サーバーから取得したHTMLの段階で、`title`や`meta`が設定されていることがわかります。

イメージを掴んでいただくために、試しに**PHP**で実装してみました。（PHPが全然わからないので細かいところはご勘弁を。。。(´；ω；｀)）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>YourName</title>
</head>
<body>
  <form action="yourName/" method="GET">
    <div>君の名は。。。</div>
    <input name="name"/>
    <button type="submit">click!!</button>
  </form>
</body>
</html>
```

上のHTMLで`action.php?name=ほげぼげ`みたいな感じになるので、PHPでパラメーターを受け取りHTMLとしてクライアントにレスポンスします。

```html
<?php $name = htmlspecialchars($_GET['name']); ?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title><?php echo $name; ?> | YourName</title>
  <meta name="description" content="君の名は、<?php echo $name; ?>ですね。" />
</head>
<body>
  <div>君の名は、<?php echo $name; ?>ですね。</div>
</body>
</html>
```

より掘り下げたい場合は、[公式ドキュメント](https://nextjs.org/docs)を確認してください。

また、GitHubの[example](https://github.com/zeit/next.js/tree/canary/examples)に豊富なサンプルがあるので、とても参考になります。