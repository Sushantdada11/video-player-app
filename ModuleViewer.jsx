import React, { useState, useEffect, useRef } from "react";
import { Container, TextField, Card, Typography, Chip, Grid } from "@mui/material";
import { styled } from "@mui/system";

// Styled components for video container and player
const VideoContainer = styled("div")({
  position: "relative",
  width: "100%",
  paddingBottom: "56.25%", // Maintains 16:9 aspect ratio
  overflow: "hidden",
  background: "#000",
  borderRadius: "12px",
});

const VideoPlayer = styled("video")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "12px",
});

// Sample module data with video content
const modulesData = [
  {
    id: 1,
    title: "React Basics",
    description: "Introduction to React fundamentals.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    tags: ["React", "JavaScript", "Frontend"],
  },
  {
    id: 2,
    title: "Advanced Hooks",
    description: "Deep dive into React Hooks.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    tags: ["Hooks", "React", "State Management"],
  },
];

const ModuleViewer = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredModules, setFilteredModules] = useState(modulesData); // State for filtered modules
  const videoRef = useRef(null);

  // Filter modules based on search query
  useEffect(() => {
    setFilteredModules(
      modulesData.filter((mod) =>
        mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      {/* Search input field */}
      <TextField
        label="Search Modules"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />
      {/* Display modules */}
      <Grid container spacing={3}>
        {filteredModules.map((module) => (
          <Grid item xs={12} sm={6} md={4} key={module.id}>
            <Card sx={{ p: 2, borderRadius: "12px", boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>{module.title}</Typography>
              <Typography variant="body2" color="text.secondary">{module.description}</Typography>
              {/* Video player section */}
              <VideoContainer>
                <VideoPlayer ref={videoRef} controls>
                  <source src={module.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </VideoPlayer>
              </VideoContainer>
              {/* Display module tags */}
              <div style={{ marginTop: "10px" }}>
                {module.tags.map((tag, index) => (
                  <Chip key={index} label={tag} sx={{ m: 0.5 }} />
                ))}
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ModuleViewer;
