import userCookie from "@/components/lib/user";
import { Box, TextField, Toolbar } from "@mui/material";
import React from "react";
import {useContext} from 'react'
import { UserContext } from "./_app";


export default function Login() {
  const user = useContext(UserContext)
  if (true)
    return (
      <div>
        <h3>{user.value.name}</h3>
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
          <TextField label="ชื่อ" type="text" />
        </Box>
      </main>
    </div>
  );
}
