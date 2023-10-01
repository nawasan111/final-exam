import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import AddCategory from "@/components/AddCategory";
import axios from "axios";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";

export default function AdminCategory() {
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get("/api/category").then((res) => {
      setCategory(res.data);
    });
  }, []);
  return (
    <Box>
      <Grid container>
        <Grid item lg={3} md={0}></Grid>
        <Grid item lg={6} md={12}>
          <Box sx={{ mb: 2, textAlign: "right" }}>
            <Button onClick={() => setModal(true)}>
              <Add /> เพิ่มหมวดหมู่
            </Button>
          </Box>
          <Paper sx={{ p: 2, overflowX: "scroll" }}>
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>ชื่อ</TableCell>
                    <TableCell sx={{ maxWidth: 10, textAlign: "center" }}>
                      แก้ไข
                    </TableCell>
                    <TableCell sx={{ maxWidth: 10, textAlign: "center" }}>
                      ลบ
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category.map((cate, idx) => (
                    <TableRow>
                      <TableCell>{cate.id}</TableCell>
                      <TableCell>{cate.name}</TableCell>
                      <TableCell sx={{ maxWidth: 10 }}>
                        <Button color="warning">
                          <Edit />
                        </Button>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 10 }}>
                        <Button color="error">
                          <Delete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </Grid>
        <Grid item lg={3} md={0}></Grid>
      </Grid>
      <AddCategory open={modal} handleClose={() => setModal(false)} />
    </Box>
  );
}
