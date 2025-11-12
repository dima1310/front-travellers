import axios from "axios";

const BASE_URL = "https://podorozhniky-back.onrender.com/api";

export const createStory = async (formData: FormData) => {
    const response = await axios.post(`${BASE_URL}/stories`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
    });
    return response.data;
};
