import { Box, Toolbar, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect, Profiler } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CategoryTabs from "./components/CategoryTabs";
import VideoGrid from "./components/VideoGrid";
import ShortsSection from "./components/ShortsSection";
import VideoDetail from "./components/VideoDetail";
import ErrorFallback from "./components/ErrorFallback";
import { getCategories, getVideos, getShorts, getChannels } from "./api";
import { logAppPerformance, startPerformanceTimer, endPerformanceTimer } from "./utils/performanceLogger";
import Modal from "./components/Modal";
import VideoCard from "./components/VideoCard";

function App() {
  const [videos, setVideos] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dataFetchStartTime = startPerformanceTimer('Data Fetching');
      
      try {
        setLoading(true);
        setError(null);

        const apiStartTime = startPerformanceTimer('API Calls');
        const [videosData, shortsData, categoriesData, channelsData] = await Promise.all([
          getVideos(),
          getShorts(),
          getCategories(),
          getChannels()
        ]);
        endPerformanceTimer(apiStartTime, 'All API Calls');

        const videoProcessStartTime = startPerformanceTimer('Video Processing');
        setVideos(videosData || []);
        setShorts(shortsData || []);
        setCategories(categoriesData || []);
        setChannels(channelsData || []);
        endPerformanceTimer(videoProcessStartTime, 'Video Data Processing');

        // Check if essential data is missing
        if (!videosData || videosData.length === 0) {
          setError('video-fetch');
        }
        
        console.log(`📊 Data Summary: ${videosData?.length || 0} videos, ${shortsData?.length || 0} shorts, ${categoriesData?.length || 0} categories, ${channelsData?.length || 0} channels`);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('network-error');
        // Fallback to empty arrays if API fails
        setVideos([]);
        setShorts([]);
        setCategories([]);
        setChannels([]);
      } finally {
        endPerformanceTimer(dataFetchStartTime, 'Complete Data Loading Process');
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

  return (
    <Profiler id="App" onRender={logAppPerformance}>
      <Router>
        <Routes>
          <Route path="/" element={
            <Box sx={{ display: "flex" }}>
              <Header />
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <CategoryTabs categories={categories} />
                <VideoGrid videos={videos} channels={channels} />
                <ShortsSection shorts={shorts} />
              </Box>
            </Box>
          } />
          <Route path="/video/:videoId" element={<VideoDetail />} />
        </Routes>
      </Router>
      
      <Modal>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          {videos.length > 0 && channels.length > 0 && (
            <Box 
              sx={{ 
                borderRadius: 3, 
                boxShadow: 3, 
                bgcolor: "background.paper",
                cursor: "pointer",
                maxWidth: 400,
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "transform 0.2s ease-in-out"
                }
              }}
            >
              <Box sx={{ position: "relative", borderRadius: 3, overflow: "hidden" }}>
                <Box
                  sx={{
                    height: "230px",
                    borderRadius: 3,
                    backgroundImage: `url(${videos[0].image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%"
                  }}
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
                  {videos[0].duration}
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
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
                  {videos[0].title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "12px", display: 'block' }}>
                  {channels[videos[0].channelId - 1]?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "12px" }}>
                  {videos[0].views} • {videos[0].time}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Profiler>
    
  );
}

export default App;