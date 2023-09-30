import userCookie from "@/components/lib/user";
import { Box, FormControl, InputLabel, Input, InputAdornment, Button, Grid, TextField, Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import { useContext } from "react";
import { UserContext } from "./_app";
import { Container } from "@mui/material";

export default function Login() {
  const user = useContext(UserContext);
    const [showPassword, setShowPassword] = React.useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  if (user.value?.name)
    return (
      <div>
        <h3>{user.value.name}</h3>
      </div>
    );
          // name,
          // email,
          // phone,
          // photo,
          // username,
          // password,
          // rank: false,
          // google_token: google_token ?? "",
 
  return (
    <div >
      <Container>
        <Grid container>
          <Grid item lg={3} md={0}></Grid>
          <Grid item lg={6} md={12}>
            <form action={"#"} className="border border-red-500 bg-white py-3 text-center rounded-lg">
              <Box component={"h3"} className="text-gray-700">สมัครสมาชิก</Box>
              <TextField label="ชื่อ - นามสกุล" variant="standard" className="mx-3 my-1" />
              <TextField label="อีเมล" variant="standard" className="mx-3 my-1" />
              <TextField label="เบอร์โทร" type="tel" variant="standard" className="mx-3 my-1" />
              <TextField label="รูปภาพ" helperText={"https://someweb.com/image.jpg"} variant="standard" className="mx-3 my-1" />
              <TextField label="username" variant="standard" className="mx-3 my-1" />
              <TextField label="password" type="password" variant="standard" className="mx-3 my-1" />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
              <div className="text-right px-10  sm:px-16">
              <Button className="my-5 text-lg" variant="contained" type="submit">สมัคร</Button>
              </div>
           </form>
          </Grid>
          <Grid item lg={3} md={0}></Grid>
        </Grid>
      </Container>
    </div>
  );
}
