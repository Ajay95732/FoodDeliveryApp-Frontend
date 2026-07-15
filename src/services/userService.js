import axios from "axios";

const API_URL = "https://localhost:7249/api/Auth";

// Get All Users
export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
};