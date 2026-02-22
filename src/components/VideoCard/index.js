import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Block } from "@mui/icons-material";

const VideoCard = ({ video }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "none", bgcolor: "transparent" }} >
      <Box sx={{ position: "relative", borderRadius: 3, overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="230"
          image={video.image}
          alt={video.title}
          sx={{ borderRadius: 3 }}
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
          {video.channel}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "12px" }}>
          {video.views} • {video.time}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;