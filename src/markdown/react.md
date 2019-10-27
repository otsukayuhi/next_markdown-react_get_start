# React勉強会 #1 - ゆるふわ超入門編 -

## 事前準備と基礎知識

- `Node.js`がインストールされている
  - [anyenv](https://github.com/anyenv/anyenv)からの`nodenv` or [nodenv](https://github.com/nodenv/nodenv)
  - [Docker](https://github.com/otsukayuhi/docker_nodejs)で仮想化（大塚作）
- ES2015+の知識
  - 定数と変数
  - テンプレートリテラル
  - 分割代入
  - アロー関数
  - map
  - スプレッド構文
  - ES Modules

### 定数と変数
- 定数 `const`
  - ブロックスコープの再代入不可な定数

```js
{
  const text = 'テキスト';
  console.log(text); // -> テキスト

  text = '違うテキスト'; // -> Error: "text" is read-only
}

console.log(text); // -> ReferenceError: text is not defined
```

- 変数 `let`
  - ブロックスコープの再代入可能な変数

```js
{
  let num = 0;
  console.log(num); // -> 0

  num = 1;
  console.log(num); // -> 1
}

console.log(num); // ReferenceError: num is not defined
```

- 変数 `var`
  - ブロックスコープではない変数
  - `const`と`let`を使っていきましょう 

```js
{
  var text = 'テキスト';
}

console.log(text); // -> テキスト
```

### テンプレートリテラル

ES5の書き方

```js
const age = '11歳';
console.log('私の年齢は' + age + 'です！');
// -> 私の年齢は11歳です！
```

テンプレートリテラル

```js
const age = '11歳';
console.log(`私の年齢は${age}です！`);
// -> 私の年齢は11歳です！
```

### 分割代入

配列

```js
const member = ['ネズミ', '牛', 'トラ', 'うさぎ'];
const [a, b, c, d] = member;

console.log(a); // -> ネズミ
console.log(c); // -> トラ
```

オブジェクト

```js
const person = {
  name: '大塚',
  age: 3
};

const {name, age} = person;

console.log(name); // -> 大塚
console.log(age); // -> 3
```

### アロー関数

関数宣言

```js
function foo(a, b) {
  return a + b;
};

console.log(foo(1, 2)); // -> 3
```

アロー関数

```js
const bar = (a, b) => {
  return a + b;
};

console.log(bar(1, 2)); // -> 3
```

アロー関数の省略

```js
// 引数が1つの場合、()を省略できる
// 返り値のみの場合、{}とreturnを省略できる
const text = age => `私の年齢は${age}です！`;

console.log(text('11歳')); // -> 私の年齢は11歳です！
```

引数の分割代入

```js
// オブジェクトを引数に取る場合、分割代入の記法が使える
const text = ({name, age}) => `私の名前は${name}、年齢は${age}歳です！`;

const person = {
  name: '大塚',
  age: 3
};

console.log(text(person)); // -> 私の名前は大塚、年齢は3歳です！
```

### map

第一引数のcallback関数を、配列の順番通りに各要素に対して1度ずつ呼び出し、その結果から新しい配列を生成する。

```js
const member = ['ネズミ', '牛', 'トラ', 'うさぎ'];

const greeting = member.map((name) => {
  // nameには'ネズミ'や'牛'が入っている
  return `${name}です！`;
});

console.log(greeting);
// -> ['ネズミです！', '牛です！', 'トラです！', 'うさぎです！']
```

### スプレッド構文

配列

```js
const newMember = ['黒猫','三毛猫','茶トラ猫'];
const member = ['ネズミ', '牛', 'トラ', ...newMember];

console.log(member);
// -> ['ネズミ', '牛', 'トラ', '黒猫','三毛猫','茶トラ猫']
```

オブジェクト

```js
const addProperty = {
  country: 'Japan',
  hobby: 'music'
}

const person = {
  name: '大塚',
  age: 3,
  ...addProperty
};

console.log(person);
// -> {name: '大塚', age: 3, country: 'Japan', hobby: 'music'}
```

関数の可変長引数

```js
const greeting = (...member) => member.map(name => `私は${name}です！`);

console.log(greeting('ネズミ', '牛', 'トラ', 'うさぎ'));
// -> ['私はネズミです！', '私は牛です！', '私はトラです！', '私はうさぎです！']
```

### ES Modules

`export default` でデータを、グローバルオブジェクトに追加することなく、他のJavaScriptファイルへ出力できます。  

```js
// foo.js
export default 'テキスト';
```

```js
// index.js
import foo from "./foo";

console.log(foo); // テキスト
```

これでもOK。

```js
// foo.js
const text = 'テキスト';

export default text;
```

```js
// index.js
// textじゃなくてもOK
import foo from "./foo";

console.log(foo); // テキスト
```

複数`export`する場合。

```js
// foo.js
// 数値
export const num = 1;

// 配列
export const member = ['ネズミ', '牛'];

// オブジェクト
export const person = {
  name: '大塚',
  age: 3
};

// 関数
export const foo = (a, b) => a + b;
```

```js
// index.js
import { num, member, person, foo } from "./foo";

console.log(num); // 1
console.log(member); // ['ネズミ', '牛']
console.log(person); // { name: '大塚', age: 3 }
console.log(foo(1, 2)); // 3
```

`* as moduleName`で、まとめることもできる。

```js
// index.js
import * as fooModule from "./foo";

// fooModuleにオブジェクト形式で格納されている
const { num, member, person, foo } = fooModule;

console.log(num); // 1
console.log(member); // ['ネズミ', '牛']
console.log(person); // { name: '大塚', age: 3 }
console.log(foo(1, 2)); // 3
```

```js
// index.js
// num を number に変えている
import { num as number } from "./foo";

console.log(number); // 1
```

`export default`と`export`は併用できる。

```js
// foo.js
// 数値
export const num = 1;

// 配列
export const member = ['ネズミ', '牛'];

// オブジェクト
export const person = {
  name: '大塚',
  age: 3
};

// 関数 (export default)
const foo = (a, b) => a + b;

export default foo;
```

```js
// index.js
import foo, { num, member, person } from "./foo";

console.log(num); // 1
console.log(member); // ['ネズミ', '牛']
console.log(person); // { name: '大塚', age: 3 }
console.log(foo(1, 2)); // 3
```

これもOK。

```js
// index.js
import foo, * as fooModule from "./foo";

const { num, member, person } = fooModule;

console.log(num); // 1
console.log(member); // ['ネズミ', '牛']
console.log(person); // { name: '大塚', age: 3 }
console.log(foo(1, 2)); // 3
```

## React / Next.jsとは？

### Reactとは？

Reactとは、Facebookが作ったユーザーインターフェイスを構築するためのJavaScriptライブラリ。  
宣言的なViewをコンポーネントベースで作ることができる。

公式サイト：https://ja.reactjs.org/

### Next.js

Next.jsとは、Reactでサーバーサイドレンダリングをするためのフレームワーク。  
Vue.jsで言うところの、Nuxt.js。簡単にルーティングできて、静的サイトの書き出しもできる。

公式サイト：https://nextjs.org/

## Next.jsでWebサイトをつくってみよう！

### Next.jsの使い方

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

#### ディレクトリ構成

- `./pages` ルーティングの対象
- `./static` 静的ファイルの置き場所
  - 画像ファイルとか

ディレクトリのルールが決まっているのは、これくらい。

### JSXの書き方

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


### EmotionでCSS in JS

**Emotion**とは、JavaScriptでCSSスタイルを記述するために設計されたライブラリ。  
後発ライブラリのため、**styled-component**等の良いとこ取りをしている。

必要なパッケージをインストールしましょ。

- @emotion/styled
- @emotion/core

```console
$ npm i @emotion/styled @emotion/core
```

### 静的ファイルの書き出し

```console
$ next build
$ next export
```