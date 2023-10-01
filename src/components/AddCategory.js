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

export default function AddCategory({ open, handleClose }) {
  const user = useContext(UserContext);
  const [message, setMessage] = useState({ message: "", error: false });
  const [name, setName] = useState("");

  /**
   *
   * @param {FormDataEvent} e
   */
  async function fetchAddProduct(e) {
    e.preventDefault();
    let response = await axios.post(
      "/api/admin/category",
      { name },
      { headers: { token: user.value.token } }
    );
    if (response.data.status === 202) {
      setMessage({ message: "หมวดหมู่นี้ถูกใช้แล้ว", error: true });
      setTimeout(() => {
        setMessage({ message: "", error: false });
      }, 3000);
    } else if(response.data.status === 201) {
      setName("")
      handleClose()
      setMessage({message: "เพิ่มหมวดหมู่สำเร็จ", error: false})
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
          <DialogTitle>เพิ่มหมวดหมู่</DialogTitle>
          <DialogContent className="text-center">
            <TextField
              className="m-1"
              label="ชื่อหมวดหมู่"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
