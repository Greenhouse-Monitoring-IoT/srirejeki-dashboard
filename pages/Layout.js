import React from "react";
import Sidebar from "./Sidebar";
//Layout kerangka dasar dari semua tampilan dashboard
const Layout = ({ children }) => {
  return (
    <div className="max-h-max flex flex-row justify">
      <Sidebar />
      <div className=" flex-1 p-14 text-white">{children}</div>
    </div>
  );
};

export default Layout;
