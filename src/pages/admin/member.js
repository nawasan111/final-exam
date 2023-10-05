import { useContext, useEffect, useState } from "react";
import { UserContext } from "../_app";
import Head from "next/head";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteMember from "@/components/member/DeleteMember";
import { useRouter } from "next/router";

export default function Member() {
  const user = useContext(UserContext);
  const router = useRouter();
  const [userAll, setUserAll] = useState([]);
  const [message, setMessage] = useState({ error: false, message: "" });
  const [deleteState, setDeleteState] = useState({ open: false, id: -1 });
  const [filterAdmin, setFilterAdmin] = useState(-1);

  console.log(userAll);
  const userAllFilter = !!router.query?.q
    ? userAll.filter(
        (usr) =>
          (filterAdmin === -1 || usr.rank === !filterAdmin) &&
          (String(usr.name).includes(router.query.q) ||
            String(usr.username).includes(router.query.q) ||
            String(usr.phone).includes(router.query.q) ||
            String(usr.id).includes(router.query.q))
      )
    : userAll.filter((usr) => filterAdmin === -1 || usr.rank === !filterAdmin);

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
      <Box sx={{ m: 1, textAlign: "right" }}>
        <FormControl>
          <Select
            variant="standard"
            value={filterAdmin}
            onChange={(e) => setFilterAdmin(Number(e.target.value))}
          >
            <MenuItem value={-1}>ทั้งหมด</MenuItem>
            <MenuItem value={0}>admin</MenuItem>
            <MenuItem value={1}>ผู้ใช้</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
            {userAllFilter.map((user, idx) => (
              <TableRow key={idx}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <img
                  className="rounded-lg object-cover"
                    width={70}
                    height={70}
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
