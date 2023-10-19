import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { UserContext } from "@/pages/_app";

export default function UpdateProduct({ open, handleClose, data }) {
  const user = useContext(UserContext);
  const [categoryList, setCategoryList] = useState([]);
  const [message, setMessage] = useState({ message: "", error: false });

  const [name, setName] = useState(data.name);
  const [price, setPrice] = useState(data.price);
  const [detail, setDetail] = useState(data.detail);
  const [discount, setDiscount] = useState(data.discount);
  const [stock, setStock] = useState(data.stock);
  const [image, setImage] = useState(data.image);
  const [category, setCategory] = useState(data.cateId);

  useEffect(() => {
    axios.get("/api/category").then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  /**
   *
   * @param {FormDataEvent} e
   */
  async function fetchUpdateProduct(e) {
    e.preventDefault();
    let response = await axios.put(
      "/api/admin/product",
      {
        id: data.id,
        name,
        price,
        detail,
        discount,
        stock,
        image,
        category,
      },
      { headers: { token: user.value.token } }
    );
    console.log(response.data);
    if (response.data.status === 301) {
      setMessage({ message: "แก้ไขสินค้าสำเร็จ", error: false });
      setTimeout(() => {
        handleClose();
        setMessage({ message: "", error: false });
      }, 2000);
    } else {
      setMessage({ message: "เกิดข้อผิดพลาด กรุณาลองอีกคร้ัง", error: true });
      setTimeout(() => {
        setMessage({ message: "", error: false });
      }, 3000);
    }
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={!!message.message.length}
        message={message.message}
      >
        <Alert severity={message.error ? "error" : "success"}>
          {message.message}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={fetchUpdateProduct}>
          <DialogTitle>แก้ไขสินค้า</DialogTitle>
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
                fullWidth
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
              onChange={(e) => setImage(e.target.value)}
            />
            <FormControl
              className="m-1"
              variant="standard"
              sx={{ minWidth: 100 }}
            >
              <InputLabel>หมวดหมู่</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {categoryList.map((cat, idx) => (
                  <MenuItem key={idx} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              ยกเลิก
            </Button>
            <Button type="submit">บันทึก</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
