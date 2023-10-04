import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Alert,
  Box,
  CircularProgress,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { CartContext, UserContext } from "@/pages/_app";
import { CurrencyBitcoin } from "@mui/icons-material";
import { Payment } from "@mui/icons-material";
import { AccountBalance } from "@mui/icons-material";
import { Check } from "@mui/icons-material";
import CircleLoading from "../CircleLoading";

export default function ConfirmPayment({ open, handleClose, id, price }) {
  const user = useContext(UserContext);
  const cart = useContext(CartContext);
  const [message, setMessage] = useState({ message: "", error: false });

  const [paymentType, setPaymentType] = useState(0);
  const [loading, setLoading] = useState(-1);

  useEffect(() => {
    if (-1 < loading && loading < 100) {
      setTimeout(() => {
        setLoading(loading + 10);
      }, 400);
    } else if (loading > 99) {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [loading]);
  /**
   *
   * @param {FormDataEvent} e
   */
  async function onOrder(e) {
    e.preventDefault();
    try {
      setLoading(0);
      let response = await axios.put(
        "/api/u/order/check?id=" + id,
        {},
        { headers: { token: user.value.token } }
      );
      console.log(response.data);
    } catch (err) {}
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
          <DialogTitle>ดำเนินการชำระเงิน</DialogTitle>
          {loading !== -1 ? (
            <Box sx={{ textAlign: "center" }}>
              {loading === 100 ? (
                <Fab aria-label="save" color="success">
                  <Check />
                </Fab>
              ) : (
                <CircleLoading value={loading} />
              )}
            </Box>
          ) : (
            <DialogContent className="text-center">
              <div>
                ทั้งหมด{" "}
                <Box component={"span"} color={"orangered"}>
                  ${Number(price).toLocaleString()}
                </Box>
              </div>
              <FormControl
                className="m-1"
                variant="standard"
                sx={{ minWidth: 170, p: 2 }}
              >
                <InputLabel>ชำระเงินด้วย</InputLabel>
                <Select
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  required
                >
                  <MenuItem selected value={0}>
                    <Box sx={{ display: "flex" }}>
                      <CurrencyBitcoin /> Bitcoin
                    </Box>
                  </MenuItem>
                  <MenuItem selected value={1}>
                    <Box sx={{ display: "flex" }}>
                      <Payment /> บัตรเครดิต/เดบิต
                    </Box>
                  </MenuItem>
                  <MenuItem selected value={2}>
                    <Box sx={{ display: "flex" }}>
                      <AccountBalance /> โอนผ่านธนาคาร
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
          )}
          <DialogActions>
            <Button
              disabled={loading > -1}
              color="error"
              onClick={handleClose}
            >
              ยกเลิก
            </Button>
            <Button disabled={loading > -1} type="submit">
              ชำระเงิน
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
