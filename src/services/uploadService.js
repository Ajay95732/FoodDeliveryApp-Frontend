import axios from "axios";

const API_URL = "https://localhost:7249/api/Upload";

export const uploadImage = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const res = await axios.post(API_URL, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return res.data.imageUrl;
};