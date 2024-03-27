import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login";
import Home from "./pages/dashboard/Home";
import AllUsers from "./pages/dashboard/AllUsers";
import AllRoles from "./pages/dashboard/AllRoles";
import CreateUser from "./pages/dashboard/CreateUser";
import AssignRole from "./pages/dashboard/AssignRole";
import Profile from "./pages/dashboard/Profile";
import { AuthProvider } from "./contexts/auth.context";
import RequireAuth from "./routes/PrivateRoute";
import UpdateUser from "./pages/dashboard/UpdateUser";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/roles" element={<AllRoles />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/update-user/:uid" element={<UpdateUser />} />
            <Route path="/assign-role" element={<AssignRole />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
