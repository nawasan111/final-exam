import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import { Snackbar } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { UserContext } from "./_app";
import { Container } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import userCookie from "@/components/lib/userCookie";

export default function Login() {
  const user = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (user.value?.name)
    return (
      <div>
        <h3>{user.value.name}</h3>
      </div>
    );

  /**
   *
   * @param {FormDataEvent} e
   */
  async function onSubmitForm(e) {
    e.preventDefault();
    let response = await axios.post("/api/user/auth", { username, password });
    console.log(response.data);
    if (response.data.status === 201) {
      const usrsto = new userCookie();
      usrsto.store(response.data.token);
      window.location.href = '/'
   } else if (response.data.status === 203) {
      setErrorMessage("ชื่อผู้ใช้หรือระหัสผ่านไม่ถูกต้อง");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  return (
    <div>
      <Container>
        <Snackbar
          ContentProps={{ className: "bg-red-500" }}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          open={!!errorMessage.length}
          message={errorMessage}
        />
        <Snackbar
          ContentProps={{ className: "bg-green-500" }}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          open={!!successMessage.length}
          message={successMessage}
        />
        <Grid container>
          <Grid item lg={3} md={0}></Grid>
          <Grid item lg={6} md={12}>
            <div className="border border-red-500 bg-white py-3 text-center rounded-lg">
              <form onSubmit={onSubmitForm} className="">
                <Box component={"h2"} className="text-gray-700">
                  เข้าสู่ระบบ
                </Box>
                <TextField
                  label="username"
                  variant="standard"
                  className="mx-3 my-1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <TextField
                  label="password"
                  type="password"
                  variant="standard"
                  className="mx-3 my-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="text-right px-10  sm:px-16">
                  <Button
                    className="my-5 text-lg"
                    variant="contained"
                    type="submit"
                  >
                    เข้าสู่ระบบ
                  </Button>
                </div>
              </form>
              <Divider />
              <Box component={"h4"}>หรือเข้าสู่ระบบด้วยบัญชี google</Box>
              <button className="bg-white rounded-full border-none hover:shadow-md shadow-gray-400 duration-300 hover:-translate-y-1 cursor-pointer hover:scale-105">
                <Google color="primary" fontSize="large" />
              </button>
            </div>
          </Grid>
          <Grid item lg={3} md={0}></Grid>
        </Grid>
      </Container>
    </div>
  );
}
