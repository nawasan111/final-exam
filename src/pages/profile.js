import { Box, Paper } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "./_app";

export default function Profile() {
  const user = useContext(UserContext);
  console.log(user.value);
  return (
    <>
      {user.value?.token ? (
        <Box>
          <Paper sx={{ p: 3, boxShadow: "none" }}>
            <div className="gap-10  mx-auto text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1520px]">
              <div className="mx-auto">
                <img
                  className="inline-block rounded-lg"
                  width={300}
                  src={user.value.photo.length ? user.value.photo : "empty.jpg"}
                  alt=""
                />
              </div>
              <div className="lg:col-span-2 p-3">
                <div>{user.value.name}</div>
                <div>{user.value.email}</div>
                <div className="text-lg">@{user.value.username}</div>
                <div>{user.value.phone}</div>
                <div>ที่อยู่ {user.value.address}</div>
              </div>
            </div>
          </Paper>
        </Box>
      ) : (
        <Box>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            คุณยังไม่ได้เข้าสู่ระบบ
          </Paper>
        </Box>
      )}
    </>
  );
}
