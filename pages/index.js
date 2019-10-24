import React from 'react'
import Link from 'next/link'

const Index = () => {
  return (
    <ul>
      <li>
        <Link href="/docs/[md]" as="/docs/foo">
          <a>foo</a>
        </Link>
      </li>
      <li>
        <Link href="/docs/[md]" as="/docs/bar">
          <a>bar</a>
        </Link>
      </li>
    </ul>
  );
};

export default Index