import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import { Snackbar } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { UserContext } from "./_app";
import { Container } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import Head from "next/head";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const user = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
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
    let response = await axios.post("/api/user", {
      name,
      email,
      phone,
      image,
      username,
      password,
    });
    if (response.data.status === 201) {
      setSuccessMessage("สมัครสมาชิกสำเร็จ!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      setName("")
      setEmail("")
      setPhone("")
      setImage("")
      setUsername("")
      setPassword("")
    } else if (response.data.status === 202) {
      setErrorMessage("ชื่อผู้ใช้งานนี้ถูกใช้แล้ว กรุณาลองใหม่อีกครั้ง");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else {
      setErrorMessage("ขออภัย มีบางอย่างไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  return (
    <div>
      <Head>
        <title>สมัครสมาชิก | OpenShop</title>
      </Head>
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
                  สมัครสมาชิก
                </Box>
                <TextField
                  label="ชื่อ - นามสกุล"
                  variant="standard"
                  className="mx-3 my-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  label="อีเมล"
                  variant="standard"
                  className="mx-3 my-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  label="เบอร์โทร"
                  helperText="0989999999"
                  type="tel"
                  variant="standard"
                  className="mx-3 my-1"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <TextField
                  label="รูปโปรไฟล์"
                  helperText={"https://someweb.com/image.jpg"}
                  variant="standard"
                  className="mx-3 my-1"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
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
                    สมัคร
                  </Button>
                </div>
              </form>
              <Divider />
              <Box component={"h4"}>หรือสมัครด้วยบัญชี google</Box>
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
