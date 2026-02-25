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
const getChannelsByVideoId = async(videoId) => {
    try {
        const response = await api.get(`/videos/${videoId}`);
        
        const response1 = await api.get(`/channels/${response.data.channelId}`);
        return response1.data;
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
const getChannels = async() => {
    try {
        const response = await api.get("/channels");
        return response.data;
    } catch (error) {
        console.error("Error fetching channels:", error);
        return [];
    }
}
const editDislikes = async(videoId) => {
    try {
        // First get the current video data
        const videoResponse = await api.get(`/videos/${videoId}`);
        const currentVideo = videoResponse.data;
        
        // Update dislike status and count
        const updatedVideo = {
            ...currentVideo,
            dislikeStatus: !currentVideo.dislikeStatus,
            dislikes: currentVideo.dislikeStatus ?
             
                Math.max(0, parseInt(currentVideo.dislikes) - 1) : 
                parseInt(currentVideo.dislikes) + 1,
            // Reset like status if user is disliking
            likeStatus: currentVideo.dislikeStatus ? currentVideo.likeStatus : false,
            likes: currentVideo.dislikeStatus ? currentVideo.likes : 
                currentVideo.likeStatus ? Math.max(0, parseInt(currentVideo.likes) - 1) : currentVideo.likes
        };
        
        // Update the video
        const response = await api.put(`/videos/${videoId}`, updatedVideo);
        return response.data;
    } catch (error) {
        console.error("Error updating dislikes:", error);
        return null;
    }
}
const editLikes = async(videoId) => {
    try {
        // First get the current video data
        const videoResponse = await api.get(`/videos/${videoId}`);
        const currentVideo = videoResponse.data;
        
        // Update like status and count
        const updatedVideo = {
            ...currentVideo,
            likeStatus: !currentVideo.likeStatus,
            likes: currentVideo.likeStatus ?
                Math.max(0, parseInt(currentVideo.likes) - 1) :
                parseInt(currentVideo.likes) + 1,
            // Reset dislike status if user is liking
            dislikeStatus: currentVideo.likeStatus ? currentVideo.dislikeStatus : false,
            dislikes: currentVideo.likeStatus ? currentVideo.dislikes : 
                currentVideo.dislikeStatus ? Math.max(0, parseInt(currentVideo.dislikes) - 1) : currentVideo.dislikes
        };
        
        // Update the video
        const response = await api.put(`/videos/${videoId}`, updatedVideo);
        return response.data;
    } catch (error) {
        console.error("Error updating likes:", error);
        return null;
    }
}
const changeSubscribe = async(channelId) => {
    try {
        // First get the current channel data
        const channelResponse = await api.get(`/channels/${channelId}`);
        const currentChannel = channelResponse.data;
        
        // Update subscribe status
        const updatedChannel = {
            ...currentChannel,
            subscribers: currentChannel.followed ? currentChannel.subscribers - 1 : currentChannel.subscribers + 1,
            followed: !currentChannel.followed
        };
        
        // Update the channel
        const response = await api.put(`/channels/${channelId}`, updatedChannel);
        return response.data;
    } catch (error) {
        console.error("Error updating subscribe status:", error);
        return null;    
    }
}


export { getCategories, getVideos, getShorts, getVideoId, getCommentsByVideoId, addComment, getChannels, editDislikes, editLikes, changeSubscribe, getChannelsByVideoId };
export default api;
