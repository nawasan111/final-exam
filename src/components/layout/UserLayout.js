import React from "react";
import Navbar from "../Navbar";
import { Box } from "@mui/material";

export default function UserLayout({ children }) {
  const drawerWidth = 200;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar drawerWidth={drawerWidth} />
        {/* <Sidebar /> */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
