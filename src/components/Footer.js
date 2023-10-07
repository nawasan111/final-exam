import { GitHub } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <a
        className="flex items-center text-slate-800 font-medium no-underline hover:underline md:mx-5"
        href="https://github.com/nawasan111/final-exam"
      >
        <GitHub sx={{ mx: 1 }} /> Source code
      </a>
      <a
        className="text-slate-800 font-medium no-underline hover:underline md:mx-5"
        href="https://github.com/Arikato111"
      >
        Developer
      </a>
    </Box>
  );
}
