//Import library yang terdapat di framework NextJs
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import className from "classnames";
import {
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  Line,
} from "recharts";
import { getData } from "../../lib/fetch";

export default function PantauSawah({ isAuth }) {
  const [clientId, setClientId] = useState("ac67b238af10");
  const [dataEsp, setDataEsp] = useState([]);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [actionPump, setActionPump] = useState(0);
  const [actionLamp, setActionLamp] = useState(1);

  //Fungsi ini akan dijalankan sekali
  useEffect(() => {
    //Fungsi ini membuat object baru dari class bawaan javascript
    const date = new Date();

    //Fungsi setInterval akan dijalankan berkali-kali dengan interval yang kita tentukan. Pada program ini interval di set 5 detik.
    //Setiap 5 detik maka program akan mengambil data dari server dengan alamat endpoint yang sudah di tentukan pada library fetch.js
    //fungsi setinterval juga dijalankan secara asinkron dan akan mengambil data untuk humidity, temperature, light, dan water
    const timer = setInterval(async () => {
      setHour(String(date.getHours()));
      if (date.getMinutes().length < 3) {
        setMinute("0" + String(date.getMinutes()));
      } else {
        setMinute(String(date.getMinutes()));
      }

      const getHumidity = await getData(
        "data/subscribe?topic=srirejeki/client/" + clientId + "/humidity",
        isAuth
      );

      const getTemperature = await getData(
        "data/subscribe?topic=srirejeki/client/" + clientId + "/temperature",
        isAuth
      );

      const getLight = await getData(
        "data/subscribe?topic=srirejeki/client/" + clientId + "/light",
        isAuth
      );

      const getWwater = await getData(
        "data/subscribe?topic=srirejeki/client/" + clientId + "/water",
        isAuth
      );

      //Fungsi ini akan menambahkan data yang sudah didapat dari server ke dalam state DataESP secara terus menerus ke index terakhir
      setDataEsp([
        ...dataEsp,
        {
          time: hour + ":" + minute,
          value_temp: getTemperature.data,
          value_hum: getHumidity.data,
          value_light: Math.random() * 5,
          value_water: Math.random() * 10 - 2,
        },
      ]);
    }, 5000);

    //Fungsi ini akan mengecek panjang array DataESP yang telah ditambahkan secara terus-menerus.
    //Apabila panjang DataESP sudah mencapai 11 data maka data terlama yaitu index ke 1.
    //Jadi data akan ditambah ke index terakhir dan data pertama akan dihapus jika panjang data sudah 11.
    let length = dataEsp.length;
    if (length === 11) {
      dataEsp.splice(0, 1);
    }

    return () => clearInterval(timer);
  });

  //Variabel untuk menyimpan class yang digunakan
  const monitor = className(
    "flex items-center max-w-full rounded overflow-hidden shadow-lg w-100 py-8 pr-8"
  );

  //Variabel untuk menyimpan class yang digunakan
  const monitorTitle = className(
    "text-gray-700 text-base flex justify justify-center py-4 font-semibold"
  );

  //Return ini berupa tampilan dashboard pemantauan sawah web yang akan ditampilan pada halaman utama.
  //Untuk bentuk dari return ini merupakan bentuk html biasa.
  //Sintaks yang digunakan juga sama hanya di embed pada file javascript.
  return (
    <Layout>
      <div className="w-full pb-10">
        <div className="text-center text-3xl text-gray-800 font-bold py-4 pb-4">
          SriRejeki Monitoring System
        </div>
        <div>
          <div className="font-bold text-left text-gray-800 text-xl">
            Control/Action
          </div>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="font-bold text-md text-gray-800 mr-3">
                    Lampu Lahan
                  </div>
                </td>
                <td>
                  <div className="py-4">
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        onChange=""
                        type="checkbox"
                        value="1"
                        id="checked-toggle1"
                        className="sr-only peer"
                        checked={actionLamp === 1}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="font-bold text-md text-gray-800 mr-3">
                    Pompa Air
                  </div>
                </td>
                <td>
                  <div className="py-4">
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        onChange=""
                        type="checkbox"
                        value=""
                        id="checked-toggle2"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-x-20 gap-y-16 items-center">
          <div className="flex gap-x-20">
            <div>
              <p className={monitorTitle}>Data Suhu</p>
              <div className={monitor} style={{ width: 450, height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={dataEsp}>
                    <Area dataKey="value_temp"></Area>
                    <XAxis dataKey="time" />
                    <YAxis dataKey="value_temp" />
                    <Line
                      type="monotone"
                      dataKey="value_temp"
                      stroke="#8884d8"
                    ></Line>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <p className={monitorTitle}>Data Kelembaban</p>
              <div className={monitor} style={{ width: 450, height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={dataEsp}>
                    <XAxis dataKey="time" />
                    <YAxis dataKey="value_hum" />
                    <Line
                      type="monotone"
                      dataKey="value_hum"
                      stroke="#8884d8"
                    ></Line>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="flex gap-x-20">
            <div>
              <p className={monitorTitle}>Data Pancaran Cahaya</p>
              <div className={monitor} style={{ width: 450, height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={dataEsp}>
                    <XAxis dataKey="time" />
                    <YAxis dataKey="value_light" />
                    <Line
                      type="monotone"
                      dataKey="value_light"
                      stroke="#8884d8"
                    ></Line>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <p className={monitorTitle}>Data Level Air</p>
              <div className={monitor} style={{ width: 450, height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={dataEsp}>
                    <XAxis dataKey="time" />
                    <YAxis dataKey="value_water" />
                    <Line
                      type="monotone"
                      dataKey="value_water"
                      stroke="#8884d8"
                    ></Line>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
