import axios from "axios";

const API_URL = "https://localhost:7249/api/Order";
// Change the port if your backend uses a different one.

export const getOrders = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getOrderById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const addOrder = async (order) => {
    const response = await axios.post(API_URL, order);
    return response.data;
};

export const updateOrderStatus = async (id, status) => {
    const response = await axios.put(`${API_URL}/${id}`, status, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response.data;
};

export const deleteOrder = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};