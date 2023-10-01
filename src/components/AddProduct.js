import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function AddProduct({ open, handleClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [detail, setDetail] = useState("");
  const [discount, setDiscount] = useState();
  const [stock, setStock] = useState();
  const [image, setImage] = useState("");
  const [category, setCategory] = useState();

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
        <TextField
          className="m-1"
          label="ชื่อสินค้า"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          className="m-1"
          label="ราคา"
          variant="standard"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
        <div className="text-left">
          <TextField
            className="m-1"
            label="รายละเอียด"
            variant="standard"
            multiline
            rows={3}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
          />
        </div>
        <div className="text-left">
          <TextField
            className="m-1"
            label="ส่วนลด (%)"
            variant="standard"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
          <TextField
            className="m-1"
            label="จำนวนสินค้า"
            variant="standard"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <TextField
          label="รูปภาพ"
          variant="standard"
          fullWidth
          helperText="https://www.domain.com/image.png"
          value={image}
          onChange={(e)=> setImage(e.target.value)}
        />
        <FormControl className="m-1" variant="standard" sx={{ minWidth: 100 }} >
          <InputLabel>หมวดหมู่</InputLabel>
          <Select value={category} onChange={(e) => setCategory(Number(e.target.value))}>
            {CategoryList.map((cat, idx) => (
              <MenuItem key={idx} value={cat.id}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          ยกเลิก
        </Button>
        <Button onClick={handleClose}>เพิ่ม</Button>
      </DialogActions>
    </Dialog>
  );
}
