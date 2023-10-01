import { useState, useEffect, useContext } from "react";
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
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { UserContext } from "@/pages/_app";

export default function AddProduct({ open, handleClose }) {
  const user = useContext(UserContext);
  const [categoryList, setCategoryList] = useState([]);
  const [message, setMessage] = useState({ message: "", error: false });
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [detail, setDetail] = useState("");
  const [discount, setDiscount] = useState();
  const [stock, setStock] = useState();
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(0);

  useEffect(() => {
    axios.get("/api/category").then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  /**
   *
   * @param {FormDataEvent} e
   */
  async function fetchAddProduct(e) {
    e.preventDefault();
    let response = await axios.post(
      "/api/admin/product",
      {
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
    if (response.data.status === 201) {
      setName("");
      setPrice("");
      setDetail("");
      setDiscount("");
      setStock("");
      setImage("");
      setCategory(0);
      setMessage({ message: "เพิ่มสินค้าสำเร็จ", error: false });
      handleClose()
      setTimeout(() => {
        setMessage({ message: "", error: false });
      }, 3000);
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
        ContentProps={{
          className: message.error ? "bg-red-500" : "bg-green-500",
        }}
        open={!!message.message.length}
        message={message.message}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={fetchAddProduct}>
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
                onChange={(e) => setCategory(Number(e.target.value))}
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
            <Button type="submit">เพิ่ม</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
