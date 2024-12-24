// ./Pages/ActiveUsers.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ActiveUsers = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.users);
        setIsSuperAdmin(response.data.isSuperAdmin); // Assuming API returns this info
      } catch (error) {
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, [token]);

  const toggleAdminStatus = async (userId, currentStatus) => {
    if (!isSuperAdmin) return; // Only super admins can toggle

    try {
      await axios.put(
        `${BASE_URL}/users/${userId}/toggle-admin`,
        { isAdmin: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isAdmin: !currentStatus } : user
      ));
      toast.success("User admin status updated.");
    } catch (error) {
      toast.error("Failed to update admin status.");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Active Users</h1>
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            {isSuperAdmin && <th className="px-4 py-2 border">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.isAdmin ? "Admin" : "User"}</td>
              {isSuperAdmin && (
                <td className="px-4 py-2 border">
                  <button
                    className={`px-4 py-2 text-white ${
                      user.isAdmin ? "bg-red-500" : "bg-blue-500"
                    }`}
                    onClick={() => toggleAdminStatus(user.id, user.isAdmin)}
                  >
                    {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveUsers;
