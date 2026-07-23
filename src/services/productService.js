import axios from "axios";

const API_URL = "https://localhost:7249/api/Product";


// Get Products With Pagination
export const getProducts = async () => {

 const res = await axios.get(
 API_URL
 );

 return res.data;

};



// Get Product By Id
export const getProductById = async (id) => {

  const res = await axios.get(
    `${API_URL}/${id}`
  );

  return res.data;

};



// Add Product
export const addProduct = async (product) => {

  const res = await axios.post(
    API_URL,
    product
  );

  return res.data;

};



// Update Product
export const updateProduct = async (id, product) => {

  const res = await axios.put(
    `${API_URL}/${id}`,
    product
  );

  return res.data;

};



// Delete Product
export const deleteProduct = async (id) => {

  const res = await axios.delete(
    `${API_URL}/${id}`
  );

  return res.data;

};