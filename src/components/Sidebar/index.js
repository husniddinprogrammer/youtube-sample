import React from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import {
  Home,
  VideoLibrary,
  Subscriptions,
  History,
  ThumbUp,
  Settings,
  Explore,
  VideoCall,
  WatchLater,
  PlaylistPlay,
  Mic,
  SportsBasketball,
  MusicNote,
  Movie,
  LiveTv,
  Newspaper,
  Podcasts,
  Lightbulb,
  FitnessCenter,
  Help,
  Feedback,
} from "@mui/icons-material";

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#fff",
          color: "#000"
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><Explore /></ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><VideoLibrary /></ListItemIcon>
          <ListItemText primary="Shorts" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><Subscriptions /></ListItemIcon>
          <ListItemText primary="Subscriptions" />
        </ListItem>
      </List>

      <Divider sx={{ bgcolor: "#e0e0e0" }} />

      <List>
        <Typography sx={{ px: 2, py: 1, fontSize: 14, fontWeight: "bold" }}>
          You
        </Typography>
        
        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><History /></ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><PlaylistPlay /></ListItemIcon>
          <ListItemText primary="Playlists" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><WatchLater /></ListItemIcon>
          <ListItemText primary="Watch Later" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><ThumbUp /></ListItemIcon>
          <ListItemText primary="Liked videos" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><VideoCall /></ListItemIcon>
          <ListItemText primary="Your videos" />
        </ListItem>
      </List>

      <Divider sx={{ bgcolor: "#e0e0e0" }} />

      <List>
        <Typography sx={{ px: 2, py: 1, fontSize: 14, fontWeight: "bold" }}>
          Explore
        </Typography>
        
        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><LiveTv /></ListItemIcon>
          <ListItemText primary="Live" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><Movie /></ListItemIcon>
          <ListItemText primary="Gaming" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><MusicNote /></ListItemIcon>
          <ListItemText primary="Music" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><Newspaper /></ListItemIcon>
          <ListItemText primary="News" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><SportsBasketball /></ListItemIcon>
          <ListItemText primary="Sports" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><Lightbulb /></ListItemIcon>
          <ListItemText primary="Learning" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><FitnessCenter /></ListItemIcon>
          <ListItemText primary="Fitness & Sports" />
        </ListItem>
      </List>

      <Divider sx={{ bgcolor: "#e0e0e0" }} />

      <List>
        <Typography sx={{ px: 2, py: 1, fontSize: 14, fontWeight: "bold" }}>
          More from YouTube
        </Typography>
        
        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><Movie /></ListItemIcon>
          <ListItemText primary="Movies & TV" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><Movie /></ListItemIcon>
          <ListItemText primary="Gaming" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><LiveTv /></ListItemIcon>
          <ListItemText primary="Live" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><Podcasts /></ListItemIcon>
          <ListItemText primary="Podcasts" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><Movie /></ListItemIcon>
          <ListItemText primary="Fashion & Beauty" />
        </ListItem>
      </List>

      <Divider sx={{ bgcolor: "#e0e0e0" }} />

      <List>
        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><Mic /></ListItemIcon>
          <ListItemText primary="Report history" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><Help /></ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>

        <ListItem button sx={{ borderRadius: 1, mx: 1 }}>
          <ListItemIcon sx={{ color: "#000", minWidth: 40 }}><Feedback /></ListItemIcon>
          <ListItemText primary="Send feedback" />
        </ListItem>
      </List>

      <Box sx={{ px: 2, py: 2, mt: "auto" }}>
        <Typography variant="caption" color="text.secondary">
          About Press Copyright
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Contact us Creators
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Advertise Developers
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Terms Privacy Policy & Safety
        </Typography>
        <Typography variant="caption" color="text.secondary">
          How YouTube works
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Test new features
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          2024 Google LLC
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;