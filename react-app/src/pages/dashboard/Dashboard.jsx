import { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";

const ADMIN_NAVs = [
  { name: "Home", path: "/" },
  { name: "Show Users", path: "/users" },
  { name: "Available Roles", path: "/roles" },
  { name: "Assign Role", path: "/assign-role" },
  { name: "Create User", path: "/create-user" },
  { name: "Profile", path: "/profile" },
];

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <div className="flex flex-row w-full">
        {/* Slidebar */}
        <div className="flex w-[280px] h-screen">
          {/* slidebar innner floating bar */}
          <div className="p-3 m-3 w-full bg-[#1c2333] rounded-lg overflow-y-auto relative">
            <div className="p-1 ps-2 text-white font-extrabold text-4xl mb-10">
              EcoSync
            </div>
            <div className="flex flex-col gap-y-2 font-light text-white">
              {
                // Show admin navs only if user is admin
                ADMIN_NAVs.map((nav) => (
                  <NavLink
                    key={nav.path}
                    // className="p-1 ps-2 hover:bg-gray-400 rounded-md overflow-hidden"
                    className={({ isActive }) =>
                      isActive
                        ? "p-1 ps-2 hover:bg-gray-400 rounded-md overflow-hidden bg-gray-400"
                        : "p-1 ps-2 hover:bg-gray-400 rounded-md overflow-hidden"
                    }
                    to={nav.path}
                  >
                    {nav.name}
                  </NavLink>
                ))
              }
            </div>
            <button
              onClick={logout}
              className="font-semibold p-1 px-3 hover:bg-gray-400 bg-gray-300 rounded-md overflow-hidden absolute bottom-3"
            >
              Logout
            </button>
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
