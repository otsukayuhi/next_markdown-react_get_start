// nameApp.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';

function NameApp() {
  /**
   * React Hooksで関数コンポーネントでも状態を持つことができます
   * https://ja.reactjs.org/docs/hooks-intro.html
   */
  const [value, setValue] = useState('');

  /**
   * Next.jsのルーターオブジェクト
   * https://nextjs.org/docs#userouter
   */
  const router = useRouter();

  const onClickEvent = () => {
    // yourname?value={value} に遷移する
    router.push({
      pathname: '/yourName',
      query: { value },
    });
  };

  const onChangeEvent = e => setValue(e.target.value);

  return (
    <>
      <div>君の名は。。。</div>
      <input value={value} onChange={onChangeEvent} />
      <button onClick={onClickEvent}>click!!</button>
    </>
  );
}

export default NameApp;
