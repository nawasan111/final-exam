import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function AddProduct({ open, handleClose }) {
  const CategoryList = [
    {
      id: 0,
      name: "computer",
    },
    {
      id: 1,
      name: "phone",
    },
    {
      id: 2,
      name: "tablet",
    },
  ];
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>เพิ่มสินค้า</DialogTitle>
      <DialogContent className="text-center">
        <TextField className="m-1" label="ชื่อสินค้า" variant="standard" />
        <TextField
          className="m-1"
          label="ราคา"
          variant="standard"
          type="number"
        />
        <div className="text-left">
          <TextField
            className="m-1"
            label="รายละเอียด"
            variant="standard"
            multiline
            rows={3}
          />
        </div>
        <div className="text-left">
          <TextField
            className="m-1"
            label="ส่วนลด (%)"
            variant="standard"
            type="number"
          />
          <TextField
            className="m-1"
            label="จำนวนสินค้า"
            variant="standard"
            type="number"
          />
        </div>
        <TextField
          label="รูปภาพ"
          variant="standard"
          fullWidth
          helperText="https://www.domain.com/image.png"
        />
        <FormControl className="m-1" variant="standard" sx={{ minWidth: 100 }}>
          <InputLabel>หมวดหมู่</InputLabel>
          <Select>
            {CategoryList.map((cat, idx) => (
              <MenuItem value={cat.id}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>ยกเลิก</Button>
        <Button onClick={handleClose}>เพิ่ม</Button>
      </DialogActions>
    </Dialog>
  );
}
