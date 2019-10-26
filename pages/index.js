import React from "react";
import Link from "next/link";
import App from "../components/App";

const Index = () => {
  return (
    <App>
      <ul>
        <li>
          <Link href="/docs/[md]" as="/docs/react">
            <a>react</a>
          </Link>
        </li>
        <li>
          <Link href="/docs/[md]" as="/docs/bar">
            <a>bar</a>
          </Link>
        </li>
      </ul>
    </App>
  );
};

export default Index;
