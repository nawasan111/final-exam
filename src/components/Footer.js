import { Box } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "end" }}>
      <a
        className="text-slate-800 font-medium no-underline hover:underline md:mx-5"
        href="https://github.com/nawasan111/final-exam"
      >
        Source code
      </a>
      <a
        className="text-slate-800 font-medium no-underline hover:underline md:mx-5"
        href="https://github.com/Arikato111"
      >
        Auther
      </a>
    </Box>
  );
}
