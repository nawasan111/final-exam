import { AddShoppingCart } from "@mui/icons-material";
import AddProduct from "@/components/AddProduct";
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
import {useState} from "react";

export default function Stock() {
    const [modal, setModal] = useState(false)
  return (
    <Box>
      <Box sx={{ mb: 2, textAlign: "right" }}>
        <Button onClick={() => setModal(!modal)}>
          <AddShoppingCart />
          เพิ่มสินค้า
        </Button>
      </Box>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>hello</TableCell>
              <TableCell>hello</TableCell>
              <TableCell>hello</TableCell>
              <TableCell>hello</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>hello</TableCell>
              <TableCell>hello</TableCell>
              <TableCell>hello</TableCell>
              <TableCell>hello</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <AddProduct open={modal} handleClose={() => setModal(false)}  />
    </Box>
  );
}
