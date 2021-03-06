import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { postData } from "../../../lib/fetch";
import Link from "next/link";

export default function Login() {
  const [field, setField] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  //Fungsi ini akan memasukkan setiap perubahan dari form ke dalam variable field
  function setValue(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setField({
      ...field,
      [name]: value,
    });
    console.log(field);
  }

  //Fungsi ini akan melakukan proses autentikasi dan proses signin
  async function doSignin(e) {
    e.preventDefault();
    const signin = await postData("auth/signin", isAuth, field);
    try {
      localStorage.setItem("token", signin.data);
      setIsAuth(true);
    } catch (e) {
      console.log(e);
    }
  }

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
  //Jika bsudah terautentikasi maka redirect ke halaman pantau_sawah
  if (isAuth == true) {
    router.push("/pantau_sawah");
  } else {
    return (
      <div>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
          <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 className="font-bold text-center text-2xl mb-5">
              SriRejeki Login
            </h1>
            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
              <form onSubmit={doSignin} className="px-5 py-7">
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Nomor HP
                </label>
                <input
                  name="phonenumber"
                  type="text"
                  required
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  onChange={setValue}
                />
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  onChange={setValue}
                />
                <button
                  type="submit"
                  className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Login</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </form>
              <div className="py-5">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-center sm:text-left whitespace-nowrap">
                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4 inline-block align-text-top"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="inline-block ml-1">Lupa Password</span>
                    </button>
                  </div>
                  <div className="text-center sm:text-right whitespace-nowrap">
                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4 inline-block align-text-bottom	"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <Link href="/signup">
                        <a>
                          <span className="inline-block ml-1">
                            SriRejeki Signup
                          </span>
                        </a>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-top"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <Link href="/">
                      <a>
                        <span className="inline-block ml-1">
                          Kembali ke Beranda
                        </span>
                      </a>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
