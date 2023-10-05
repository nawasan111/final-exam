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
import AddCategory from "@/components/category/AddCategory";
import axios from "axios";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import UpdateCategory from "@/components/category/UpdateCategory";
import DeleteCategory from "@/components/category/DeleteCategory";
import Head from "next/head";
import { useRouter } from "next/router";

export default function AdminCategory() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState({ message: "", error: false });
  const [deleteState, setDeleteState] = useState({
    open: false,
    id: -1,
  });
  const [updateState, setUpdateState] = useState({
    open: false,
    data: { id: -1, name: "" },
  });
  const [category, setCategory] = useState([]);

  const fetchCategory = () => {
    axios.get("/api/category").then((res) => {
      setCategory(res.data);
    });
  };
  useEffect(fetchCategory, [modal, updateState, message, deleteState]);
  return (
    <>
      <Head>
        <title>จัดการหมวดหมู่ | admin</title>
      </Head>
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
                    {category.map(
                      (cate, idx) =>
                        (!router.query?.q ||
                          cate.id === Number(router.query.q) ||
                          String(cate.name)
                            .toLocaleLowerCase()
                            .includes(
                              String(router.query.q).toLocaleLowerCase()
                            )) && (
                          <TableRow key={idx}>
                            <TableCell>{cate.id}</TableCell>
                            <TableCell>{cate.name}</TableCell>
                            <TableCell sx={{ maxWidth: 10 }}>
                              <Button
                                color="warning"
                                onClick={() =>
                                  setUpdateState({
                                    open: true,
                                    data: { id: cate.id, name: cate.name },
                                  })
                                }
                              >
                                <Edit />
                              </Button>
                            </TableCell>
                            <TableCell sx={{ maxWidth: 10 }}>
                              <Button
                                color="error"
                                onClick={() =>
                                  setDeleteState({ open: true, id: cate.id })
                                }
                              >
                                <Delete />
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                    )}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </Grid>
          <Grid item lg={3} md={0}></Grid>
        </Grid>

        {deleteState.open && (
          <DeleteCategory
            open={deleteState.open}
            handleClose={() => setDeleteState({ open: false, id: -1 })}
            id={deleteState.id}
          />
        )}
        <AddCategory open={modal} handleClose={() => setModal(false)} />
        {updateState.open && (
          <UpdateCategory
            open={updateState.open}
            data={updateState.data}
            handleClose={() =>
              setUpdateState({ open: false, data: { id: -1, name: "" } })
            }
          />
        )}
      </Box>
    </>
  );
}
