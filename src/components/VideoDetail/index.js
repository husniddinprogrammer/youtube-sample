import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Button, TextField, IconButton, Divider } from "@mui/material";
import { ThumbUp, ThumbDown, Share, Download, MoreHoriz, Send } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { getVideos, getVideoId, getCommentsByVideoId, addComment, getChannels, editDislikes, editLikes, changeSubscribe, getChannelsByVideoId } from "../../api";
import Header from "../Header";
import ErrorFallback from "../ErrorFallback";

const VideoDetail = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [allVideos, setAllVideos] = useState([]);
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState(null);
  const [commentError, setCommentError] = useState(null);

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };


  useEffect(() => {
    // Simulate fetching video and comments data
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [videosData, videoData, commentsData, channelData] = await Promise.all([
          getVideos(),
          getVideoId(videoId),
          getCommentsByVideoId(videoId),
          getChannelsByVideoId(videoId)
        ]);

        setAllVideos(videosData || []);
        setVideo(videoData);
        setComments(commentsData || []);
        setChannel(channelData);
        
        if (!videoData) {
          setError('video-fetch');
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
        setError('network-error');
        setAllVideos([]);
        setVideo(null);
        setComments([]);
        setChannel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  const handleLikeClick = async () => {
    const result = await editLikes(videoId);
    if (result) {
      setVideo(result);
    }
  };

  const handleDislikeClick = async () => {
    const result = await editDislikes(videoId);
    if (result) {
      setVideo(result);
    }
  };

  const handleSubscribeClick = async () => {
    const result = await changeSubscribe(video.channelId);
    if (result) {
      setChannel(result);
    }
  };
  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      setCommentError(null);
      const commentData = {
        videoId: parseInt(videoId),
        author: "Siz",
        avatar: "https://picsum.photos/40/40?user",
        time: "Hozirgina",
        text: newComment,
        likes: 0,
        replies: []
      };

      try {
        const result = await addComment(commentData);
        if (result) {
          setComments([result, ...comments]);
          setNewComment("");
        } else {
          setCommentError('comment-error');
        }
      } catch (error) {
        console.error("Error adding comment:", error);
        setCommentError('comment-error');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography>Yuklanmoqda...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", p: 2 }}>
        <ErrorFallback 
          type={error} 
          onRetry={() => window.location.reload()}
        />
      </Box>
    );
  }

  if (!video) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", p: 2 }}>
        <ErrorFallback 
          type="video-fetch" 
          message="Video topilmadi"
          onRetry={() => navigate('/')}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ maxWidth: 1280, mx: "auto" }}>
          <Box sx={{ display: "flex", gap: 3 }}>
            {/* Main Content */}
            <Box sx={{ flex: 1 }}>
              {/* Video Player Section */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    width: "100%",
                    height: 450,
                    bgcolor: "#000",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <img
                    src={video?.image || ""}
                    alt={video?.title || ""}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      bgcolor: "rgba(0,0,0,0.8)",
                      color: "#fff",
                      px: 1,
                      borderRadius: 1,
                      fontSize: "14px"
                    }}
                  >
                    {video?.duration || ""}
                  </Box>
                </Box>
              </Box>

              {/* Video Info */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, fontSize: "20px" }}>
                  {video?.title || ""}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "14px" }}>
                    {video?.views || ""} views • {video?.time || ""}
                  </Typography>

                  {/* Action Buttons */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Button
                      variant="contained"
                      startIcon={<ThumbUp />}
                      onClick={handleLikeClick}
                      sx={{
                        bgcolor: video?.likeStatus ? "#1976d2" : "#f1f1f1",
                        color: video?.likeStatus ? "#fff" : "#030303",
                        borderRadius: "18px",
                        textTransform: "none",
                        px: 2,
                        py: 1,
                        minWidth: "auto",
                        fontSize: "14px",
                        "&:hover": { bgcolor: video?.likeStatus ? "#1565c0" : "#e5e5e5" }
                      }}
                    >
                      {video?.likes || ""}
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<ThumbDown />}
                      onClick={handleDislikeClick}
                      sx={{
                        bgcolor: video?.dislikeStatus ? "#1976d2" : "#f1f1f1",
                        color: video?.dislikeStatus ? "#fff" : "#030303",
                        borderRadius: "18px",
                        textTransform: "none",
                        px: 2,
                        py: 1,
                        minWidth: "auto",
                        fontSize: "14px",
                        "&:hover": { bgcolor: video?.dislikeStatus ? "#1565c0" : "#e5e5e5" }
                      }}
                    >
                      {video?.dislikes || ""}
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Share />}
                      sx={{
                        bgcolor: "#f1f1f1",
                        color: "#030303",
                        borderRadius: "18px",
                        textTransform: "none",
                        px: 2,
                        py: 1,
                        minWidth: "auto",
                        fontSize: "14px",
                        "&:hover": { bgcolor: "#e5e5e5" }
                      }}
                    >
                      Share
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Download />}
                      sx={{
                        bgcolor: "#f1f1f1",
                        color: "#030303",
                        borderRadius: "18px",
                        textTransform: "none",
                        px: 2,
                        py: 1,
                        minWidth: "auto",
                        fontSize: "14px",
                        "&:hover": { bgcolor: "#e5e5e5" }
                      }}
                    >
                      Download
                    </Button>
                    <IconButton sx={{ bgcolor: "#f1f1f1", "&:hover": { bgcolor: "#e5e5e5" } }}>
                      <MoreHoriz />
                    </IconButton>
                  </Box>
                </Box>

                {/* Channel Info */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, bgcolor: "#f9f9f9", borderRadius: 2, mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: "#ff0000" }}>
                      {video?.channel?.[0] || ""}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "16px" }}>
                        {channel.name || ""}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "14px" }}>
                        {channel?.subscribers || ""}
                      </Typography>
                    </Box>
                  </Box>
                  <Button variant="contained" sx={{
                    bgcolor: "#ff0000",
                    color: "#fff",
                    borderRadius: "18px",
                    textTransform: "none",
                    px: 3,
                    "&:hover": { bgcolor: "#cc0000" }
                  }}
                    onClick={handleSubscribeClick}
                  >
                    {channel?.followed ? "Unsubscribe" : "Subscribe"}
                  </Button>
                </Box>

                {/* Description */}
                <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderRadius: 2, mb: 3 }}>
                  <Typography variant="body2" sx={{ whiteSpace: "pre-line", fontSize: "14px" }}>
                    {video?.views || ""} views • {video?.time || ""}
                    <br /><br />
                    {video?.description || ""}
                  </Typography>
                </Box>
              </Box>

              {/* Comments Section */}
              <Box>
                <Typography variant="h6" sx={{ mb: 3, fontSize: "16px" }}>
                  {comments.length} Comments
                </Typography>

                {/* Comment Error Display */}
                {commentError && (
                  <ErrorFallback 
                    type={commentError} 
                    onRetry={() => setCommentError(null)}
                  />
                )}

                {/* Add Comment */}
                <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: "#065fd4" }}>
                    U
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "18px",
                          bgcolor: "#f9f9f9"
                        }
                      }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}>
                      <Button onClick={() => setNewComment("")} sx={{ textTransform: "none" }}>Cancel</Button>
                      <Button
                        variant="contained"
                        onClick={handleCommentSubmit}
                        disabled={!newComment.trim()}
                        sx={{
                          bgcolor: "#065fd4",
                          color: "#fff",
                          borderRadius: "18px",
                          textTransform: "none",
                          "&:hover": { bgcolor: "#0549b8" }
                        }}
                      >
                        Comment
                      </Button>
                    </Box>
                  </Box>
                </Box>

                {/* Comments List */}
                {comments.map((comment) => (
                  <Box key={comment.id} sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar src={comment.avatar} sx={{ width: 40, height: 40 }}>
                        {comment.author[0]}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: "bold", fontSize: "13px" }}>
                            {comment.author}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "12px" }}>
                            {comment.time}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 1, fontSize: "14px" }}>
                          {comment.text}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <IconButton size="small" sx={{ fontSize: "20px" }}>
                            <ThumbUp fontSize="small" />
                          </IconButton>
                          <Typography variant="caption" sx={{ fontSize: "12px" }}>{comment.likes}</Typography>
                          <IconButton size="small" sx={{ fontSize: "20px" }}>
                            <ThumbDown fontSize="small" />
                          </IconButton>
                          <Typography variant="caption" sx={{ fontSize: "12px" }}>Reply</Typography>
                        </Box>

                        {/* Replies */}
                        {comment.replies.map((reply) => (
                          <Box key={reply.id} sx={{ display: "flex", gap: 2, mt: 2, ml: 4 }}>
                            <Avatar src={reply.avatar} sx={{ width: 32, height: 32 }}>
                              {reply.author[0]}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                <Typography variant="caption" sx={{ fontWeight: "bold", fontSize: "12px" }}>
                                  {reply.author}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "12px" }}>
                                  {reply.time}
                                </Typography>
                              </Box>
                              <Typography variant="caption" sx={{ mb: 1, fontSize: "12px" }}>
                                {reply.text}
                              </Typography>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <IconButton size="small" sx={{ fontSize: "18px" }}>
                                  <ThumbUp fontSize="small" />
                                </IconButton>
                                <Typography variant="caption" sx={{ fontSize: "12px" }}>{reply.likes}</Typography>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    {comment.id < comments.length && <Divider sx={{ mt: 3 }} />}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Sidebar */}
            <Box sx={{ width: 402 }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: "16px" }}>
                Related Videos
              </Typography>

              {/* Related Videos */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {allVideos.map((video) => (
                  <Box
                    key={video.id}
                    sx={{
                      display: "flex",
                      gap: 2,
                      cursor: "pointer"
                    }}
                    onClick={() => handleVideoClick(video.id)}
                  >
                    <Box sx={{ position: "relative", width: 168, height: 94 }}>
                      <img
                        src={video.image}
                        alt={video.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          position: "absolute",
                          bottom: 6,
                          right: 6,
                          background: "rgba(0,0,0,0.8)",
                          color: "white",
                          px: 0.5,
                          borderRadius: 1,
                          fontSize: "10px"
                        }}
                      >
                        {video.duration}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "14px", mb: 0.5 }}>
                        {video.title}
                      </Typography>
                      <Typography variant="caption" sx={{ display: "block", color: "text.secondary", fontSize: "12px", mb: 0.5 }}>
                        {video.channel?.name || ""}
                      </Typography>
                      <Typography variant="caption" sx={{ display: "block", color: "text.secondary", fontSize: "12px" }}>
                        {video.views} • {video.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;
