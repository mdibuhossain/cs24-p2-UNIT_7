import { Outlet, useLoaderData, NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div className="flex flex-row w-full">
        {/* Slidebar */}
        <div className="flex w-[280px] h-screen">
          {/* slidebar innner floating bar */}
          <div className="p-3 m-3 w-full bg-[#1c2333] rounded-lg overflow-y-auto">
            <div className="p-1 ps-2 text-white font-extrabold text-4xl mb-10">
              EcoSync
            </div>
            <div className="flex flex-col font-light text-white">
              <NavLink
                className="p-1 ps-2 hover:bg-gray-400 rounded-md overflow-hidden"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className="p-1 ps-2 hover:bg-gray-400 rounded-md overflow-hidden"
                to="/users"
              >
                Show Users
              </NavLink>
              <NavLink
                className="p-1 ps-2 hover:bg-gray-400 rounded-md overflow-hidden"
                to="/roles"
              >
                Available Roles
              </NavLink>
              <NavLink
                className="p-1 ps-2 hover:bg-gray-400 rounded-md overflow-hidden"
                to="/assign-role"
              >
                Assign Role
              </NavLink>
              <NavLink
                className="p-1 ps-2 hover:bg-gray-400 rounded-md overflow-hidden"
                to="/create-user"
              >
                Create User
              </NavLink>
              <NavLink
                className="p-1 ps-2 hover:bg-gray-400 rounded-md overflow-hidden"
                to="/profile"
              >
                Profile
              </NavLink>
              <NavLink
                className="p-1 ps-2 hover:bg-gray-400 rounded-md overflow-hidden"
                to="/login"
              >
                Logout
              </NavLink>
            </div>
          </div>
        </div>
        {/* Dynamic page */}
        <div className="overflow-auto w-full p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
