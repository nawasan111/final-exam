import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import AddCategory from "@/components/AddCategory";

export default function AdminCategory() {
  const [modal, setModal] = useState(false);
  return (
    <Box>
      <Box sx={{ mb: 2, textAlign: "right" }}>
        <Button onClick={() => setModal(true)}>
          <Add /> เพิ่มหมวดหมู่
        </Button>
      </Box>
      <AddCategory open={modal} handleClose={() => setModal(false)} />
    </Box>
  );
}
