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
import { CartContext, OrderContext, UserContext } from "@/pages/_app";

export default function ConfirmOrder({ open, handleClose }) {
  const user = useContext(UserContext);
  const cart = useContext(CartContext);
  const order = useContext(OrderContext)
  const [message, setMessage] = useState({ message: "", error: false });

  const [address, setAddress] = useState(user.value?.address ?? "");
  const [sending, setSending] = useState(40);

  /**
   *
   * @param {FormDataEvent} e
   */
  async function onOrder(e) {
    e.preventDefault();
    try {
      let response = await axios.post(
        "/api/u/order",
        { address, sending },
        { headers: { token: user.value.token } }
      );
      console.log(response.data);
      setMessage({ message: "สั่งซื้อสำเร็จ", error: false });
      setTimeout(() => {
        setMessage({ message: "", error: false });
      }, 2000);

      cart.fetch();
      order.fetch();
      handleClose();
    } catch (err) {
      setMessage({ message: "พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง", error: true });
      setTimeout(() => {
        setMessage({ message: "", error: true });
      }, 2000);
    }
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={!!message.message.length}
      >
        <Alert severity={message.error ? "error" : "success"}>
          {message.message}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={onOrder}>
          <DialogTitle>ยืนยันการสั่งซื้อ</DialogTitle>
          <DialogContent className="text-center">
            <div className="text-left">
              <TextField
                fullWidth
                className="m-1"
                label="ที่อยู่"
                variant="standard"
                multiline
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <FormControl
              className="m-1"
              variant="standard"
              sx={{ minWidth: 100 }}
            >
              <InputLabel>จัดส่ง</InputLabel>
              <Select
                value={sending}
                onChange={(e) => setSending(Number(e.target.value))}
                required
              >
                {[
                  ["เร็ว", 100],
                  ["ธรรมดา", 40],
                  ["ช้า", 20],
                ].map((ls, idx) => (
                  <MenuItem key={idx} selected={ls[1] === 40} value={ls[1]}>
                    {ls[0]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              ยกเลิก
            </Button>
            <Button type="submit">ยืนยัน</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
