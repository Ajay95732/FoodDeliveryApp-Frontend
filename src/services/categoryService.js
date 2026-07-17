import axios from "axios";

const API_URL = "https://localhost:7249/api/Category";


// Get All Categories
export const getCategories = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};



// Get Category By Id
export const getCategoryById = async (id) => {

    const response = await axios.get(
        `${API_URL}/${id}`
    );

    return response.data;

};



// Add Category
export const addCategory = async (category) => {

    const response = await axios.post(
        API_URL,
        category
    );

    return response.data;

};



// Update Category
export const updateCategory = async (id, category) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        category
    );

    return response.data;

};



// Delete Category
export const deleteCategory = async (id) => {

    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;

};