//Import library yang terdapat di framework NextJs
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import Layout from "./Layout";

export default function Profil() {
  //Konstanta dengan Hooks useState dari React
  const [dataUser, setdataUser] = useState({});
  const [isAuth, setIsAuth] = useState();
  const router = useRouter();

  //Fungsi dalam Hooks useEffect ini akan dijalankan sekali.
  //Didalam fungsi ini terdapat variabel yang mengambil isi dari token bearer di web local storage.
  //jika ada tokennya, maka autentikasi akan dijadikan true jika tidak maka autentikasi akan dijadikan false.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  //Nilai boolean dari autentikasi ini akan dijadikan pengecekan pertama kali setiap membuka halaman.
  //Jika belum terautentikasi maka akan di redirect ke halaman login
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
