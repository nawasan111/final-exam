import { useContext, useEffect, useState } from "react";
import { UserContext } from "../_app";
import Head from "next/head";
import axios from "axios";
import {
  Alert,
  Button,
  Paper,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteMember from "@/components/member/DeleteMember";

export default function Member() {
  const user = useContext(UserContext);
  const [userAll, setUserAll] = useState([]);
  const [message, setMessage] = useState({ error: false, message: "" });
  const [deleteState, setDeleteState] = useState({ open: false, id: -1 });

  async function changeRank(id, rank) {
    try {
      let response = await axios.put(
        "/api/admin/user/rank",
        { id, rank },
        { headers: { token: user.value.token } }
      );
      if (response.data.status === 301) {
        fetchApi();
        setMessage({ message: "เปลี่ยนสิทธิ์สำเร็จ", error: false });
        setTimeout(() => {
          setMessage({ message: "", error: false });
        }, 2000);
      }
    } catch (err) {
      setMessage({ message: "พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง", error: true });
      setTimeout(() => {
        setMessage({ message: "", error: false });
      }, 3000);
    }
  }
  async function fetchApi() {
    try {
      let response = await axios.get("/api/admin/user", {
        headers: { token: user.value.token },
      });
      setUserAll(response.data);
    } catch (err) {}
  }
  useEffect(() => {
    // console.log();
    fetchApi();
  }, [deleteState]);
  return (
    <div>
      <Head>
        <title>รายชื่อสมาชิก | admin</title>
      </Head>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={!!message.message.length}
      >
        <Alert color={message.error ? "error" : "success"}>
          {message.message}
        </Alert>
      </Snackbar>
      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "id",
                "รูป",
                "ชื่อ",
                "username",
                "เบอร์โทร",
                "อีเมล",
                "rank",
                "ลบ",
              ].map((label, idx) => (
                <TableCell sx={{ textAlign: "center" }} key={idx}>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userAll.map((user, idx) => (
              <TableRow key={idx}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <img
                    width={70}
                    src={user?.photo?.length ? user.photo : "/empty.jpg"}
                    alt="profile"
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>@{user.username}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Switch
                    checked={!!user.rank}
                    onChange={() => changeRank(user.id, !user.rank)}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    onClick={() => setDeleteState({ open: true, id: user.id })}
                    color="error"
                  >
                    ลบ
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {deleteState.open && (
        <DeleteMember
          open={deleteState.open}
          handleClose={() => setDeleteState({ open: false, id: -1 })}
          id={deleteState.id}
        />
      )}
    </div>
  );
}
