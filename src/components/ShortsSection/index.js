import React from "react";
import { Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { YouTube } from "@mui/icons-material";

const ShortsSection = ({ shorts }) => {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 5, mb: 2 }}>
        <YouTube sx={{ fontSize: 28, color: "#FF0000" }} />
        Shorts
      </Typography>

      <Grid container spacing={2}>
        {shorts.map((short, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={short.id}>
            <Card sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="350"
                image={short.image}
              />
              <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontSize: "12px", 
                    lineHeight: 1.3,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    mb: 0.5
                  }}
                >
                  {short.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "11px" }}>
                  {short.views}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ShortsSection;