import React from "react";
import Navbar from "../Navbar";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";

export default function UserLayout({ children }) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        {/* <Sidebar /> */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}
