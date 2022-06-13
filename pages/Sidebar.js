//Import library yang terdapat di framework NextJs dan komponen lainnya seperti logo
import React, { useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import Link from "next/link";
import CollapsIcon from "../lib/components/icons/CollapsIcon";
import HomeIcon from "../lib/components/icons/HomeIcon";
import UsersIcon from "../lib/components/icons/UsersIcon";
import ArticleIcon from "../lib/components/icons/ArticleIcon";
import LogoutIcon from "../lib/components/icons/LogoutIcon";
import Logo from "../lib/components/icons/Logo";

const Sidebar = ({}) => {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  //Fungsi untuk melakukan operasi logout dari session autentikasi. Fungsi ini dijalankan seara asinkron dan akan menghapus token yang tersimpan
  //di local storage
  async function doSignout(e) {
    const token = localStorage.getItem("token");
    try {
      const req = await fetch("http://20.124.124.81/auth/signout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
      });
      const res = await req.json();

      localStorage.removeItem("token");

      setIsAuth(false);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    router.push("/auth/login");
  }

  //Daftar menu samping yang ditampilkan, bisa diubah dan akan otomatis tertampil pada sidebar dashboard
  const menuitems = [
    { id: 1, label: "Beranda", icon: HomeIcon, link: "/" },
    { id: 2, label: "Profil", icon: UsersIcon, link: "/profil" },
    { id: 3, label: "Tool", icon: ArticleIcon, link: "/tools" },
    { id: 4, label: "Monitoring", icon: CollapsIcon, link: "/pantau_sawah" },
  ];

  //State untuk mengaktifkan dan menonaktifkan tampilan menu yang ramping atau lengkap
  const [togCollapse, setTogCollapse] = useState(false);
  const [isCollapsable, setIsCollapsable] = useState(false);

  const activeMenu = ({}) => {
    menuitems.find((menu) => menu.link === router.pathname), [router.pathname];
  };

  //Variabel untuk menyimpan tampilan tailwind CSS untuk bagian menu
  const wrapperClasses = classNames(
    "max-h-max px-4 pt-8 pb-4 flex justify-between flex-col w-80 bg-gray-100",
    {
      ["w-80"]: !togCollapse,
      ["w-20"]: togCollapse,
    }
  );

  const getNavbarItemClass = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu.id === menu.id,
      }
    );
  };

  //Variabel untuk menyimpan tampilan tailwind CSS untuk bagian menu sesuai dengan status toggle
  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": togCollapse,
    }
  );

  const onMouseOver = () => {
    setIsCollapsable(!isCollapsable);
  };

  const handleSidebarTgl = () => {
    setTogCollapse(!togCollapse);
  };

  //Return ini berupa tampilan sidebar web yang akan ditampilan pada setiap halaman dashboard.
  //Untuk bentuk dari return ini merupakan bentuk html biasa. Sintaks yang digunakan juga sama hanya di embed pada file javascript
  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 350ms cubic-bezier(0.2 , 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center jsutify-between relative">
          <div className="flex items-center pl-1 gap-4 pt-20">
            <Logo></Logo>
            <span
              className={classNames("mt-2 text-lg font-medium  text-text", {
                hidden: togCollapse,
              })}
            >
              SriRejeki Dashboard
            </span>
          </div>
          {isCollapsable && (
            <button className={collapseIconClasses} onClick={handleSidebarTgl}>
              <CollapsIcon />
            </button>
          )}
        </div>
        <div className="flex flex-col items-start mt-24">
          {menuitems.map(({ icon: Icon, ...menu }) => {
            const menuClass = getNavbarItemClass(menu);
            return (
              <div className={menuClass}>
                <Link href={menu.link}>
                  <a className="flex py-4 px-3 items-center w-full h-full">
                    <div style={{ width: "2.5rem" }}>
                      <Icon></Icon>
                    </div>
                    {!togCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light",
                          { hidden: togCollapse }
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </a>
                </Link>
              </div>
            );
          })}
          <div className="flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap">
            <button
              onClick={doSignout}
              style={{ width: "2.5rem" }}
              className="flex py-4 px-3 items-center w-full h-full"
            >
              <LogoutIcon />
              {!togCollapse && (
                <span
                  className={classNames(
                    "text-md font-medium text-text-light flex",
                    { hidden: togCollapse }
                  )}
                ></span>
              )}
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default Sidebar;
