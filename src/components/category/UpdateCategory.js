import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { UserContext } from "@/pages/_app";

export default function UpdateCategory({ open, handleClose, data }) {
  const user = useContext(UserContext);
  const [message, setMessage] = useState({ message: "", error: false });
  const [name, setName] = useState(data.name);

  /**
   *
   * @param {FormDataEvent} e
   */
  async function fetchAddProduct(e) {
    e.preventDefault();
    let response = await axios.put(
      "/api/admin/category",
      { id: data.id, name },
      { headers: { token: user.value.token } }
    );
    console.log(response.data);
    if (response.data.status === 301) {
      setName("");
      setMessage({ message: "บันทึกหมวดหมู่สำเร็จ", error: false });
      setTimeout(() => {
        handleClose();
        setMessage({ message: "", error: false });
      }, 2000);
    } else {
      setMessage({ message: "มีบางอย่างผิดพลาด", error: true });
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
      ><Alert severity={message.error ? "error" : "success"}>{message.message}</Alert></Snackbar>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={fetchAddProduct}>
          <DialogTitle>แก้ไข</DialogTitle>
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
            <Button type="submit">บันทึก</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
