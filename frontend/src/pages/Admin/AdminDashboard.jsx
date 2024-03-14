import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Annotatorsidebar from '../../components/sidebar/AnnotatorSideBar';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/getAllUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
        await axios.delete(`http://localhost:3000/api/users/deleteUser/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editUser = async (userId) => {
    try {
        await axios.delete(`http://localhost:3000/api/users/editUser/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='bg-backgroundGreen overflow-x-hidden'>
        <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Annotatorsidebar />
        </div>
        <div className="w-full sm:w-3/4 ml-0 sm:ml-64">
        <Navbar />
        </div>
        <h1 className="mb-8 mt-24 text-3xl lg:ml-72  sm:ml-40  md:mr-50 text-left  font-semibold text-sidebarGreen">Users Deatils</h1>
        <div className='inline-flex ml-[74%] w-[20%] h-[3%] mt-5'>
        <button className="z-10 w-[50%] text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 " >
        + Add New User
        </button>
        </div>
    <div className="container mx-auto mt-10 w-[100%] h-[100%] lg:ml-72 sm:ml-20 md:ml-40">
      <table className="min-w-[80%] mb-[30%] table-auto divide-y divide-gray-200">
        <thead>
          <tr>
            {/* <th className="px-6 py-3 float-start justify-items-end text-lg font-medium text-black uppercase">User ID</th> */}
            <th className="py-3 text-justify-center text-lg font-medium text-black uppercase whitespace-nowrap">Username</th>
            <th className="py-3 text-justify-center text-lg font-medium text-black uppercase whitespace-nowrap">Email</th>
            <th className="py-3 text-justify-center text-lg font-medium text-black uppercase whitespace-nowrap">User Role</th>
            <th className="py-3 text-justify-center text-lg font-medium text-black uppercase whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b">
              {/* <td className="p-3">{user._id}</td> */}
              <td className="py-3  text-justify whitespace-nowrap">{user.username}</td>
              <td className="py-3 text-justify whitespace-nowrap">{user.email}</td>
              <td className="py-3 text-justify whitespace-nowrap">{user.role}</td>
              <td className="py-3 text-justify whitespace-nowrap">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => editUser(user._id)} >Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default UserList;
