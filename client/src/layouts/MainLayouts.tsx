import React from "react";
import Header from "../components/header/Header.js";
import Footer from "../components/footer/Footer.js";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/app/store.js";
type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
}: MainLayoutProps) => {
  const token =
    useSelector((state: RootState) => state.loginAuth.token) ||
    localStorage.getItem("authToken");
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>{token && <Footer />}</footer>
    </div>
  );
};

export default MainLayout;
