import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/dashboard/monitor`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(data);
  return (
    <div>
      <div className="flex flex-wra gap-5">
        <div className="bg-gradient-to-tl from-indigo-400 to-violet-500  rounded-lg p-3 space-y-2">
          <h3 className="text-white">Total Vehicles leaving from STS</h3>
          <p className="text-2xl font-medium text-white">
            {data?.overview?.total_vehicles_leaving_sts}
          </p>
        </div>
        <div className="bg-gradient-to-tl from-pink-300 to-violet-600  rounded-lg p-3 space-y-2">
          <h3 className="text-white">Total Vehicles enter Landfills</h3>
          <p className="text-2xl font-medium text-white">
            {data?.overview?.total_vehicles_enter_landfill}
          </p>
        </div>
        <div className="bg-gradient-to-tl from-green-400 to-lime-600  rounded-lg p-3 space-y-2">
          <h3 className="text-white">Waste transferred from all STS</h3>
          <p className="text-2xl font-medium text-white">
            {data?.overview?.total_sts_waste} tons
          </p>
        </div>
        <div className="bg-gradient-to-tl to-green-500 from-lime-500  rounded-lg p-3 space-y-2">
          <h3 className="text-white">Waste dumped to all landfills</h3>
          <p className="text-2xl font-medium text-white">
            {data?.overview?.total_dump_waste} tons
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
