import React, { Profiler } from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorFallback from "../ErrorFallback";
import { logVideoCardRenderTime } from "../../utils/performanceLogger";

const VideoCard = ({ video, channels }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/video/${video.id}`);
  };

  return (
    <Card 
      sx={{ 
        borderRadius: 3, 
        boxShadow: "none", 
        bgcolor: "transparent",
        cursor: "pointer",
        "&:hover": {
          "& .card-media": {
            transform: "scale(1.02)",
            transition: "transform 0.2s ease-in-out"
          }
        }
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: "relative", borderRadius: 3, overflow: "hidden" }}>
        <CardMedia
          className="card-media"
          component="img"
          height="230"
          image={video.image}
          alt={video.title}
          sx={{ borderRadius: 3, transition: "transform 0.2s ease-in-out" }}
        />
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "rgba(0,0,0,0.8)",
            color: "#fff",
            px: 1,
            borderRadius: 1,
            fontSize: "12px",
          }}
        >
          {video.duration}
        </Typography>
      </Box>
      <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{
            fontSize: "14px",
            lineHeight: 1.3,
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {video.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "12px",display: 'block'}}>
          {channels[video.channelId-1].name}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "12px" }}>
          {video.views} • {video.time}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;