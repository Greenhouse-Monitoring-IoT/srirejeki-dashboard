import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Tools({ data }) {
  const [field, setField] = useState({});
  const [isAuth, setIsAuth] = useState();
  const router = useRouter();
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

  async function addFarmland(e) {
    const token = localStorage.getItem("token");
    const req = await fetch("http://20.124.124.81/farmland", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token),
      },
      body: JSON.stringify(field),
    });
    const res = await req.json();
    console.log(res);
  }

  const [dataFarmland, setDatafarmland] = useState([]);
  async function getFarmland(e) {
    const token = localStorage.getItem("token");
    const req = await fetch("http://20.124.124.81/farmland/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token),
      },
    });
    const res = await req.json();
    setDatafarmland(res.payload);
  }

  const [dataEsp, setDataEsp] = useState([]);
  async function getDataEsp(e) {
    const token = localStorage.getItem("token");
    const req = await fetch("http://36.80.229.25/mcu/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token),
      },
    });
    const res = await req.json();
    setDataEsp(res.payload);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    getFarmland();
    getDataEsp();
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);
  console.log(dataFarmland);
  if (isAuth == false) {
    router.push("/auth/login");
  } else {
    return (
      <Layout>
        <div className="w-full text-gray-700">
          <div className="flex gap-x-8">
            <div className="w-1/2 h-1/2 bg-gray-100 shadow-sm px-10">
              <div className="font-bold py-4 text-center">TAMBAH LAHAN</div>
              <div>
                <form>
                  <table className="w-full text-left text-gray-800 text-md">
                    <tbody className="w-full">
                      <tr>
                        <td className="w-1/5 py-2">Nama</td>
                        <td className="w-6 py-2">:</td>
                        <td className="w-4/5 py-2">
                          <input
                            name="name"
                            className="w-full h-10 p-2"
                            type="text"
                            onChange={setValue}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1/5 py-2">Deskripsi</td>
                        <td className="w-6 py-2">:</td>
                        <td className="w-4/5 py-2">
                          <input
                            name="description"
                            className="w-full h-10 p-2"
                            type="text"
                            onChange={setValue}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1/5 py-2">Lokasi</td>
                        <td className="w-6 py-2">:</td>
                        <td className="w-4/5 py-2">
                          <input
                            name="location"
                            className="w-full h-10 p-2"
                            type="text"
                            onChange={setValue}
                          />
                        </td>
                      </tr>
                      <tr className="py-4">
                        <td className="w-1/5 py-4"></td>
                        <td className="w-6 py-4"></td>
                        <td className="w-4/5 py-4">
                          <button
                            className="bg-gray-400 px-6 py-4 rounded-lg items-center text-white font-bold my-4"
                            type="submit"
                            form="form1"
                            value="Submit"
                            onClick={addFarmland}
                          >
                            Tambah
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
            <div className="w-1/2 bg-gray-100 shadow-sm px-10">
              <div className="font-bold py-4 text-center">LAHAN TERDAFTAR</div>
              <div>
                <table className="border-collapse border border-slate-500 w-full">
                  <thead>
                    <tr>
                      <td className="border border-slate-700 font-bold">No</td>
                      <td className="border border-slate-700 font-bold">
                        Nama
                      </td>
                      <td className="border border-slate-700 font-bold">
                        Deskripsi
                      </td>
                      <td className="border border-slate-700 font-bold">
                        Lokasi
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {dataFarmland.map((data) => (
                      <tr>
                        <td className="border border-slate-700 ">1</td>
                        <td className="border border-slate-700">{data.name}</td>
                        <td className="border border-slate-700">
                          {data.description}
                        </td>
                        <td className="border border-slate-700">
                          {data.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex gap-x-8 mt-10">
            <div className="w-1/2 h-1/2 bg-gray-100 shadow-sm px-10">
              <div className="font-bold py-4 text-center">REGISTRASI ESP</div>
              <div>
                <form>
                  <table className="w-full text-left text-gray-800text-md">
                    <tbody className="w-full">
                      <tr>
                        <td className="w-1/5 py-2">Nama</td>
                        <td className="w-6 py-2">:</td>
                        <td className="w-4/5 py-2">
                          <input
                            name="name"
                            className="w-full h-10 p-2"
                            type="text"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1/5 py-2">Deskripsi</td>
                        <td className="w-6 py-2">:</td>
                        <td className="w-4/5 py-2">
                          <input
                            name="description"
                            className="w-full h-10 p-2"
                            type="text"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1/5 py-2">Lokasi</td>
                        <td className="w-6 py-2">:</td>
                        <td className="w-4/5 py-2">
                          <input
                            name="location"
                            className="w-full h-10 p-2"
                            type="text"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1/5 py-2">Device ID</td>
                        <td className="w-6 py-2">:</td>
                        <td className="w-4/5 py-2">
                          <input
                            name="deviceId"
                            className="w-full h-10 p-2"
                            type="text"
                          />
                        </td>
                      </tr>
                      <tr className="py-4">
                        <td className="w-1/5 py-4"></td>
                        <td className="w-6 py-4"></td>
                        <td className="w-4/5 py-4">
                          <button
                            className="bg-gray-400 px-6 py-4 rounded-lg items-center text-white font-bold my-4"
                            type="submit"
                            form="form1"
                            value="Submit"
                          >
                            Tambah
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
            <div className="w-1/2 bg-gray-100 shadow-sm px-10">
              <div className="font-bold py-4 text-center">DEVICE TERDAFTAR</div>
              <div>
                <table className="border-collapse border border-slate-500 w-full">
                  <thead>
                    <tr>
                      <td className="border border-slate-700 font-bold">No</td>
                      <td className="border border-slate-700 font-bold">
                        Nama
                      </td>
                      <td className="border border-slate-700 font-bold">
                        Deskripsi
                      </td>
                      <td className="border border-slate-700 font-bold">
                        Lokasi
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {dataEsp.map((data) => (
                      <tr>
                        <td className="border border-slate-700 ">1</td>
                        <td className="border border-slate-700">{data.name}</td>
                        <td className="border border-slate-700">
                          {data.description}
                        </td>
                        <td className="border border-slate-700">
                          {data.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
