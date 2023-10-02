import { useContext, useEffect, useState } from "react";
import { UserContext } from "../_app";
import Head from "next/head";
import axios from "axios";
import {
  Button,
  Paper,
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
  const [deleteState, setDeleteState] = useState({ open: false, id: -1 });

  async function fetchApi() {
    try {
      let response = await axios.get("/api/admin/user", {
        headers: { token: user.value.token },
      });
      console.log(response.data);
      setUserAll(response.data);
    } catch (err) {}
  }
  useEffect(() => {
    fetchApi();
  }, [deleteState]);
  return (
    <div>
      <Head>
        <title>รายชื่อสมาชิก | admin</title>
      </Head>
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
                    onChange={() => alert("change rank")}
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
