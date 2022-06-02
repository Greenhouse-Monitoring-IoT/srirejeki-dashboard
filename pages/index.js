import Layout from "./components/Layout";
import classNames from "classnames";
import {
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  Line,
} from "recharts";

export default function Home() {
  const monitor = classNames(
    "flex items-center max-w-full rounded overflow-hidden shadow-lg w-100 py-8 pr-8"
  );

  const monitorTitle = classNames(
    "text-gray-700 text-base flex justify justify-center py-4 font-semibold"
  );
  return (
    <Layout>
      <div className="w-full pb-10">
        <div className="text-2xl font-bold items-center text-center justify-center text-green-500 mb-12">
          Selamat Datang di Dashboard SriRejeki
        </div>
        <div className="flex flex-col gap-x-20 gap-y-16 items-center">
          <div className="flex gap-x-20">
            <div>
              <p className={monitorTitle}>Baterai ESP 1</p>
              <div className={monitor} style={{ width: 450, height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data="">
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
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <p className={monitorTitle}>Baterai ESP 2</p>
              <div className={monitor} style={{ width: 450, height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data="">
                    <XAxis dataKey="time" />
                    <YAxis dataKey="value_hum" />
                    <Line
                      type="monotone"
                      dataKey="value_hum"
                      stroke="#8884d8"
                    ></Line>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="flex gap-x-20">
            <div>
              <p className={monitorTitle}>Baterai ESP 3</p>
              <div className={monitor} style={{ width: 450, height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data="">
                    <XAxis dataKey="time" />
                    <YAxis dataKey="value_light" />
                    <Line
                      type="monotone"
                      dataKey="value_light"
                      stroke="#8884d8"
                    ></Line>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <p className={monitorTitle}>Baterai ESP 4</p>
              <div className={monitor} style={{ width: 450, height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data="">
                    <XAxis dataKey="time" />
                    <YAxis dataKey="value_water" />
                    <Line
                      type="monotone"
                      dataKey="value_water"
                      stroke="#8884d8"
                    ></Line>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
