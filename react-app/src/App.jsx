import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import DashboardNav from "./pages/dashboard/DashboardNav";
import CreateSts from "./pages/dashboard/CreateSts";
import CreateLandfill from "./pages/dashboard/CreateLandfill";
import StsManager from "./pages/dashboard/StsManager";
import LandfillManager from "./pages/dashboard/LandfillManager";
import AddVehicle from "./pages/dashboard/AddVehicle";
import EntryStsVehicle from "./pages/dashboard/EntryStsVehicle";
import EntryDump from "./pages/dashboard/EntryDump";
import AdminRoute from "./routes/AdminRoute";
import StsRoute from "./routes/StsRoute";
import LandfillRoute from "./routes/LandfillRoute";
import StsVehicleRecords from "./pages/dashboard/StsVehicleRecords";
import DumpRecords from "./pages/dashboard/DumpRecords";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <DashboardNav />
              </RequireAuth>
            }
          >
            <Route element={<AdminRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<AllUsers />} />
              <Route path="/roles" element={<AllRoles />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/update-user/:uid" element={<UpdateUser />} />
              <Route path="/assign-role" element={<AssignRole />} />
              <Route path="/create-sts" element={<CreateSts />} />
              <Route path="/create-landfill" element={<CreateLandfill />} />
              <Route path="/sts-manager" element={<StsManager />} />
              <Route path="/landfill-manager" element={<LandfillManager />} />
              <Route path="/add-vehicle" element={<AddVehicle />} />
            </Route>
            <Route element={<StsRoute />}>
              <Route path="/sts-vehicle-entry" element={<EntryStsVehicle />} />
              <Route path="/sts-vehicle-records" element={<StsVehicleRecords />} />
            </Route>
            <Route element={<LandfillRoute />}>
              <Route path="/landfill-vehicle-entry" element={<EntryDump />} />
              <Route path="/landfill-vehicle-records" element={<DumpRecords />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
