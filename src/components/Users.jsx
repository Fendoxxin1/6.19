import React, { useState } from "react";
import { useGetValues } from "../hooks/useGetValues";
import { api } from "../api";
import useFetch from "../hooks/useFetch";

const initialState = {
  fname: "",
  lastname: "",
  age: "",
  gender: "",
};

const Users = () => {
  const { data, error, loading } = useFetch("users");
  const { handleChange, formData, setFormData } = useGetValues(initialState);
  const [editingItem, setEditingItem] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();


    if (editingItem) {
      api.put(`users/${editingItem.id}`, formData);
      setEditingItem(null);
    } else {
      api.post("users", formData);
    }

    setFormData(initialState);
  };

  const handleUpdate = (user) => {
    setEditingItem(user);
    setFormData(user);
  };

  const handleDelete = (id) => {
    api.delete(`/users/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white border rounded-xl p-6 shadow-sm mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          {editingItem ? "Edit User" : "Create User"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            type="text"
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="First name"
          />
          <input
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Last name"
          />
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            type="number"
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Age"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <button
            type="submit"
            className="w-full border border-green-600 text-green-700 font-semibold py-2 rounded hover:bg-green-600 hover:text-white transition-colors"
          >
            {editingItem ? "Save Changes" : "Add User"}
          </button>
        </form>
      </div>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-gray-700">All Users</h2>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data?.map((user) => (
            <div
              key={user.id}
              className="bg-white border rounded-xl p-5 flex flex-col items-center text-center"
            >
              <div className="text-lg font-semibold text-gray-800">
                {user.fname} {user.lastname}
              </div>
              <div className="text-gray-500 mt-1">Age: {user.age}</div>
              <div className="text-gray-500">Gender: {user.gender}</div>
              <div className="flex gap-6 mt-4">
                <button
                  onClick={() => handleUpdate(user)}
                  className="text-green-600 hover:underline"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
