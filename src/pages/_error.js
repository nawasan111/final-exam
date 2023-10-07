import { Home } from "@mui/icons-material";
import { BrowserNotSupported } from "@mui/icons-material";
import { Box, IconButton, Paper } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Error() {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Paper className="shadow-none" sx={{ p: 5, textAlign: "center" }}>
        <Box>
          <Link title="กลับสู่หน้าหลัก" href={'/'}>
            <IconButton sx={{ width: 100, height: 100 }}>
              <BrowserNotSupported sx={{ transform: "scale(3)" }} />
            </IconButton>
          </Link>
        </Box>
        ไม่พบหน้าที่ต้องการ
      </Paper>
    </Box>
  );
}
