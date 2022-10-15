import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <main className="bg-white">
    <Header />
    <div>{props.children}</div>
  </main>
);

export default Layout;
