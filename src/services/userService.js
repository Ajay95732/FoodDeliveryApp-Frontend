import axios from "axios";

const API_URL = "https://localhost:7249/api/Auth";

// Get All Users
export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
};

// Update User
export const updateUser = async (id, user) => {
    const response = await axios.put(
        `${API_URL}/users/${id}`,
        user
    );

    return response.data;
};

// Delete User
export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
};