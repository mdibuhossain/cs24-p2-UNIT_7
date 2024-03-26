import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login";
import Home from "./pages/dashboard/Home";
import AllUsers from "./pages/dashboard/AllUsers";
import AllRoles from "./pages/dashboard/AllRoles";
import CreateUser from "./pages/dashboard/CreateUser";
import AssignRole from "./pages/dashboard/AssignRole";
import Profile from "./pages/dashboard/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/users", element: <AllUsers /> },
      { path: "/roles", element: <AllRoles /> },
      { path: "/assign-role", element: <AssignRole /> },
      { path: "/create-user", element: <CreateUser /> },
      { path: "/profile", element: <Profile /> },
      { path: "/login", element: <Login /> },
    ],
  },
  // { path: "/login", element: <Login /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
