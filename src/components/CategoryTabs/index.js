import React from "react";
import { Tabs, Tab } from "@mui/material";

const CategoryTabs = ({ categories }) => {
  return (
    <Tabs
      value={0}
      sx={{
        mb: 3,
        "& .MuiTab-root": {
          borderRadius: "8px",
          minHeight: "32px",
          height: "32px",
          padding: "0 12px",
          marginRight: "10px",
          color: "#000",
          bgcolor: "#F2F2F2",
          textTransform: "none",
          "&.Mui-selected": {
            color: "#fff",
            bgcolor: "#000",
          },
        },
        "& .MuiTabs-indicator": {
          display: "none",
        },
      }}
      variant="scrollable"
      scrollButtons="auto"
    >
      {categories.map((category, index) => (
        <Tab key={category.id} label={category.name} />
      ))}
    </Tabs>
  );
};

export default CategoryTabs;