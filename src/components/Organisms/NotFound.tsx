import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => (
  <div>
    <p>Not found.</p>
    <Link href="/">
      <a>Return to the top page.</a>
    </Link>
  </div>
);

export default NotFound;
