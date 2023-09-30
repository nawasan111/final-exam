import React from "react";
import AdminNavbar from "../AdminNavbar";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";

export default function AdminLayout({ children }) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AdminNavbar />
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
