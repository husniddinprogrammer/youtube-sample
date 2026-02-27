import React from "react";
import { Grid } from "@mui/material";
import VideoCard from "../VideoCard";
import Modal from "../Modal";

const VideoGrid = ({ videos, channels }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 1, width: "100%"}} rowSpacing={1}>
      {videos.map((video, index) => (
        <Grid 
          item 
          size={{ xs: 12, sm: 6, md: 4 }}
          key={index}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <VideoCard video={video} channels={channels}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoGrid;