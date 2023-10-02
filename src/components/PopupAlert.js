import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function PopupAlert({
  open = false,
  message = "",
  isError = false,
}) {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      open={open}
    >
      <Alert severity={isError ? "error" : "success"}>{message}</Alert>
    </Snackbar>
  );
}
