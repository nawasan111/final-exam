import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import PopupAlert from "@/components/PopupAlert";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "../_app";
import { AdminOrderContext } from "@/components/layout/AdminLayout";
import {
  Paper,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";

export default function Order() {
  const user = useContext(UserContext);
  const router = useRouter();
  const adminOrder = useContext(AdminOrderContext);
  const [message, setMessage] = useState({ message: "", error: false });
  const [userAll, setUserAll] = useState([]);
  const [payStatusFilter, setPayStatusFilter] = useState(0);

  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        setUserAll(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSendingChange = async (id, sending) => {
    try {
      let response = await axios.put(
        "/api/admin/order/sending",
        { id, sending },
        { headers: { token: user.value?.token } }
      );
      if (response.data.status === 301) {
        setMessage({ message: "อัพเดทสถานะการจัดส่งสำเร็จ", error: false });
        setTimeout(() => {
          setMessage({ message: "", error: false });
        }, 2000);
        adminOrder.fetch();
      }
    } catch (err) {
      console.error(err);
      setMessage({
        message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
        error: true,
      });
      setTimeout(() => {
        setMessage({ message: "", error: true });
      }, 2000);
    }
  };

  return (
    <>
      <Head>
        <title>จัดการออเดอร์ | admin</title>
      </Head>

      <PopupAlert
        open={!!message.message.length}
        isError={message.error}
        message={message.message}
      />
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Box sx={{ textAlign: "right", mb: 2 }}>
          <Button
            onClick={() => setPayStatusFilter(!payStatusFilter)}
            variant={payStatusFilter ? "contained" : "text"}
          >
            ยังไม่ชำระเงิน
          </Button>
        </Box>
        <Paper sx={{ p: 1, overflowX: "scroll" }}>
          {adminOrder.value?.length > 0 ? (
            <Box>
              <Table>
                <TableHead>
                  <TableRow>
                    {[
                      "id",
                      "วันที่",
                      "ผู้ซื้อ",
                      "ราคาทั้งหมด",
                      "ค่าส่ง",
                      "ชำระเงิน",
                      "ที่อยู่",
                      "การจัดส่ง",
                    ].map((label, idx) => (
                      <TableCell key={idx}>{label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adminOrder.value.map(
                    (order, idx) =>
                      (!payStatusFilter || order.pay_status === 0) &&
                      (!router.query?.q ||
                        order.id === Number(router.query.q)) &&
                      order && (
                        <TableRow key={idx}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>
                            <Link
                              title="คลิกเพื่อดูรายละเอียด"
                              href={"/admin/order/" + order.id}
                            >
                              {new Date(order.date).toLocaleString()}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {(() => {
                              let usr = userAll.length
                                ? userAll?.filter(
                                    (usr) => usr.id === order.user_id
                                  )[0] ?? false
                                : false;
                              console.log(usr);
                              if(!usr) return <>ไม่พบข้อมูล</>
                              return <Box sx={{display: "flex",alignItems: "center"}}>
                              <img className="object-cover px-1 rounded-md" width={30} height={30} src={usr.photo} alt="profile image" />
                              {usr.name}
                              </Box>
                            })()}
                            {}
                          </TableCell>
                          <TableCell>
                            <Box color="orangered">
                              ${Number(order.total_price).toLocaleString()}
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box color="black">${order.shipping_price}</Box>
                          </TableCell>
                          <TableCell>
                            <Box color={order.pay_status ? "green" : "red"}>
                              {order.pay_status
                                ? "ชำระเงินแล้ว"
                                : "ยังไม่ชำระเงิน"}
                            </Box>
                          </TableCell>
                          <TableCell>{order.address}</TableCell>
                          <TableCell>
                            <FormControl variant="standard">
                              <Select
                                value={Number(order.send_status)}
                                onChange={(e) => {
                                  onSendingChange(
                                    order.id,
                                    Number(e.target.value)
                                  );
                                }}
                              >
                                <MenuItem value={0}>
                                  <Box color="gray">ยังไม่จัดส่ง</Box>
                                </MenuItem>
                                <MenuItem value={1}>
                                  <Box color="orangered">กำลังจัดส่ง</Box>
                                </MenuItem>
                                <MenuItem value={2}>
                                  <Box color="green">จัดส่งแล้ว</Box>
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </Box>
          ) : (
            <div className="text-center">
              {user.value?.token
                ? "รายการว่างเปล่า"
                : "คุณยังไม่ได้เข้าสู่ระบบ"}
            </div>
          )}
        </Paper>
      </Box>
    </>
  );
}
