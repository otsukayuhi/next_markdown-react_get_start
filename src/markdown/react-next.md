# React / Next.jsとは？

## Reactとは？

Reactとは、Facebookが作ったユーザーインターフェイスを構築するためのJavaScriptライブラリ。  
宣言的なViewをコンポーネントベースで作ることができる。

公式サイト：https://ja.reactjs.org/

## Next.jsとは？

Next.jsとは、Reactでサーバーサイドレンダリングをするためのフレームワーク。  
Vue.jsで言うところの、Nuxt.js。簡単にルーティングできて、静的サイトの書き出しもできる。

公式サイト：https://nextjs.org/

# Next.jsでWebサイトをつくってみよう！

## Next.jsの使い方

必要なパッケージをインストール

- next
- react
- react-dom

```console
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
import React from 'react'
import Heading from '../components/Heading'

// 配列
const member = ['ネズミ', '牛', 'トラ', 'うさぎ']

const Index = () => {
  const text = 'Next.js!'
  return (
    <>
      <Heading>
        <span>{`Hello, ${text}`}</span>
      </Heading>
      <ul>
        {/*
          member配列の要素の数だけ<li>を作成
          keyにindexを渡している（ホントはindex以外を渡したい）
        */}
        {member.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </>
  )
}

export default Index
```

`Link`でルーティング
onClickでイベント発火
(`getInitialProps`でデータ取得)
