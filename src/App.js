import { Box, Toolbar, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CategoryTabs from "./components/CategoryTabs";
import VideoGrid from "./components/VideoGrid";
import ShortsSection from "./components/ShortsSection";

function App() {
  const [videos, setVideos] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/api/data');
        const data = response.data;
        setVideos(data.videos || []);
        setShorts(data.shorts || []);
        setCategories(data.categories || []);
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
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography >Yuklanmoqda...</Typography>
      </Box>
    );
  }

  return (
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
  );
}

export default App;