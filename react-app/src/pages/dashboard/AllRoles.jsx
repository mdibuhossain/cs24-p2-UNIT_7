import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllRoles = () => {
  const [rolesList, setRoleList] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/roles`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setRoleList(res.data);
        }
      });
  }, []);

  return (
    <div>
      <table className="border-separate w-full border-spacing-y-2 text-sm">
        <thead className="text-left">
          <tr>
            <th className="ps-4">Roles</th>
          </tr>
        </thead>
        <tbody>
          {rolesList.map((role) => (
            <tr key={role.id}>
              <td className="td-class">{role.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllRoles;
