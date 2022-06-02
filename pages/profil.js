import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import Layout from "./components/Layout";

export default function Profil() {
  const [dataUser, setdataUser] = useState({});
  const [isAuth, setIsAuth] = useState();
  const router = useRouter();
  async function getSession(e) {
    const token = localStorage.getItem("token");
    const req = await fetch("http://20.124.124.81/auth/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token),
      },
    });
    const res = await req.json();
    setdataUser({
      ...dataUser,
      id: res.payload.id,
      name: res.payload.name,
      phonenumber: res.payload.phonenumber,
    });
    console.log(dataUser);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    getSession();
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
