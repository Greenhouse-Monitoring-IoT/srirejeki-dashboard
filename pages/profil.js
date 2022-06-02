import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import Layout from "./components/Layout";

export default function Profil() {
  const [dataUser, setdataUser] = useState({});
  const [isAuth, setIsAuth] = useState();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  if (isAuth == false) {
    router.push("/auth/login");
  } else {
    return (
      <Layout>
        <div className="h-screen text-gray-800">
          Halaman Profil
          <div className="font-bold text-1xl text-red-400">
            Selamat Datang {dataUser.name} dengan ID {dataUser.id}. <br></br>
            Nomor anda {dataUser.phonenumber}
          </div>
        </div>
      </Layout>
    );
  }
}
