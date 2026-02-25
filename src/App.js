import { Box, Toolbar, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CategoryTabs from "./components/CategoryTabs";
import VideoGrid from "./components/VideoGrid";
import ShortsSection from "./components/ShortsSection";
import VideoDetail from "./components/VideoDetail";
import { getCategories, getVideos, getShorts } from "./api";

function App() {
  const [videos, setVideos] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setVideos(await getVideos() || []);
        setShorts(await getShorts() || []);
        setCategories(await getCategories() || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to empty arrays if API fails
        setVideos([]);
        setShorts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column",
          justifyContent: "center", 
          alignItems: "center", 
          height: "100vh",
          gap: 2
        }}
      >
        <CircularProgress 
          size={60} 
          thickness={4}
          sx={{ 
            color: "blue",
            animation: "spin 1s linear infinite"
          }}
        />
        <Typography variant="h6" sx={{ color: "blue", fontWeight: 500 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Box sx={{ display: "flex" }}>
            <Header />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              <CategoryTabs categories={categories} />
              <VideoGrid videos={videos} />
              <ShortsSection shorts={shorts} />
            </Box>
          </Box>
        } />
        <Route path="/video/:videoId" element={<VideoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;