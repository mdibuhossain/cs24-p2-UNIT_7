import { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";

const ADMIN_NAVs = [
  { name: "Dashboard", path: "/" },
  { name: "Show Users", path: "/users" },
  { name: "Available Roles", path: "/roles" },
  { name: "Assign Role", path: "/assign-role" },
  { name: "Create User", path: "/create-user" },
  { name: "Create STS", path: "/create-sts" },
  { name: "STS manager", path: "/sts-manager" },
  { name: "Create Landfill", path: "/create-landfill" },
  { name: "Landfill manager", path: "/landfill-manager" },
  { name: "Add Vehicle", path: "/add-vehicle" },
];

const STS_NAVs = [{ name: "Entry vehicle", path: "/sts-vehicle-entry" }];

const LANDFILL_NAVs = [
  { name: "Entry dump record", path: "/landfill-vehicle-entry" },
];

const COMMON_NAVs = [{ name: "Profile", path: "/profile" }];

const NavListView = (NavList) => {
  return NavList.map((nav) => (
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
  ));
};

const DashboardNav = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <div className="flex flex-row w-full">
        {/* Slidebar */}
        <div className="flex w-[280px] h-screen">
          {/* slidebar innner floating bar */}
          <div className="p-3 m-3 w-full bg-[#1c2333] rounded-lg overflow-y-auto relative space-y-2">
            <div className="p-1 ps-2 text-white font-extrabold text-4xl mb-10">
              EcoSync
            </div>
            <div className="flex flex-col gap-y-2 font-light text-white overflow-auto">
              {user?.role === "SYSTEM_ADMIN" ? NavListView(ADMIN_NAVs) : null}
              {user?.role === "STS_MANAGER" ? NavListView(STS_NAVs) : null}
              {user?.role === "LANDFILL_MANAGER" ? NavListView(LANDFILL_NAVs) : null}
              {NavListView(COMMON_NAVs)}
            </div>
            <button
              onClick={logout}
              className="font-semibold p-1 px-3 hover:bg-gray-400 bg-gray-300 rounded-md overflow-hidden  bottom-3"
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

export default DashboardNav;
