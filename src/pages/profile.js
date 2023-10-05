import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "./_app";

export default function Profile() {
  const user = useContext(UserContext);
  console.log(user.value);

  const maxWidth = 30;
  return (
    <>
      {user.value?.token ? (
        <Box>
          <Paper sx={{ p: 3, boxShadow: "none" }}>
            <div className="gap-10  mx-auto text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1520px]">
              <div className="mx-auto">
                <img
                  className="inline-block w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-lg object-cover"
                  src={user.value.photo.length ? user.value.photo : "empty.jpg"}
                  alt=""
                />
              </div>
              <div className="lg:col-span-2 p-3 text-lg overflow-x-scroll">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ maxWidth }}>ชื่อ</TableCell>
                      <TableCell>{user.value.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ maxWidth }}>อีเมล</TableCell>
                      <TableCell>{user.value.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ maxWidth }}>username</TableCell>
                      <TableCell>@{user.value.username}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ maxWidth }}>เบอร์โทร</TableCell>
                      <TableCell>{user.value.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ maxWidth }}>ที่อยู่</TableCell>
                      <TableCell>
                        {!!user.value.address
                          ? user.value.address
                          : "ยังไม่ระบุ"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
