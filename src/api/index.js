import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

const getCategories = async() => {
    try {
        const response = await api.get("/categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}
const getVideos = async() => {
    try {
        const response = await api.get("/videos");
        return response.data;
    } catch (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
}
const getShorts = async() => {
    try {
        const response = await api.get("/shorts");
        return response.data;
    } catch (error) {
        console.error("Error fetching shorts:", error);
        return [];
    }
}

export { getCategories, getVideos, getShorts };
export default api;
