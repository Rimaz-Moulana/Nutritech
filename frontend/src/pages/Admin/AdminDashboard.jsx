import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import API from '../../config/config';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  const handleAddNewUser = () => {
    navigate('../Register');
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      };
      const response = await axios.get(`${API}/api/users/getAllUsers`, config);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();

    const timeout = setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      navigate('/');
    }, 7200000); // 2 hours

    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
  }, [navigate]);

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      };
      await axios.delete(`${API}/api/users/deleteUser/${userId}`, config);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id); // Set editingUser to userId
    setEditedUserData({ ...user });
  };

  const handleEditChange = (e) => {
    setEditedUserData({ ...editedUserData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      };
      await axios.put(`${API}/api/users/updateUser/${editedUserData._id}`, editedUserData, config);
      setEditingUser(null);
      fetchUsers(); // Refetch users after editing
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className='bg-backgroundGreen overflow-x-hidden'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col">
        <Sidebar type="admin" />
      </div>
      <div className="w-full sm:w-3/4 ml-0 sm:ml-64">
        <Navbar />
      </div>
      <h1 className="mb-8 mt-24 text-3xl lg:ml-72 sm:ml-40 md:mr-50 text-left font-semibold text-sidebarGreen">Users Details</h1>
      <div className='inline-flex ml-[65%] w-[20%] h-[3%] mt-5'>
        <button className="z-10 w-[60%] text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2" onClick={handleAddNewUser}>
          + Add New User
        </button>
      </div>
      <div className="container mx-auto mt-10 w-[100%] h-[100%] lg:ml-72 sm:ml-20 md:ml-40">
        <table className="min-w-[90%] mb-[30%] table-auto divide-y divide-gray-200 rounded-lg overflow-hidden border-b border-black text-black">
          <thead>
            <tr>
              <th className="py-3 text-justify lg:px-10 text-lg font-medium text-black uppercase whitespace-nowrap">Username</th>
              <th className="py-3 text-justify lg:px-10 text-lg font-medium text-black uppercase whitespace-nowrap">Email</th>
              <th className="py-3 text-justify lg:px-10 text-lg font-medium text-black uppercase whitespace-nowrap">User Role</th>
              <th className="py-3 text-justify lg:px-10 text-lg font-medium text-black uppercase whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b border-black">
                <td className="py-3 text-justify whitespace-nowrap">{user.username}</td>
                <td className="py-3 text-justify whitespace-nowrap">{user.email}</td>
                <td className="py-3 text-justify whitespace-nowrap">{user.role}</td>
                <td className="py-3 text-justify whitespace-nowrap">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block mb-1">Username:</label>
              <input type="text" name="username" value={editedUserData.username} onChange={handleEditChange} className="w-full border border-gray-400 p-2 rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Password:</label>
              <input type="password" name="password" value={editedUserData.password} onChange={handleEditChange} className="w-full border border-gray-400 p-2 rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email:</label>
              <input type="email" name="email" value={editedUserData.email} onChange={handleEditChange} className="w-full border border-gray-400 p-2 rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">User Role:</label>
              <select name="role" value={editedUserData.role} onChange={handleEditChange} className="w-full border border-gray-400 p-2 rounded">
                <option value="annotator">Annotator</option>
                <option value="industry">Industry</option>
                <option value="expert panel">Expert Panel</option>
                <option value="sensor manager">Sensor Manager</option>
                <option value="researcher">Researcher</option>
                <option value="admin">Admin</option>
                <option value="expert head">Expert Head</option>
              </select>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditSubmit}>Save</button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => setEditingUser(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
