import React from "react";
import Header from "../components/header/Header.js";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
}: MainLayoutProps) => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default MainLayout;
