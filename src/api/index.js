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
const getVideoId = async(id) => {
    try {
        const response = await api.get(`/videos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching video by ID:", error);
        return null;
    }
}
const getCommentsByVideoId = async (id) => {
    try {
        const response = await api.get(`/comments?videoId=${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments by video ID:", error);
        return [];
    }
}
const addComment = async (comment) => {
    try {
        const response = await api.post("/comments", comment);
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        return null;
    }
}

export { getCategories, getVideos, getShorts, getVideoId, getCommentsByVideoId, addComment };
export default api;
