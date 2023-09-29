import userCookie from "@/components/lib/user";
import { Box, TextField, Toolbar } from "@mui/material";
import React from "react";

export default function Login() {
  let user = new userCookie();
  if (user.isLogin())
    return (
      <div>
        <h3>คุณเข้าสู่ระบบแล้ว</h3>
      </div>
    );
    
  return (
    <div>
      <main>
        <Box
          component={"form"}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
        >
          <Toolbar />
          <TextField label="ชื่อ" type="text" />
        </Box>
      </main>
    </div>
  );
}
