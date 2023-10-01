import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { UserContext } from "@/pages/_app";

export default function DeleteProduct({ open, handleClose, id }) {
  const user = useContext(UserContext);
  const [message, setMessage] = useState({ message: "", error: false });

  async function onDeleteProduct() {
    try {
      let response = await axios.delete(`/api/admin/product?id=${id}`, {
        headers: { token: user.value.token },
      });
      if (response.data.status === 401) {
        setMessage({ error: false, message: "สบสำเร็จ!" });
        setTimeout(() => {
          handleClose();
          setMessage({ error: false, message: "" });
        }, 1000);
      }
    } catch (err) {
      setMessage({ error: true, message: "พบข้อผิดพลาด ไม่สามารถลบได้" });
      setTimeout(() => {
        setMessage({ error: false, message: "" });
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
      >
        <Alert severity={message.error ? "error" : "success"}>
          {message.message}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ยืนยันการลบ</DialogTitle>
        <DialogContent className="text-center">
          เมื่อกดลบแล้วจะไม่สามารถกู้คืนได้
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button onClick={onDeleteProduct}>ยืนยัน</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
