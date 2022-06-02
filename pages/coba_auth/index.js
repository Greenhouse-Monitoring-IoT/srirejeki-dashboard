import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function coba_auth() {
  const [dataUser, setdataUser] = useState({});
  const [isAuth, setIsAuth] = useState();
  const router = useRouter();
  async function getSession(e) {
    const token = localStorage.getItem("token");
    const req = await fetch("http://36.80.229.25/auth/", {
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
      <div>
        <button>Get Session</button>
        <div>
          id-nya {dataUser.id}, namanya : {dataUser.name}, nomernya{" "}
          {dataUser.phonenumber}
        </div>
      </div>
    );
  }
}
