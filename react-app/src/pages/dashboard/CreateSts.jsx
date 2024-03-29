import axios from "axios";

const CreateSts = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {
      ward: Number(data.get("ward")),
      capacity: Number(data.get("capacity")),
      latitude: Number(data.get("latitude")),
      longitude: Number(data.get("longitude")),
    };
    try {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/sts`, payload, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 201) {
            alert("STS created successfully");
          }
        }).catch(error => alert(error.response.data.errors))
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  };
  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Create STS
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="stsName"
          >
            STS ward no.
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stsName"
            type="number"
            placeholder="ward no."
            name="ward"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="stsCapacity"
          >
            STS Capacity
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stsCapacity"
            type="number"
            placeholder="in tons"
            name="capacity"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="stsLocation"
          >
            STS Location
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stsLocation"
            type="number"
            placeholder="Latitude"
            name="latitude"
            required
          />
          <div className="mb-4" />
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 number-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Longitude"
            name="logitude"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create STS
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSts;
